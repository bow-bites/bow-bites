import { Selector } from 'testcafe';

class PublicListVendorPage {
  constructor() {
    this.pageId = '#public-list-vendor-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  async hasMenuItem(testController) {
    const menuItemCount = Selector('.ui .item').count;
    await testController.expect(menuItemCount).gte(1);
  }

  async gotoVendorProfile(testController) {
    await testController.click(Selector('#listVendor-profile').withText('View menu'));
  }
}

export const publicListVendorPage = new PublicListVendorPage();
