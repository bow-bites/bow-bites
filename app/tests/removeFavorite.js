import { Selector } from 'testcafe';

class RemoveFavorite {
  constructor() {
    this.pageId = '#user-profile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Removes the test Vendor. */
  async removeFavorite(testController, testVendor) {
    const vendorFavorite = Selector('#userProfile-Delete').withText('Remove ' + testVendor + ' from Favorites');

    await this.isDisplayed(testController);
    await testController.click(vendorFavorite());
  }

  async likeRemoved(testController, name) {
    const vendorName = Selector('#userProfile-Name').withText(name);
    await testController.expect((vendorName).exists).notOk();
  }
}

export const removeFavorite = new RemoveFavorite();
