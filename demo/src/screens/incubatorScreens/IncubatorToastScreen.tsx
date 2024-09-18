import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Assets, Colors, View, Button, Text, Incubator} from 'react-native-ui-lib';
import {renderMultipleSegmentOptions, renderBooleanOption, renderRadioGroup} from '../ExampleScreenPresenter';

const {Toast} = Incubator;

const TOAST_ACTIONS = {
  none: {},
  label: {label: 'Undo', onPress: () => console.warn('undo')},
  icon: {iconSource: Assets.icons.demo.plus, onPress: () => console.warn('add')}
};

const TOAST_MESSAGES = {
  general: 'La formule Pass VIP illimité 5 mois est masquée',
  success: 'The action completed successfully.',
  failure: 'The action could not be completed.',
  offline: 'Check Your Internet Connection'
};

class ToastsScreen extends Component {
  showToast = false; // keep this state in class instance for immediate response
  state = {
    visible: false,
    toastPosition: 'bottom' as Incubator.ToastProps['position'],
    isCustomContent: false,
    showLoader: false,
    selectedAction: 'none' as keyof typeof TOAST_ACTIONS,
    hasAttachment: false,
    selectedPreset: '' as Incubator.ToastProps['preset'] & '',
    isSwipeable: true
  };

  toggleVisibility = () => {
    // Im using this for storing toast visible since setState is async and takes time to response
    this.showToast = !this.showToast;
    this.setState({
      visible: this.showToast
    });
  };

  renderCustomContent = () => {
    return (
      <View bg-$backgroundNeutralLight flex padding-10>
        <Text $textDefault text60>This is a custom content</Text>
        <Text $textDefault>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book.
        </Text>
      </View>
    );
  };

  renderAboveToast = () => {
    return (
      <View flex bottom right paddingB-50 paddingR-20 pointerEvents={'box-none'}>
        <Button
          iconSource={Assets.icons.demo.dashboard}
          color={Colors.$backgroundDefault}
          style={{height: 50, width: 50}}
        />
      </View>
    );
  };

  renderBelowToast = () => {
    return <Text $textDefault>Attachment below toast</Text>;
  };

  renderAttachment = () => {
    const {toastPosition, hasAttachment} = this.state;
    if (hasAttachment) {
      if (toastPosition === 'bottom') {
        return this.renderAboveToast();
      } else {
        return this.renderBelowToast();
      }
    }
  };

  getAction = () => {
    const {selectedAction} = this.state;
    return TOAST_ACTIONS[selectedAction];
  };

  getMessage = () => {
    const {selectedPreset} = this.state;

    return TOAST_MESSAGES[selectedPreset] || TOAST_MESSAGES.general;
  };

  renderToast = () => {
    const {visible, toastPosition, showLoader, isCustomContent, hasAttachment, selectedPreset, isSwipeable} =
      this.state;
    const action = this.getAction();

    return (
      <Toast
        key={`${toastPosition}-${isCustomContent}-${hasAttachment}`}
        visible={visible}
        position={toastPosition}
        message={this.getMessage()}
        showLoader={showLoader}
        renderAttachment={this.renderAttachment}
        action={action}
        preset={selectedPreset}
        swipeable={isSwipeable}
        onDismiss={this.toggleVisibility}
        autoDismiss={3500}
        // backgroundColor={Colors.$backgroundSuccessLight}
        // icon={Assets.icons.demo.add}
        // iconColor={Colors.$backgroundSuccessHeavy}
        // style={{borderWidth: 1, borderColor: Colors.$outlineDisabled}}
        // messageStyle={Typography.text80BO}
      >
        {isCustomContent ? this.renderCustomContent() : undefined}
      </Toast>
    );
  };

  renderToggleButton = () => {
    return (
      <View centerH marginT-s5>
        <Button
          testID={`uilib.showToast`}
          marginT-10
          marginB-10
          label={'Toggle toast'}
          onPress={this.toggleVisibility}
        />
      </View>
    );
  };

  render() {
    return (
      <View flex padding-page>
        <Text $textDefault h1 marginB-s4>
          Toast
        </Text>

        <View flex>
          <ScrollView contentContainerStyle={styles.scrollView}>
            {renderMultipleSegmentOptions.call(this, 'Toast Position', 'toastPosition', [
              {label: 'Bottom', value: 'bottom'},
              {label: 'Top', value: 'top'}
            ])}

            {renderBooleanOption.call(this, 'Show Loader', 'showLoader')}
            {renderBooleanOption.call(this, 'Use custom content', 'isCustomContent')}
            {renderBooleanOption.call(this, 'With an attachment', 'hasAttachment')}
            {renderBooleanOption.call(this, 'Swipeable', 'isSwipeable')}

            {renderRadioGroup.call(this,
              'Action',
              'selectedAction',
              {None: '', Label: 'label', Icon: 'icon'},
              {isRow: true})}

            <Text $textDefault h3 marginV-s2>
              Presets
            </Text>

            {renderMultipleSegmentOptions.call(this, '', 'selectedPreset', [
              {label: 'None', value: ''},
              {label: 'General', value: 'general'},
              {label: 'Success', value: 'success'},
              {label: 'Failure', value: 'failure'},
              {label: 'Offline', value: 'offline'}
            ])}

            {this.renderToggleButton()}
          </ScrollView>
        </View>
        {this.renderToast()}
      </View>
    );
  }
}

export default ToastsScreen;

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 80
  }
});
