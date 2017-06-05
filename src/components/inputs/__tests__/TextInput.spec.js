import uut from '../TextInput';

describe('TextInput', () => {
  it('should shouldFakePlaceholder', () => {
    let textInput = new uut({});
    expect(textInput.shouldFakePlaceholder()).toBe(false);

    textInput = new uut({floatingPlaceholder: true});
    expect(textInput.shouldFakePlaceholder()).toBe(true);

    textInput = new uut({floatingPlaceholder: true, centered: true});
    expect(textInput.shouldFakePlaceholder()).toBe(false);

    textInput = new uut({expandable: true});
    expect(textInput.shouldFakePlaceholder()).toBe(true);
  });
});
