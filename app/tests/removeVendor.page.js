import { Selector } from 'testcafe';

class RemoveVendorPage {
  constructor() {
    this.pageId = '#list-vendor-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Removes the test Vendor. */
  async removeVendor(testController, testVendor) {
    const vendorDelete = Selector('#listVendor-Delete').withText('Delete ' + testVendor);
    const vendorDeleteConfirm = Selector('#listVendor-ConfirmDelete').withText('Confirm to Delete ' + testVendor);

    await this.isDisplayed(testController);
    await testController.click(vendorDelete());
    await testController.click(vendorDeleteConfirm());
  }
}

export const removeVendorPage = new RemoveVendorPage();
