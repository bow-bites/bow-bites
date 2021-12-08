import { Selector } from 'testcafe';

class NavBar {

  /** If someone is logged in, then log them out, otherwise do nothing. */
  async ensureLogout(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#navbar-current-user');
      await testController.click('#navbar-sign-out');
    }
  }

  async gotoSigninPage(testController) {
    await this.ensureLogout(testController);
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-in');
  }

  /** Check that the specified user is currently logged in. */
  async isLoggedIn(testController, username) {
    const loggedInUser = Selector('#navbar-current-user').innerText;
    await testController.expect(loggedInUser).eql(username);
  }

  /** Check that someone is logged in, then click items to logout. */
  async logout(testController) {
    await testController.expect(Selector('#navbar-current-user').exists).ok();
    await testController.click('#navbar-current-user');
    await testController.click('#navbar-sign-out');
  }

  /** Pull down login menu, go to sign up page. */
  async gotoSignupPage(testController) {
    await this.ensureLogout(testController);
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-up');
  }

  async gotoListVendorPage(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#navbar-list-vendor');
    }
  }

  async gotoEditListVendorPage(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#navbar-edit-list-vendor');
    }
  }

  async gotoPublicListVendorPage(testController) {
    await testController.click('#navbar-public-list-vendor');
  }

  async gotoAdminListVendorPage(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#navbar-admin-list-vendor');
    }
  }

  async gotoAddVendorPage(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#navbar-add-vendor');
    }
  }

  async gotoUserProfilePage(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#navbar-user-profile');
    }
  }

  async gotoTopPicksPage(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#navbar-top-picks');
    }
  }

  async gotoAvailableNow(testController) {
    await testController.click('#navbar-available-now');
  }

  async gotoVendorProfile(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#navbar-vendor-profile');
    }
  }
}

export const navBar = new NavBar();
