export class SelectorChainingException extends Error {
  constructor() {
    super('Selector chaining is unsupported');
  }
}
