import { landingPage } from './landing.page';
import { listVendorPage } from './listvendor.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { addVendorPage } from './addvendor.page';
import { removeVendorPage } from './removeVendor.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };

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

test('Test the List Vendor page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoListVendorPage(testController);
  await listVendorPage.isDisplayed(testController);
  await listVendorPage.hasMenuItem(testController);
});

test.only('Test the Add Vendor page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  // await navBar.gotoListVendorPage(testController);
  // await addVendorPage.existingTestVendorCheck(testController, testVendor.name);
  await navBar.gotoAddVendorPage(testController);
  await addVendorPage.isDisplayed(testController);
  await addVendorPage.addVendor(testController, testVendor);
  // await navBar.gotoListVendorPage(testController);
  // await addVendorPage.vendorExists(testController, testVendor.name);
});

test('Test the Delete Vendor Function', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoListVendorPage(testController);
  await addVendorPage.vendorExists(testController, testVendor.name);
  await removeVendorPage.removeVendor(testController, testVendor.name);
  await addVendorPage.existingTestVendorCheck(testController, testVendor.name);
});
