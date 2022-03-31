import {RenderAPI, fireEvent} from '@testing-library/react-native';


export const SwitchDriverFactory = ({wrappedComponent, testID}: {wrappedComponent: RenderAPI, testID: string}) => {

  const switchComp = wrappedComponent.getByTestId(testID);

  return {
    exists: () => !!switchComp,
    getRootElement: () => switchComp,
    press: () => fireEvent(switchComp, 'press'),
    getAccessibilityValue: () => switchComp.props.accessibilityValue.text === '1',
    isDisabled: () => switchComp.props.accessibilityState.disabled === true,
    isChecked: () => switchComp.props.accessibilityState['0'] === 'checked',
    getColor: () => switchComp.props.style.backgroundColor
  };

};
