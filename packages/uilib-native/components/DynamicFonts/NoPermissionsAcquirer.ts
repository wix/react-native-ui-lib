export default class NoPermissionsAcquirer {
  public async getPermissions() {
    return Promise.resolve();
  }
}
