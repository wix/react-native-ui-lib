export class MultipleInstancesException extends Error {
  constructor(size: number) {
    super(`${size} instances were found for this selector, please specify the explicit instance`);
  }
}
