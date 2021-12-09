import { landingPage } from './landing.page';
import { listVendorPage } from './listvendor.page';
import { publicListVendorPage } from './public-listvendor.page';
import { adminListVendorPage } from './admin-listvendor.page';
import { editListVendorPage } from './edit-listvendor.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { addVendorPage } from './addvendor.page';
import { removeVendorPage } from './removeVendor.page';
import { addFavorite } from './addFavorite';
import { removeFavorite } from './removeFavorite';
import { availableNowPage } from './availableNow';
import { vendorProfilePage } from './vendorProfile';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'bowbitestestjohn123!' };
const adminCredentials = { username: 'admin@foo.com', password: 'bowbitestestadmin123!' };

const testVendor = {
  _id: 'opXbCopxTEPQizQ6C',
  name: 'Panda Express Test',
  foodType: 'Chinese',
  storeImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/85/Panda_Express_logo.svg/1200px-Panda_Express_logo.svg.png',
  open: '10',
  openAmOrPm: 'AM',
  close: '4',
  closeAmOrPm: 'PM',
  menuItem: [
    {
      name: 'Orange Chicken',
      price: '10',
      description: 'Orange Chicken with Fried rice',
      image: 'https://dinnerthendessert.com/wp-content/uploads/2017/08/Panda-Express-Orange-Chicken-8-.jpg',
    },
    {
      name: 'Broccoli Beef',
      price: '8',
      description: 'Beef with Broccoli',
      image: 'https://i.ytimg.com/vi/25dFr40Oztg/maxresdefault.jpg',
    },
  ],
  description: 'Fast and Delicious Chinese cuisine, located in Paradise Palms.',
  owner: 'john@foo.com',
};

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test the Public List Vendor page', async (testController) => {
  await navBar.gotoPublicListVendorPage(testController);
  await publicListVendorPage.isDisplayed(testController);
  await publicListVendorPage.hasMenuItem(testController);
});

test('Test the List Vendor page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoListVendorPage(testController);
  await listVendorPage.isDisplayed(testController);
  await listVendorPage.hasMenuItem(testController);
});

test('Test the Edit List Vendor page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoEditListVendorPage(testController);
  await editListVendorPage.isDisplayed(testController);
  await editListVendorPage.hasMenuItem(testController);
});

test('Test the Admin List Vendor page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await navBar.gotoAdminListVendorPage(testController);
  await adminListVendorPage.isDisplayed(testController);
  await adminListVendorPage.hasMenuItem(testController);
});

test('Test the Add Vendor page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await navBar.gotoAdminListVendorPage(testController);
  await addVendorPage.existingTestVendorCheck(testController, testVendor.name);
  await navBar.gotoAddVendorPage(testController);
  await addVendorPage.isDisplayed(testController);
  await addVendorPage.addVendor(testController, testVendor);
  await navBar.gotoAdminListVendorPage(testController);
  await addVendorPage.vendorExists(testController, testVendor.name);
});

test('Test the Favorite Button', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoListVendorPage(testController);
  await addFavorite.addFavorite(testController, testVendor.name);
  await navBar.gotoUserProfilePage(testController);
  await addFavorite.likeExists(testController, testVendor.name);
});

test('Test Remove Favorite Button', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoUserProfilePage(testController);
  await removeFavorite.removeFavorite(testController, testVendor.name);
  await removeFavorite.likeRemoved(testController, testVendor.name);
});

test('Test the Delete Vendor Function', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await navBar.gotoAdminListVendorPage(testController);
  await addVendorPage.vendorExists(testController, testVendor.name);
  await removeVendorPage.RemoveVendor(testController, testVendor.name);
  await addVendorPage.existingTestVendorCheck(testController, testVendor.name);
});

test('Test the Available Now Page', async (testController) => {
  await navBar.gotoAvailableNow(testController);
  await availableNowPage.isDisplayed(testController);
  await availableNowPage.hasMenuItem(testController);
});

test('Test the VendorProfile', async (testController) => {
  await navBar.gotoPublicListVendorPage(testController);
  await publicListVendorPage.isDisplayed(testController);
  // await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  // await navBar.gotoVendorProfile(testController);
  await publicListVendorPage.gotoVendorProfile(testController);
  await vendorProfilePage.isDisplayed(testController);
  await vendorProfilePage.hasMenuItems(testController);
});
