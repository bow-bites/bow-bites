import { Selector } from 'testcafe';

class VendorProfilePage {
  constructor() {
    // this.pageId = '#vendor-profile';
    this.pageId = '#vendor-profile';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  /** Navigate to Profile Page */
  async gotoVendorProfile(testController) {
    await testController.click(Selector('.btn').withText('Profile'));
  }

  /** Verify there's some MenuItems */
  async hasMenuItems(testController) {
    const profileItemCount = Selector('.ui .item').count;
    await testController.expect(profileItemCount).gte(1);
  }
}

export const vendorProfilePage = new VendorProfilePage();
