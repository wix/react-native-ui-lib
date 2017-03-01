export function isItemSelected(childValue, selectedValue) {
  let isSelected = false;
  if (Array.isArray(selectedValue)) {
    isSelected = selectedValue.indexOf(childValue) !== -1;
  } else {
    isSelected = childValue === selectedValue;
  }
  return isSelected;
}
