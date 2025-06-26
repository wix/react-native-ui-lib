const mainDriver = {
  searchBar: element(by.id('uilib.search_for_component')),
  searchResult: (text) => element(by.text(text)),
};

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should nav to SortableList', async () => {
    await mainDriver.searchBar.tap();
    await mainDriver.searchBar.replaceText('Sortable');
    await mainDriver.searchResult('SortableList').tap();
    await detox.REPL();
  });
});
