import React, {useState} from 'react';
import {render} from '@testing-library/react-native';
import Constants from '../../../commons/Constants';
import Assets from '../../../assets';
import View from '../../../components/view';
import {TextFieldDriver} from '../TextField.driver.new';
import TextField from '../index';
import {TextFieldProps} from '../types';

const TEXT_FIELD_TEST_ID = 'text_field_test_id';
const placeholder = 'Placeholder';
const label = 'Label';
const hint = 'Hint';
const helperText = 'Helper Text';

function TestCase(textFieldProps?: TextFieldProps) {
  const [value, setValue] = useState(textFieldProps?.value);
  return (
    <View>
      <TextField {...textFieldProps} testID={TEXT_FIELD_TEST_ID} value={value} onChangeText={setValue}/>
    </View>
  );
}

const validate = jest.fn((value: string) => {
  return !!value;
});

describe('TextField', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe.each(['outline', 'underline', undefined])('on %s preset', preset => {
    const defaultProps = {preset};

    describe('sanity', () => {
      it('should render textField', () => {
        const renderTree = render(<TestCase {...defaultProps}/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        expect(textFieldDriver.exists()).toBe(true);
      });

      it('should render textField with correct content', () => {
        const renderTree = render(<TestCase {...defaultProps} value={'aa'}/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        expect(textFieldDriver.getValue()).toEqual('aa');
      });

      it('should change the text correctly', () => {
        const renderTree = render(<TestCase {...defaultProps} value={'aa'}/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        expect(textFieldDriver.getValue()).toEqual('aa');

        textFieldDriver.changeText('bb');
        expect(textFieldDriver.getValue()).toEqual('bb');
      });
    });

    describe('editable', () => {
      it('should be editable', () => {
        const renderTree = render(<TestCase {...defaultProps}/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        expect(textFieldDriver.isEnabled()).toBe(true);
      });

      it('should render textField that is not editable', () => {
        const renderTree = render(<TestCase {...defaultProps} editable={false}/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        expect(textFieldDriver.isEnabled()).toBe(false);
      });
    });

    describe('readonly', () => {
      it('should render textField that is not readonly', () => {
        const renderTree = render(<TestCase {...defaultProps}/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        expect(textFieldDriver.isEnabled()).toBe(true);
      });

      it('should be readonly', () => {
        const renderTree = render(<TestCase {...defaultProps} readonly/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        expect(textFieldDriver.isEnabled()).toBe(false);
      });
    });

    describe('placeholder', () => {
      it('should render placeholder with correct text', () => {
        const renderTree = render(<TestCase {...defaultProps} placeholder={'mock placeholder'}/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        expect(textFieldDriver.getPlaceholder().exists()).toBe(true);
        expect(textFieldDriver.getPlaceholder().getText()).toEqual('mock placeholder');
      });

      it('should not render placeholder', () => {
        const renderTree = render(<TestCase {...defaultProps}/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        expect(textFieldDriver.getPlaceholder().exists()).toBe(false);
      });

      it('should not render placeholder after user changing the input text (no floating prop)', () => {
        const renderTree = render(<TestCase {...defaultProps} placeholder={'mock placeholder'}/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        expect(textFieldDriver.getPlaceholder().exists()).toBe(true);

        textFieldDriver.changeText('mock input value');
        expect(textFieldDriver.getPlaceholder().exists()).toBe(false);
      });

      it('should render placeholder (floating) after user changing text if floatingPlaceholder prop sent', () => {
        const renderTree = render(<TestCase {...defaultProps} placeholder={'mock placeholder'} floatingPlaceholder/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        expect(textFieldDriver.getPlaceholder().exists()).toBe(true);

        textFieldDriver.changeText('mock input value');
        expect(textFieldDriver.getPlaceholder().exists()).toBe(true);
        expect(textFieldDriver.getPlaceholder().getText()).toEqual('mock placeholder');
      });
    });

    describe('label', () => {
      it('should not render label if prop is not passed', () => {
        const renderTree = render(<TestCase {...defaultProps}/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        expect(textFieldDriver.getLabel().exists()).toBe(false);
      });

      it('should render a label', () => {
        const renderTree = render(<TestCase {...defaultProps} label={'mock label'}/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        expect(textFieldDriver.getLabel().exists()).toBe(true);
        expect(textFieldDriver.getLabel().getText()).toEqual('mock label');
      });

      it('should not render label if floatingPlaceholder prop is passed', () => {
        const renderTree = render(<TestCase {...defaultProps} label={'mock label'} floatingPlaceholder/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        expect(textFieldDriver.getLabel().exists()).toBe(false);
      });
    });

    describe('validation message', () => {
      it('should not render validationMessage if enableErrors is undefined', () => {
        const renderTree = render(<TestCase {...defaultProps} value={''} validationMessage={'mock message'} validateOnStart enableErrors={undefined}/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        expect(textFieldDriver.getValidationMessage().exists()).toBe(false);
      });

      it('should not render validationMessage if enableErrors is not passed (passed by the preset)', () => {
        const renderTree = render(<TestCase {...defaultProps} value={''} validationMessage={'mock message'} validateOnStart/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        expect(textFieldDriver.getValidationMessage().exists()).toBe(!!defaultProps?.preset);
      });

      it('should render validationMessage if validationMessage passed and remove it when validationMessage is changed to undefined', () => {
        const renderTree = render(<TestCase {...defaultProps} value={''} validationMessage={'mock message'} enableErrors/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        expect(textFieldDriver.getValidationMessage().exists()).toBe(true);
        expect(textFieldDriver.getValidationMessage().getText()).toEqual('mock message');

        renderTree.rerender(<TestCase {...defaultProps} value={''} validationMessage={undefined} enableErrors/>);

        expect(textFieldDriver.getValidationMessage().exists()).toBe(false);
      });

      it('should not render validationMessage if validationMessage is undefined and add it when validationMessage is passed', () => {
        const renderTree = render(<TestCase {...defaultProps} value={''} validationMessage={undefined} enableErrors/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        expect(textFieldDriver.getValidationMessage().exists()).toBe(false);

        renderTree.rerender(<TestCase {...defaultProps} value={''} validationMessage={'mock message'} enableErrors/>);

        expect(textFieldDriver.getValidationMessage().exists()).toBe(true);
        expect(textFieldDriver.getValidationMessage().getText()).toEqual('mock message');
      });


      it('should render validationMessage on start if input required and validateOnStart passed', () => {
        const renderTree = render(<TestCase {...defaultProps} value={''} validationMessage={'mock message'} enableErrors validateOnStart/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        expect(textFieldDriver.getValidationMessage().exists()).toBe(true);
        expect(textFieldDriver.getValidationMessage().getText()).toEqual('mock message');
      });

      it('should render validationMessage when input is requires after changing the input to empty string', () => {
        const renderTree = render(<TestCase {...defaultProps} value={''} validate={'required'} validationMessage={'mock message'} enableErrors validateOnChange/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        expect(textFieldDriver.getValidationMessage().exists()).toBe(false);
        expect(textFieldDriver.getValidationMessage().getText()).toEqual('');

        textFieldDriver.changeText('');
        expect(textFieldDriver.getValidationMessage().exists()).toBe(true);
        expect(textFieldDriver.getValidationMessage().getText()).toEqual('mock message');
      });

      it('should display validation error message when validation fail after blur', () => {
        const renderTree = render(<TestCase {...defaultProps} validate={'email'} validationMessage={'email is invalid'} enableErrors validateOnBlur/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        textFieldDriver.changeText('invalidEmail');
        textFieldDriver.blur();

        expect(textFieldDriver.getValidationMessage().getText()).toEqual('email is invalid');
      });

      it('should remove validation error message after entering a valid input', () => {
        const renderTree = render(<TestCase
          {...defaultProps}
          value={'invalid'}
          validate={'email'}
          validationMessage={'email is invalid'}
          enableErrors
          validateOnStart
          validateOnChange
        />);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        expect(textFieldDriver.getValidationMessage().getText()).toEqual('email is invalid');

        textFieldDriver.changeText('mail@mail.com');
        expect(textFieldDriver.getValidationMessage().exists()).toEqual(false);
      });
    });

    describe('validateOnBlur', () => {
      it('validate is called with undefined when defaultValue is not passed', () => {
        const renderTree = render(<TestCase {...defaultProps} validateOnBlur validationMessage={'Not valid'} validate={[validate]}/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        textFieldDriver.focus();
        textFieldDriver.blur();

        expect(validate).toHaveBeenCalledTimes(1);
        expect(validate).toHaveBeenCalledWith(undefined);
      });

      it('validate is called with defaultValue when defaultValue is passed', () => {
        const defaultValue = '1';
        const renderTree = render(<TestCase {...defaultProps} validateOnBlur validationMessage={'Not valid'} validate={[validate]} defaultValue={defaultValue}/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        textFieldDriver.focus();
        textFieldDriver.blur();

        expect(validate).toHaveBeenCalledTimes(1);
        expect(validate).toHaveBeenCalledWith(defaultValue);
      });
    });

    describe('validationIcon', () => {
      it('should display validationIcon', () => {
        const renderTree = render(<TestCase
          {...defaultProps}
          enableErrors
          validateOnStart
          validate={'required'}
          validationMessage={'This field is required'}
          validationIcon={{source: Assets.internal.icons.check}}
        />);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        expect(textFieldDriver.getValidationMessage().exists()).toBe(true);
        expect(textFieldDriver.getValidationIcon().exists()).toBe(true);
      });

      it('should not display validationIcon', () => {
        const renderTree = render(<TestCase {...defaultProps} enableErrors validateOnStart validate={'required'} validationMessage={'This field is required'}/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        expect(textFieldDriver.getValidationMessage().exists()).toBe(true);
        expect(textFieldDriver.getValidationIcon().exists()).toBe(false);
      });
    });

    describe('defaultValue', () => {
      const props = {
        ...defaultProps,
        testID: TEXT_FIELD_TEST_ID,
        placeholder: 'Placeholder',
        defaultValue: 'someDefaultValue',
        value: 'someValue'
      };

      it('value should equal defaultValue on first render when value not passed', () => {
        const renderTree = render(<TestCase {...props} value={undefined}/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        expect(textFieldDriver.getValue()).toEqual('someDefaultValue');
      });

      it('value should equal value on first render when passed', () => {
        const renderTree = render(<TestCase {...props} defaultValue={undefined}/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        expect(textFieldDriver.getValue()).toEqual('someValue');
      });

      it.each`
        platform    | isWeb
        ${'web'}    | ${true}
        ${'native'} | ${false}
      `('on $platform should reset defaultValue when prop changed after first render', args => {
        Constants.isWeb = args.isWeb;

        const renderTree = render(<TestCase {...props} value={undefined}/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        renderTree.rerender(<TestCase {...props} value={undefined} defaultValue={'someUpdatedDefaultValue'}/>);

        expect(textFieldDriver.getValue()).toEqual('someUpdatedDefaultValue');
      });
    });

    describe('char counter', () => {
      it('should render char counter', () => {
        const renderTree = render(<TestCase {...defaultProps} maxLength={10} showCharCounter/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        expect(textFieldDriver.getCharCounter().exists()).toBe(true);
      });

      it('should not render counter if maxLength prop not supplied', () => {
        const renderTree = render(<TestCase {...defaultProps} showCharCounter/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        expect(textFieldDriver.getCharCounter().exists()).toBe(false);
      });

      it('should not render counter if showCharCounter prop not supplied', () => {
        const renderTree = render(<TestCase {...defaultProps} maxLength={10}/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        expect(textFieldDriver.getCharCounter().exists()).toBe(false);
      });

      it('should render char counter with "0/10" if value not supplied', () => {
        const renderTree = render(<TestCase {...defaultProps} maxLength={10} showCharCounter/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        expect(textFieldDriver.getCharCounter().getText()).toEqual('0/10');
      });

      it('should render char counter with correct content', () => {
        const renderTree = render(<TestCase {...defaultProps} value={'abc'} maxLength={10} showCharCounter/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        expect(textFieldDriver.getCharCounter().getText()).toEqual('3/10');
      });

      it('should update char counter after changing the text', () => {
        const renderTree = render(<TestCase {...defaultProps} value={'ab'} maxLength={10} showCharCounter/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        expect(textFieldDriver.getCharCounter().getText()).toEqual('2/10');

        textFieldDriver.changeText('abcd');
        expect(textFieldDriver.getCharCounter().getText()).toEqual('4/10');
      });
    });

    describe('hint', () => {
      it('should hint text replace placeholder when input is focused', () => {
        const renderTree = render(<TestCase {...defaultProps} hint={hint} placeholder={placeholder}/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        expect(textFieldDriver.getPlaceholder().getText()).toEqual(placeholder);

        textFieldDriver.focus();
        expect(textFieldDriver.getPlaceholder().getText()).toEqual(hint);
      });

      it('should not show hint when hint prop not passed', () => {
        const renderTree = render(<TestCase {...defaultProps} placeholder={placeholder}/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        expect(textFieldDriver.getPlaceholder().getText()).toEqual(placeholder);

        textFieldDriver.focus();
        expect(textFieldDriver.getPlaceholder().getText()).toEqual(placeholder);
      });
    });

    describe('helperText', () => {
      it('should display helperText', () => {
        const renderTree = render(
          <TestCase {...defaultProps} placeholder={placeholder} hint={hint} helperText={helperText}/>
        );
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        expect(textFieldDriver.getHelperText().exists()).toBe(true);
      });

      it('should not display helperText', () => {
        const renderTree = render(<TestCase {...defaultProps} placeholder={placeholder}/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        expect(textFieldDriver.getHelperText().exists()).toBe(false);
      });
    });

    describe('clear button', () => {
      it('should not render clear button', async () => {
        const renderTree = render(<TestCase {...defaultProps}/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        expect(await textFieldDriver.getClearButton().exists()).toBe(false);
      });

      it('should not display clear button when value is undefined', async () => {
        const renderTree = render(<TestCase {...defaultProps} showClearButton/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
        const clearButtonDriver = textFieldDriver.getClearButton();

        expect(await clearButtonDriver.exists()).toBe(true);
        expect(await clearButtonDriver.visible()).toBe(false);
      });

      it('should not display clear button when value is empty', async () => {
        const renderTree = render(<TestCase {...defaultProps} showClearButton value={''}/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
        const clearButtonDriver = textFieldDriver.getClearButton();

        expect(await clearButtonDriver.exists()).toBe(true);
        expect(await clearButtonDriver.visible()).toBe(false);
      });

      it('should display clear button when has value', async () => {
        const renderTree = render(<TestCase {...defaultProps} showClearButton value={'value'}/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
        const clearButtonDriver = textFieldDriver.getClearButton();

        expect(await clearButtonDriver.exists()).toBe(true);
        expect(await clearButtonDriver.visible()).toBe(true);
      });

      it('should toggle clear button when value changes', async () => {
        const renderTree = render(<TestCase {...defaultProps} showClearButton/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
        const clearButtonDriver = textFieldDriver.getClearButton();

        expect(clearButtonDriver.exists()).toBe(true);
        expect(await clearButtonDriver.visible()).toBe(false);

        textFieldDriver.changeText('b');
        expect(await clearButtonDriver.visible()).toBe(true);

        textFieldDriver.changeText('');
        expect(await clearButtonDriver.visible()).toBe(false);
      });

      it('should clear value when pressed', () => {
        const renderTree = render(<TestCase {...defaultProps} showClearButton value={'value'}/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
        const clearButtonDriver = textFieldDriver.getClearButton();

        expect(clearButtonDriver.exists()).toBe(true);

        clearButtonDriver.press();
        expect(textFieldDriver.getValue()).toEqual('');
      });
    });

    describe('formatter', () => {
      const priceFormatter = Intl.NumberFormat('en-US');

      const props = {
        ...defaultProps,
        value: '10000',
        formatter: value => priceFormatter.format(Number(value))
      };

      it('should format value while not focused based on formatter prop', () => {
        const renderTree = render(<TestCase {...props}/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        expect(textFieldDriver.getValue()).toEqual('10,000');
      });

      it('should not format value while focused', () => {
        const renderTree = render(<TestCase {...props}/>);
        const textFieldDriver = TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});

        textFieldDriver.focus();

        expect(textFieldDriver.getValue()).toEqual('10000');
      });
    });

    describe('Mandatory Indication', () => {
      const getTestCaseDriver = (props: TextFieldProps) => {
        const renderTree = render(<TestCase {...defaultProps} {...props}/>);
        return TextFieldDriver({renderTree, testID: TEXT_FIELD_TEST_ID});
      };
      const starReg = /.*\*$/;

      describe('label', () => {
        it('should show mandatory indication on the label when required validate passed', () => {
          const textFieldDriver = getTestCaseDriver({label, validate: 'required', showMandatoryIndication: true});
          const labelContent = textFieldDriver.getLabel().getText();

          expect(labelContent).toMatch(starReg);
        });

        it('should show mandatory indication on the label when required is passed in validate array', () => {
          const textFieldDriver = getTestCaseDriver({label, validate: ['required'], showMandatoryIndication: true});
          const labelContent = textFieldDriver.getLabel().getText();

          expect(labelContent).toMatch(starReg);
        });

        it('should show mandatory indication when required is passed in validate array with other validations', () => {
          const textFieldDriver = getTestCaseDriver({
            label,
            validate: ['email', 'required'],
            showMandatoryIndication: true
          });
          const labelContent = textFieldDriver.getLabel().getText();

          expect(labelContent).toMatch(starReg);
        });

        it('should not show mandatory indication on label when validate not passed', () => {
          const textFieldDriver = getTestCaseDriver({label, showMandatoryIndication: true});
          const labelText = textFieldDriver.getLabel().getText();

          expect(labelText).not.toMatch(starReg);
        });

        it('should not show mandatory indication on label when showMandatoryIndication not passed', () => {
          const textFieldDriver = getTestCaseDriver({label, validate: 'required'});
          const labelText = textFieldDriver.getLabel().getText();

          expect(labelText).not.toMatch(starReg);
        });

        it('should have mandatory indication on the label and not on the placeholder', () => {
          const textFieldDriver = getTestCaseDriver({
            placeholder,
            label,
            validate: 'required',
            showMandatoryIndication: true
          });
          const labelText = textFieldDriver.getLabel().getText();
          const placeholderText = textFieldDriver.getPlaceholder().getText();

          expect(labelText).toMatch(starReg);
          expect(placeholderText).not.toMatch(starReg);
        });
      });

      describe('placeholder', () => {
        it('should have mandatory indication on the placeholder', () => {
          const textFieldDriver = getTestCaseDriver({placeholder, showMandatoryIndication: true, validate: 'required'});
          const placeholderText = textFieldDriver.getPlaceholder().getText();

          expect(placeholderText).toMatch(starReg);
        });

        it('should not have mandatory indication on the placeholder when validate not passed', () => {
          const textFieldDriver = getTestCaseDriver({placeholder, label, showMandatoryIndication: true});
          const placeholderText = textFieldDriver.getPlaceholder().getText();
          const labelText = textFieldDriver.getLabel().getText();

          expect(placeholderText).not.toMatch(starReg);
          expect(labelText).not.toMatch(starReg);
        });

        it('should not have mandatory indication on the placeholder when showMandatoryIndication not passed', () => {
          const textFieldDriver = getTestCaseDriver({placeholder, label, validate: 'required'});
          const placeholderText = textFieldDriver.getPlaceholder().getText();
          const labelText = textFieldDriver.getLabel().getText();

          expect(placeholderText).not.toMatch(starReg);
          expect(labelText).not.toMatch(starReg);
        });
      });

      describe('floating placeholder', () => {
        it('should have mandatory indication on the floating placeholder', () => {
          const textFieldDriver = getTestCaseDriver({
            placeholder,
            floatingPlaceholder: true,
            floatOnFocus: true,
            showMandatoryIndication: true,
            validate: 'required'
          });
          const placeholderText = textFieldDriver.getPlaceholder().getText();

          expect(placeholderText).toMatch(starReg);
        });
      });
    });
  });
});
