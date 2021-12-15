import { Selector } from 'testcafe';

class AvailableNowPage {
  constructor() {
    this.pageId = '#available-now';
    this.pageSelector = Selector(this.pageId);
  }

  /** Makes sure AvailableNow has Menu Items displayed */
  async hasMenuItem(testController) {
    const menuItemCount = Selector('.ui .item').count;
    await testController.expect(menuItemCount).gte(1);
  }
}

export const availableNowPage = new AvailableNowPage();
