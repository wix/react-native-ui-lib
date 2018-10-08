describe('screensComponents/index', () => {
  it('should export the same structure', () => {
    expect(require('../index')).toMatchSnapshot();
  });
});
