import { Selector } from 'testcafe';

class AddFavorite {
  constructor() {
    this.pageId = '#list-vendor-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Removes the test Vendor. */
  async addFavorite(testController, testVendor) {
    const vendorFavorite = Selector('#listVendor-Favorite').withText(`Favorite ${testVendor}`);

    await this.isDisplayed(testController);
    await testController.click(vendorFavorite());
  }

  async likeExists(testController, name) {
    const vendorName = Selector('#userProfile-Name').withText(name);
    await testController.expect((vendorName).exists).ok();
  }
}

export const addFavorite = new AddFavorite();
