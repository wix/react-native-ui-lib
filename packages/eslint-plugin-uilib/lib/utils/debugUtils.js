// stringify with no circular error
function stringify(object) {
  if (object && typeof object === 'object') {
    object = _copyWithoutCircularReferences([object], object);
  }
  return JSON.stringify(object);

  function _copyWithoutCircularReferences(references, object) {
    const cleanObject = {};
    Object.keys(object).forEach(key => {
      const value = object[key];
      if (value && typeof value === 'object') { // TODO: do we need the 'value &&'?
        if (references.indexOf(value) < 0) {
          references.push(value);
          cleanObject[key] = _copyWithoutCircularReferences(references, value);
          references.pop();
        } else {
          cleanObject[key] = '###_Circular_###';
        }
      } else if (typeof value !== 'function') {
        cleanObject[key] = value;
      }
    });
    return cleanObject;
  }
}

module.exports = {
  stringify
};
