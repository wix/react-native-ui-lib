import TextInput from '../TextInput';

describe('TextInput', () => {
  it('should shouldFakePlaceholder', () => {
    let uut = new TextInput({});
    expect(uut.shouldFakePlaceholder()).toBe(false);

    uut = new TextInput({floatingPlaceholder: true});
    expect(uut.shouldFakePlaceholder()).toBe(true);

    uut = new TextInput({floatingPlaceholder: true, centered: true});
    expect(uut.shouldFakePlaceholder()).toBe(false);

    uut = new TextInput({expandable: true});
    expect(uut.shouldFakePlaceholder()).toBe(true);
  });
});
