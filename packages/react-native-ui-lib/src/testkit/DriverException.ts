export class MultipleInstancesException extends Error {
  constructor(size: number) {
    super(`${size} instances were found for this selector, please specify the explicit instance`);
  }
}

export class NoSelectorException extends Error {
  constructor() {
    super('No element under test, please use one of the selector before performing operations');
  }
}

export class SelectorChainingException extends Error {
  constructor() {
    super('Selector chaining is unsupported');
  }
}

export class SelectorNotFoundException extends Error {
  constructor() {
    super('No elements under this selector were found.');
  }
}
