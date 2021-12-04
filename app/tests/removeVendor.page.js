import { Selector } from 'testcafe';

class RemoveVendorPage {
  constructor() {
    this.pageId = '#admin-list-vendor-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Removes the test Vendor. */
  async RemoveVendor(testController, testVendor) {
    const vendorDelete = Selector('#listVendor-Delete').withText(`Delete ${testVendor}`);
    const vendorDeleteConfirm = Selector('.button.ui.primary.button').withText('OK');

    await this.isDisplayed(testController);
    await testController.click(vendorDelete());
    await testController.click(vendorDeleteConfirm());
  }
}

export const removeVendorPage = new RemoveVendorPage();
