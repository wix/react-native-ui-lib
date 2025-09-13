// Note: enum values are uppercase due to legacy
export let PickerModes = /*#__PURE__*/function (PickerModes) {
  PickerModes["SINGLE"] = "SINGLE";
  PickerModes["MULTI"] = "MULTI";
  return PickerModes;
}({});
export let PickerFieldTypes = /*#__PURE__*/function (PickerFieldTypes) {
  PickerFieldTypes["form"] = "form";
  PickerFieldTypes["filter"] = "filter";
  PickerFieldTypes["settings"] = "settings";
  return PickerFieldTypes;
}({});

// TODO: Remove type
// type PickerValueDeprecated = {value: string | number; label: string};