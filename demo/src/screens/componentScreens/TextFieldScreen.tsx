import React, {Component} from 'react';
import {StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import {Colors, Spacings, View, Text, Button, Keyboard, TextField, TextFieldRef, SegmentedControl} from 'react-native-ui-lib';
import Assets from '../../assets/Assets';
const {KeyboardAwareInsetsView} = Keyboard;
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
    customPreset: 'underline',
    price: ''
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
        <Text h3 marginB-s1 marginT-s4>
          Underline Preset
        </Text>

        <TextField ref={this.input} placeholder="Enter full name"/>
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
            placeholder="Floating placeholder"
            floatingPlaceholder
            floatingPlaceholderColor={{
              focus: Colors.$textDefault,
              default: Colors.$textNeutral
            }}
            // floatingPlaceholderStyle={Typography.text60}
            // style={Typography.text60}
            containerStyle={{flex: 1}}
          />
          <TextField
            placeholder="Placeholder"
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
        />
      </>
    );
  }

  onChangeIndexValidation = (index: number) => {
    this.setState({errorPosition: index === 0 ? 
      TextField.validationMessagePositions.BOTTOM : TextField.validationMessagePositions.TOP});
  };

  renderValidationExample() {
    const {errorPosition} = this.state;
    
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
          value={this.state.value}
          onChangeText={value => this.setState({value})}
          label="Email"
          placeholder="Enter email"
          enableErrors
          validationMessage={['Email is required', 'Email is invalid']}
          // validationMessageStyle={Typography.text90R}
          validationMessagePosition={errorPosition}
          validate={['required', 'email']}
          validateOnChange
          onChangeValidity={(isValid: boolean) => console.warn('validity changed:', isValid, Date.now())}
          // validateOnStart
          // validateOnBlur
        />
        <View row spread center marginV-s3>
          <TextField
            ref={this.inputWithValidation}
            label="Name"
            placeholder="Enter full name"
            validate="required"
            validationMessage="This field is required"
            containerStyle={{flexGrow: 1}}
            validationMessagePosition={errorPosition}
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
        // this.input3.current?.clear();
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
    const {isReadonly, isDisabled} = this.state;

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
          label="Email"
          labelColor={{
            default: Colors.purple10,
            focus: Colors.green40,
            error: Colors.orange40,
            readonly: Colors.purple50,
            disabled: Colors.cyan60
          }}
          placeholder="Enter valid email"
          validationMessage="Email is invalid"
          validate={'email'}
          validateOnChange
          readonly={isReadonly}
          editable={!isDisabled}
        />
      </>
    );
  }

  onChangeIndexFieldStyle = (index: number) => {
    this.setState({customPreset: index === 0 ? 'underline' : 'outline'});
  };

  renderDynamicFieldExample() {
    const {customPreset, isDisabled, isReadonly} = this.state;

    return (
      <>
        <View>
          <Text h3 marginB-s3>
            Dynamic Field Style
          </Text>
          <View row centerV>
            <Text marginR-s4 $textPrimary>Custom style:</Text>
            <SegmentedControl segments={[{label: 'Underline'}, {label: 'Outline'}]} onChangeIndex={this.onChangeIndexFieldStyle}/>
          </View>
        </View>

        <TextField
          label="Label"
          placeholder="Enter text..."
          preset={customPreset}
          dynamicFieldStyle={(_state, {preset}) =>
            preset === 'underline' ? styles.underline : styles.outline
          }
          editable={!isDisabled}
          readonly={isReadonly}
        />
      </>
    );
  }

  renderCherCounterExample() {
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
        />
      </>
    );
  }

  renderHintExample() {
    return (
      <>
        <Text h3>
          Hint
        </Text>

        <TextField
          placeholder="Enter password"
          floatingPlaceholder
          floatOnFocus
          hint="1-6 chars including numeric chars"
        />
      </>
    );
  }

  renderFormatterExample() {
    const {price} = this.state;

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
        />
      </>
    );
  }

  renderCustomAlignmentExample() {
    return (
      <>
        <Text h3 marginB-3>
          Custom Alignments
        </Text>

        <Text marginB-s1 $textPrimary>Centered:</Text>
        <TextField label="PIN" placeholder="XXXX" centered/>
        
        <Text marginB-s1 $textPrimary>Inline:</Text>
        <View row>
          <TextField placeholder="hours"/>
          <Text marginT-s1 marginH-s1>:</Text>
          <TextField placeholder="minutes"/>
        </View>
      </>
    );
  }

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
        <View flex padding-page>
          <Text h1 marginB-s4>TextField</Text>

          {this.renderDefaultExample()}
          {this.renderPresetExample()}
          {this.renderPlaceholdersExample()}
          {this.renderValidationExample()}
          {this.renderStateColorsExample()}
          {this.renderHintExample()}
          {this.renderCherCounterExample()}
          {this.renderAccessoriesExample()}
          {this.renderDynamicFieldExample()}
          {this.renderFormatterExample()}
          {this.renderCustomAlignmentExample()}
        </View>
        <KeyboardAwareInsetsView/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  underline: {
    borderBottomWidth: 1,
    borderColor: Colors.cyan20,
    paddingBottom: 4
  },
  outline: {
    borderWidth: 1,
    borderColor: Colors.cyan20,
    padding: 4,
    borderRadius: 4
  }
});
