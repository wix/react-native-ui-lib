import _get from "lodash/get";
import _isPlainObject from "lodash/isPlainObject";
import _isString from "lodash/isString";
function assignProperties(a, b) {
  if (a) {
    Object.keys(b).forEach(key => {
      // @ts-ignore
      Object.defineProperty(a, key, Object.getOwnPropertyDescriptor(b, key));
    });
  }
  return a;
}
function ensurePath(obj, path) {
  let pointer = obj;
  const pathArray = path.split('.');
  const n = pathArray.length;
  for (let i = 0; i < n; i++) {
    const segment = pathArray[i];
    if (pointer[segment]) {
      const descriptor = Object.getOwnPropertyDescriptor(pointer, segment);
      if (descriptor?.get) {
        Object.defineProperty(pointer, segment, descriptor);
      }
    } else {
      pointer[segment] = pointer[segment] || {};
    }
    pointer = pointer[segment];
  }
  return pointer;
}
export class Assets {
  loadAssetsGroup(groupName, assets) {
    if (!_isString(groupName)) {
      throw new Error('group name should be a string');
    }
    if (!_isPlainObject(assets)) {
      throw new Error('assets should be a hash map or a function (for lazy access)');
    }
    if (groupName === '') {
      assignProperties(this, assets);
    } else {
      assignProperties(ensurePath(this, groupName), assets);
    }
    return this;
  }
  getAssetByPath(path) {
    return _get(this, path);
  }
}