export class SelectorNotFoundException extends Error {
  constructor() {
    super('No elements under this selector were found.');
  }
}
