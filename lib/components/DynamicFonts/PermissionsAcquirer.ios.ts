export default class PermissionsAcquirer {
  public async checkPermissions() {
    return Promise.resolve(true);
  }

  public async getPermissions() {
    return Promise.resolve();
  }
}
