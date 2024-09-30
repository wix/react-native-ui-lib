import React, {Component} from 'react';
import {ScrollView, ActivityIndicator} from 'react-native';
import {
  Assets,
  Colors,
  Spacings,
  View,
  Text,
  Button,
  Keyboard,
  TextField,
  TextFieldRef,
  FieldContextType,
  TextFieldProps,
  SegmentedControl,
  Icon
} from 'react-native-ui-lib';
const {KeyboardAwareInsetsView} = Keyboard;

const {loadDemoConfigurations} = require('../../../src/configurations.js');
loadDemoConfigurations();

const priceFormatter = Intl.NumberFormat('en-US');

export default class TextFieldScreen extends Component {
  input = React.createRef<TextFieldRef>();
  input2 = React.createRef<TextFieldRef>();
  input3 = React.createRef<TextFieldRef>();
  inputWithValidation = React.createRef<TextFieldRef>();
  
  state = {
    errorPosition: TextField.validationMessagePositions.BOTTOM,
    isDisabled: false,
    isReadonly: false,
    value: 'Initial Value',
    isSearching: false,
    preset: undefined,
    price: '',
    editable: false
  };

  componentDidMount() {
    this.input.current?.focus();
  }

  resetFieldValue = () => {
    this.input2.current?.clear();
  };

  renderDefaultExample() {
    return (
      <>
        <Text h3 marginB-s1>
          Default
        </Text>

        <TextField ref={this.input} placeholder="Enter full name" preset={null}/>
      </>
    );
  }

  renderPresetExample() {
    return (
      <>
        <View marginV-s3>
          <Text h3>
            Presets
          </Text>
          <View row marginT-s2>
            <SegmentedControl segments={[{label: 'Underline'}, {label: 'Outline'}]} onChangeIndex={this.onChangeIndexFieldStyle}/>
          </View>
        </View>

        <TextField ref={this.input} placeholder="Enter full name" preset={this.state.preset}/>
      </>
    );
  }

  renderReadonlyExample() {
    const {editable, preset} = this.state;
    
    return (
      <>
        <View marginV-s3>
          <Text h3>
            Disabled vs Readonly
          </Text>

          <View row marginT-s2>
            <SegmentedControl segments={[{label: 'Disabled'}, {label: 'Readonly'}]} onChangeIndex={this.onChangeIndexEditable}/>
          </View>
        </View>

        <TextField ref={this.input} label={'Name'} placeholder="Enter full name" readonly={editable} editable={editable} preset={preset}/>
      </>
    );
  }

  renderPlaceholdersExample() {
    return (
      <>
        <Text h3 marginB-s1 marginT-s4>
          Static vs Floating Placeholder
        </Text>
        
        <View row bottom>
          <TextField
            placeholder="FloatingPlaceholder"
            floatingPlaceholder
            floatingPlaceholderColor={{
              focus: Colors.$textDefault,
              default: Colors.$textNeutral
            }}
            // floatingPlaceholderStyle={Typography.text60}
            // style={Typography.text60}
            containerStyle={{flex: 1}}
            preset={this.state.preset}
          />
          <TextField
            placeholder="Placeholder"
            containerStyle={{flex: 1, marginLeft: Spacings.s6}}
            preset={this.state.preset}
          />
        </View>
      </>
    );
  }

  renderHintExample() {
    return (
      <>
        <Text h3 marginT-s4>
          Hint vs HelperText
        </Text>

        <View row top>
          <TextField
            hint="1-6 numbers"
            placeholder="Enter code"
            floatingPlaceholder
            floatOnFocus
            preset={this.state.preset}
            containerStyle={{flex: 1}}
          />
          <TextField
            helperText="1-6 numbers"
            placeholder="Enter code"
            floatingPlaceholder
            floatOnFocus
            preset={this.state.preset}
            containerStyle={{flex: 1, marginLeft: Spacings.s6}}
          />
        </View>
      </>
    );
  }

  renderTrailingAccessory() {
    const {isSearching} = this.state;
    
    if (isSearching) {
      return <ActivityIndicator color={Colors.$iconDefault}/>;
    } else {
      return (
        <Button
          iconSource={Assets.icons.demo.search}
          link
          marginL-s2
          $iconDefault
          onPress={() => {
            this.setState({isSearching: true});
            setTimeout(() => {
              this.setState({isSearching: false});
            }, 1200);
          }}
        />
      );
    }
  }

  renderAccessoriesExample() {
    return (
      <>
        <Text h3 marginB-s3 marginT-s4>
          Accessories
        </Text>
        
        <Text marginB-s2 $textPrimary>Trailing Accessory:</Text>
        <TextField
          ref={this.input2}
          placeholder="Enter search term"
          trailingAccessory={this.renderTrailingAccessory()}
          preset={this.state.preset}
        />
        <TextField
          ref={this.input2}
          placeholder="Enter weight"
          keyboardType="numeric"
          trailingAccessory={
            <Text text70 $textNeutral>
              Kg.
            </Text>
          }
          preset={this.state.preset}
        />

        <Text marginB-s2 $textPrimary>Leading Accessory:</Text>
        <TextField
          ref={this.input2}
          placeholder="Enter URL"
          leadingAccessory={
            <Text text70 blue30 marginR-2>
              Https://
            </Text>
          }
          preset={this.state.preset}
        />
      </>
    );
  }

  onChangeIndexValidation = (index: number) => {
    this.setState({errorPosition: index === 0 ? 
      TextField.validationMessagePositions.BOTTOM : TextField.validationMessagePositions.TOP});
  };

  renderValidationExample() {
    const {errorPosition, preset, value} = this.state;
    
    return (
      <>
        <View>
          <Text h3 marginB-s1>Validation</Text>
          <View row centerV>
            <Text marginR-s4 $textPrimary>Error Position:</Text>
            <SegmentedControl segments={[{label: 'Bottom'}, {label: 'Top'}]} onChangeIndex={this.onChangeIndexValidation}/>
          </View>
        </View>

        <TextField
          value={value}
          onChangeText={value => this.setState({value})}
          label="Email"
          placeholder="Enter email"
          enableErrors
          validationMessage={['Email is required', 'Email is invalid']}
          // validationMessageStyle={Typography.text90R}
          validationMessagePosition={errorPosition}
          validate={['required', 'email']}
          onChangeValidity={(isValid: boolean) => console.warn('validity changed:', isValid, Date.now())}
          validateOnChange
          // validateOnStart
          // validateOnBlur
          preset={preset}
        />
        <View row spread center marginT-20>
          <TextField
            ref={this.inputWithValidation}
            label="Name"
            placeholder="Enter full name"
            validate="required"
            validationMessage="This field is required. That means you have to enter some value"
            containerStyle={{flex: 1}}
            validateOnChange
            validationMessagePosition={errorPosition}
            helperText={'Enter first and last name'}
            validationIcon={{source: Assets.icons.demo.exclamation, style: {marginTop: 1}}}
            topTrailingAccessory={<Icon source={Assets.icons.demo.info} size={16}/>}
            preset={preset}
            maxLength={20}
            showCharCounter
          />
          <Button
            outline
            marginL-s5
            label="Validate"
            size={Button.sizes.xSmall}
            onPress={() => {
              this.inputWithValidation.current?.validate?.();
            }}
          />
        </View>
      </>
    );
  }

  onChangeIndexColors = (index: number) => {
    let readonly, disabled = false;
    
    switch (index) {
      case 0:
        this.input3.current?.blur();
        this.input3.current?.clear();
        break;
      case 1:
        this.input3.current?.focus();
        break;
      case 2:
        this.input3.current?.clear();
        this.input3.current?.validate();
        break;
      case 3:
        readonly = true;
        break;
      case 4:
        disabled = true;
        break;
      default:
        break;
    }
    this.setState({isReadonly: readonly, isDisabled: disabled});
  };

  renderStateColorsExample() {
    const {isReadonly, isDisabled, preset} = this.state;

    return (
      <>
        <View row centerV spread>
          <View marginB-s3>
            <Text h3 marginB-s2>
              Colors By State
            </Text>
            <SegmentedControl segments={[{label: 'Empty'}, {label: 'Focus'}, {label: 'Error'}, {label: 'Readonly'}, {label: 'Disable'}]} onChangeIndex={this.onChangeIndexColors}/>
          </View>
        </View>

        <TextField
          ref={this.input3}
          readonly={isReadonly}
          editable={!isDisabled}
          validate={'required'}
          validateOnChange={false}
          validateOnBlur={false}
          preset={preset}
          label="Color"
          labelColor={{
            default: Colors.purple10,
            focus: Colors.green40,
            error: Colors.red30,
            readonly: Colors.purple40,
            disabled: Colors.cyan40
          }}
          placeholder="Color change by state"
          placeholderTextColor={{
            default: Colors.purple70,
            focus: Colors.green70,
            error: Colors.red70,
            readonly: Colors.purple70,
            disabled: Colors.cyan70
          }}
        />
      </>
    );
  }

  onChangeIndexFieldStyle = (index: number) => {
    this.setState({preset: index === 0 ? 'underline' : 'outline'});
  };

  onChangeIndexEditable = (index: number) => {
    this.setState({editable: index === 1});
  };

  getDynamicFieldStyle = (context: FieldContextType, props: TextFieldProps) => {
    let color = Colors.$outlineNeutral;
    
    if (context?.isFocused) {
      color = Colors.$outlinePrimary;
    }
    if ((context?.hasValue && context?.isValid === false) || 
      (context?.failingValidatorIndex !== undefined && context?.isMandatory && !context?.hasValue)) {
      color = Colors.$outlineDanger;
    }
    if (context?.hasValue && context?.isValid && context?.isFocused) {
      color = Colors.$textSuccess;
    }
    if (context?.disabled) {
      color = Colors.$outlineDisabled;
    }
    if (context?.readonly) {
      color = Colors.$outlineNeutralHeavy;
    }

    return props?.preset === TextField.presets.UNDERLINE ? {borderBottomColor: color} : {borderColor: color};
  };

  renderDynamicFieldExample() {
    const {preset} = this.state;

    return (
      <>
        <Text h3 marginB-s3>
          Dynamic Field Style
        </Text>

        <TextField
          label="Required"
          placeholder="Enter some value"
          validate={'required'}
          validateOnChange
          validationMessage="This field is required"
          preset={preset}
          dynamicFieldStyle={this.getDynamicFieldStyle}
        />
      </>
    );
  }

  renderCharCounterExample() {
    return (
      <>
        <Text h3 marginB-s3>
          Char Counter
        </Text>
        
        <TextField
          label="Description"
          placeholder="Enter text..."
          multiline
          showCharCounter
          bottomAccessory={<Text text100>{Assets.emojis.grapes} {Assets.emojis.melon} {Assets.emojis.banana}</Text>}
          charCounterStyle={{color: Colors.$textGeneral}}
          maxLength={20}
          preset={this.state.preset}
        />
      </>
    );
  }

  renderClearButtonExample() {
    return (
      <>
        <Text h3 marginB-s3>
          Clear Button
        </Text>
        
        <TextField
          label="Description"
          placeholder="Enter text..."
          showClearButton
          value={this.state.value}
          onChangeText={value => this.setState({value})}
          trailingAccessory={<Icon source={Assets.icons.demo.search}/>}
          // multiline
          preset={this.state.preset}
        />
      </>
    );
  }

  renderFormatterExample() {
    const {price, preset} = this.state;

    return (
      <>
        <Text h3 marginB-s3 marginT-s4>
          Formatter
        </Text>

        <TextField
          value={price}
          onChangeText={value => this.setState({price: value})}
          label="Price"
          placeholder="Enter price"
          validate={'number'}
          validationMessage="Invalid price"
          // @ts-expect-error
          formatter={value => (isNaN(value) ? value : priceFormatter.format(Number(value)))}
          leadingAccessory={<Text marginR-s1 $textNeutral>$</Text>}
          preset={preset}
        />
      </>
    );
  }

  renderCustomAlignmentExample() {
    const {preset, errorPosition} = this.state;

    return (
      <>
        <Text h3 marginB-3>
          Custom Alignments
        </Text>

        <Text marginB-s1 $textPrimary>Centered:</Text>
        <TextField
          label="PIN"
          placeholder="XXXX"
          centered
          topTrailingAccessory={<Icon source={Assets.icons.demo.info} size={16} marginL-s1/>}
          validate={'required'}
          validationMessage={'This field is required'}
          validateOnChange
          validationMessagePosition={errorPosition}
          preset={preset}
        />
        
        <Text marginB-s1 $textPrimary>Inline:</Text>
        <View row>
          <TextField placeholder="hours" preset={preset}/>
          <Text 
            marginT-s1={preset === TextField.presets.UNDERLINE} 
            marginT-s2={preset === TextField.presets.OUTLINE} 
            marginH-s1
          >
            :
          </Text>
          <TextField placeholder="minutes" preset={preset}/>
        </View>

        <Text marginB-s1 $textPrimary>
          leading/trailing accessory overflow (innerFlexBehavior)
        </Text>
        <View>
          <TextField
            placeholder="Placeholder"
            value="Abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*"
            trailingAccessory={<Icon source={Assets.icons.demo.search}/>}
            innerFlexBehavior
          />
        </View>
      </>
    );
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
        <View padding-page>
          <Text h1 marginB-s4>TextField</Text>

          {this.renderDefaultExample()}
          {this.renderPresetExample()}
          {this.renderReadonlyExample()}
          {this.renderPlaceholdersExample()}
          {this.renderHintExample()}
          {this.renderValidationExample()}
          {this.renderClearButtonExample()}
          {this.renderCharCounterExample()}
          {this.renderAccessoriesExample()}
          {this.renderStateColorsExample()}
          {this.renderDynamicFieldExample()}
          {this.renderFormatterExample()}
          {this.renderCustomAlignmentExample()}
        </View>
        <KeyboardAwareInsetsView/>
      </ScrollView>
    );
  }
}
