import { Selector } from 'testcafe';

class AvailableNowPage {
  constructor() {
    this.pageId = '#available-now';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 20 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(20000).expect(this.pageSelector.exists).ok();
  }

  /** Makes sure AvailableNow has Menu Items displayed */
  async hasMenuItem(testController) {
    const menuItemCount = Selector('.ui .item').count;
    await testController.expect(menuItemCount).gte(1);
  }
}

export const availableNowPage = new AvailableNowPage();
