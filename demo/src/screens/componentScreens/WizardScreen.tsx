import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {View, Button, Wizard, Text, RadioGroup, RadioButton, TextField, Toast} from 'react-native-ui-lib';

const flavors = ['Chocolate', 'Vanilla'];
const initialFlavor = flavors[0];
const stepTypes = _.map(Wizard.States, state => {
  return <Text key={state}>{state}</Text>;
});

export default class WizardScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      completedStepIndex: undefined,
      allTypesIndex: 0,
      selectedFlavor: initialFlavor,
      customerName: undefined,
      toastMessage: undefined
    };
  }

  onActiveIndexChanged = activeIndex => {
    this.setState({activeIndex});
  };

  onAllTypesIndexChanged = allTypesIndex => {
    this.setState({allTypesIndex});
  };

  closeToast = () => {
    setTimeout(() => {
      this.setState({toastMessage: undefined});
    }, 2000);
  };

  reset = () => {
    const {customerName, selectedFlavor} = this.state;

    this.setState({
      activeIndex: 0,
      completedStepIndex: undefined,
      selectedFlavor: initialFlavor,
      customerName: undefined,
      toastMessage: `${customerName}, you bought some ${selectedFlavor.toLowerCase()}`
    },
    this.closeToast);
  };

  goToPrevStep = () => {
    const {activeIndex: prevActiveIndex} = this.state;
    const activeIndex = prevActiveIndex === 0 ? 0 : prevActiveIndex - 1;

    this.setState({activeIndex});
  };

  renderPrevButton = () => {
    return (
      <Button
        testID={'uilib.prevButton'}
        size={Button.sizes.large}
        label={'Back'}
        marginT-10
        onPress={this.goToPrevStep}
      />
    );
  };

  goToNextStep = () => {
    const {activeIndex: prevActiveIndex, completedStepIndex: prevCompletedStepIndex} = this.state;
    const reset = prevActiveIndex === 2;
    if (reset) {
      this.reset();
      return;
    }

    const activeIndex = prevActiveIndex + 1;
    let completedStepIndex = prevCompletedStepIndex;
    if (!prevCompletedStepIndex || prevCompletedStepIndex < prevActiveIndex) {
      completedStepIndex = prevActiveIndex;
    }

    if (activeIndex !== prevActiveIndex || completedStepIndex !== prevCompletedStepIndex) {
      this.setState({activeIndex, completedStepIndex});
    }
  };

  renderNextButton = disabled => {
    const {activeIndex} = this.state;
    const label = activeIndex === 2 ? 'done & reset' : 'next';

    return (
      <Button
        testID={'uilib.nextAndResetButton'}
        size={Button.sizes.large}
        label={label}
        marginT-10
        onPress={this.goToNextStep}
        disabled={disabled}
      />
    );
  };

  renderFlavorRadioButton = index => {
    const value = flavors[index];
    return <RadioButton testID={value} marginL-10={index > 0} value={value} label={value}/>;
  };

  setSelectedFlavor = selectedFlavor => {
    this.setState({selectedFlavor});
  };

  renderSelectItems = () => {
    const {selectedFlavor} = this.state;

    return (
      <View style={styles.stepContainer}>
        <Text>Please select your purchase</Text>
        <RadioGroup initialValue={selectedFlavor} onValueChange={this.setSelectedFlavor}>
          <View row marginT-10>
            {this.renderFlavorRadioButton(0)}
            {this.renderFlavorRadioButton(1)}
          </View>
        </RadioGroup>
        {this.renderNextButton()}
      </View>
    );
  };

  onNameEntered = customerName => {
    this.setState({customerName});
  };

  renderCustomerDetails = () => {
    const {customerName} = this.state;

    return (
      <View style={styles.stepContainer}>
        <TextField
          testID={'uilib.nameInput'}
          placeholder="Please enter your name"
          value={customerName}
          validate={'required'}
          validateOnChange
          errorMessage="This is required"
          onChangeText={this.onNameEntered}
        />
        {this.renderPrevButton()}
        {this.renderNextButton(_.isNil(customerName) || customerName.trim().length === 0)}
      </View>
    );
  };

  renderCheckout = () => {
    return (
      <View style={styles.stepContainer}>
        <Text>Complete the purchase</Text>
        {this.renderPrevButton()}
        {this.renderNextButton()}
      </View>
    );
  };

  renderCurrentStep = () => {
    const {activeIndex} = this.state;

    switch (activeIndex) {
      case 0:
      default:
        return this.renderSelectItems();
      case 1:
        return this.renderCustomerDetails();
      case 2:
        return this.renderCheckout();
    }
  };

  getStepState(index) {
    const {activeIndex, completedStepIndex} = this.state;
    let state = Wizard.States.DISABLED;
    if (completedStepIndex > index - 1) {
      state = Wizard.States.COMPLETED;
    } else if (activeIndex === index || completedStepIndex === index - 1) {
      state = Wizard.States.ENABLED;
    }

    return state;
  }

  render() {
    const {activeIndex, allTypesIndex, toastMessage} = this.state;

    return (
      <View useSafeArea flex>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.container}>
            <Wizard testID={'uilib.wizard'} activeIndex={activeIndex} onActiveIndexChanged={this.onActiveIndexChanged}>
              <Wizard.Step state={this.getStepState(0)} label={'Select items'}/>
              <Wizard.Step state={this.getStepState(1)} label={'Customer details'}/>
              <Wizard.Step state={this.getStepState(2)} label={'Checkout'}/>
            </Wizard>
            {this.renderCurrentStep()}

            <View flex/>
            <Text margin-10>All step types: (Wizard.States.X)</Text>
            <View row margin-10 style={styles.allTypes}>
              {stepTypes}
            </View>
            <Wizard
              testID={'uilib.wizardAllTypes'}
              activeIndex={allTypesIndex}
              onActiveIndexChanged={this.onAllTypesIndexChanged}
            >
              {_.map(Wizard.States, state => {
                return <Wizard.Step key={state} state={state} label={state}/>;
              })}
            </Wizard>
            <Text text50 margin-10 center>
              Wizard
            </Text>
          </View>
        </ScrollView>
        {!_.isNil(toastMessage) && <Toast testID={'uilib.toast'} visible position="bottom" message={toastMessage}/>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1
  },
  container: {
    flex: 1
  },
  allTypes: {
    justifyContent: 'space-between'
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'space-between',
    margin: 20
  }
});
