export class NoSelectorException extends Error {
  constructor() {
    super('No element under test, please use one of the selector before performing operations');
  }
}
