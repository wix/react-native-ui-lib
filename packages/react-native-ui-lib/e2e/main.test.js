describe('App launch', () => {
  beforeAll(async () => {
    await device.launchApp({newInstance: true});
  });

  it('shows the main screen with the R N U I L I B title', async () => {
    await expect(element(by.text('R N U I L I B'))).toBeVisible();
  });
});
