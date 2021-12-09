import { Selector } from 'testcafe';

class AddVendorPage {
  constructor() {
    this.pageId = '#add-vendor-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Fills out and submits the form to signin, then checks to see that login was successful. */
  async addVendor(testController, testVendor) {
    const foodTypeSelect = Selector('#addVendor-FoodType');
    const foodOption = foodTypeSelect.find('option');

    await this.isDisplayed(testController);
    await testController.typeText('#addVendor-Name', testVendor.name);
    await testController.typeText('#addVendor-Location', testVendor.location);
    await testController.typeText('#addVendor-Owner', testVendor.owner);
    await testController.click(foodTypeSelect);
    await testController.click(foodOption.withText(testVendor.foodType));
    await testController.expect(foodTypeSelect.value).eql(testVendor.foodType);
    await testController.typeText('#addVendor-StoreImage', testVendor.storeImage);
    await testController.typeText('#addVendor-Open', testVendor.open);
    await testController.click(Selector('label').withText(testVendor.openAmOrPm));
    await testController.typeText('#addVendor-Close', testVendor.close);
    await testController.click('#addVendor-CloseAmOrPm-UE0');
    await testController.typeText('#uniforms-0000-000h', testVendor.menuItem[0].name);
    await testController.typeText('#uniforms-0000-000i', testVendor.menuItem[0].price);
    await testController.typeText('#uniforms-0000-000j', testVendor.menuItem[0].description);
    await testController.typeText('#uniforms-0000-000k', testVendor.menuItem[0].image);
    await testController.click('#uniforms-0000-000a');
    await testController.typeText('#uniforms-0000-000r', testVendor.menuItem[1].name);
    await testController.typeText('#uniforms-0000-000s', testVendor.menuItem[1].price);
    await testController.typeText('#uniforms-0000-000t', testVendor.menuItem[1].description);
    await testController.typeText('#uniforms-0000-000u', testVendor.menuItem[1].image);
    await testController.typeText('#addVendor-Description', testVendor.description);
    await testController.click('#addVendor-Submit');
    await testController.pressKey('tab enter');
  }

  async vendorExists(testController, name) {
    const vendorName = Selector('#listVendor-Name').withText(name);
    await testController.expect((vendorName).exists).ok();
  }

  async existingTestVendorCheck(testController, name) {
    const vendorName = Selector('#listVendor-Name').withText(name);
    await testController.expect((vendorName).exists).notOk();
  }
}

export const addVendorPage = new AddVendorPage();
