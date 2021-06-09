let PickerPackage, CommunityPickerPackage;

try {
  PickerPackage = require('@react-native-picker/picker'); // New package
} catch (error) {
  try {
    CommunityPickerPackage = require('@react-native-community/picker'); // Deprecated package
  } catch (error) {}
}

export { PickerPackage, CommunityPickerPackage };