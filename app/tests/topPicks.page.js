import { Selector } from 'testcafe';

class TopPicksPage {
  constructor() {
    this.pageId = '#top-picks';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  /** Makes sure TopPicks has Menu Items displayed */
  async hasMenuItem(testController) {
    const menuItemCount = Selector('.ui .item').count;
    await testController.expect(menuItemCount).gte(1);
  }
}

export const topPicksPage = new TopPicksPage();
