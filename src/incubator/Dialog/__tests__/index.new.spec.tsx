import React, {useRef, useState, useEffect, useCallback} from 'react';
import {render, act} from '@testing-library/react-native';
import Dialog, {DialogProps} from '../index';
import {DialogDriver} from '../Dialog.driver.new';
import View from '../../../components/view';
import Button from '../../../components/button';
import {ButtonDriver} from '../../../components/button/Button.driver.new';

const testID = 'dialog';

const TestCase1 = (props: Omit<DialogProps, 'testID'>) => {
  return <Dialog testID={testID} {...props}/>;
};

const onDismiss = () => {};

const defaultProps = {
  testID: 'dialog',
  useSafeArea: true,
  onDismiss,
  bottom: true,
  centerH: true
};

const TestCase2 = props => {
  const [visible, setVisible] = useState(props.visible);

  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  const openDialog = useCallback(() => {
    setVisible(true);
  }, []);

  const closeDialog = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <View>
      <Dialog {...defaultProps} {...props} visible={visible}>
        <View height={300}>
          <Button testID={'closeButton'} flex onPress={closeDialog}/>
        </View>
      </Dialog>
      <Button testID={'openButton'} flex onPress={openDialog}/>
    </View>
  );
};

const getDriver = (Element: React.JSX.Element) => {
  const renderTree = render(Element);
  const dialogDriver = DialogDriver({renderTree, testID});
  return {renderTree, dialogDriver};
};

describe('Incubator.Dialog sanity checks', () => {
  it('Should show dialog', () => {
    const {dialogDriver} = getDriver(<TestCase1 visible/>);
    expect(dialogDriver.getModal().isVisible()).toBeTruthy();
  });

  it('Should dismiss dialog on background press', () => {
    const dismissFn = jest.fn();
    const {dialogDriver} = getDriver(<TestCase1 visible onDismiss={dismissFn}/>);
    expect(dismissFn).not.toHaveBeenCalled();
    expect(dialogDriver.getModal().isVisible()).toBeTruthy();
    dialogDriver.getModal().pressOnBackground();
    expect(dialogDriver.getModal().isVisible()).toBeFalsy();
    expect(dismissFn).toHaveBeenCalledTimes(1);
  });

  it('Should dismiss dialog on dismiss call', () => {
    let dialogRef: React.RefObject<{dismiss: () => void}>;
    const RefTestCase = () => {
      dialogRef = useRef<{dismiss:() => void}>(null);
      return <Dialog testID={testID} visible ref={dialogRef}/>;
    };
    const {dialogDriver} = getDriver(<RefTestCase/>);
    expect(dialogDriver.getModal().isVisible()).toBeTruthy();
    act(() => {
      dialogRef.current?.dismiss();
    });
    expect(dialogDriver.getModal().isVisible()).toBeFalsy();
  });

  it('Should exist only if visible', () => {
    const onDismiss = jest.fn();
    const component = <TestCase2 onDismiss={onDismiss}/>;
    const {dialogDriver, renderTree} = getDriver(component);
    expect(dialogDriver.getModal().isVisible()).toBeFalsy();
    const openButtonDriver = ButtonDriver({renderTree, testID: 'openButton'});
    openButtonDriver.press();
    expect(dialogDriver.getModal().isVisible()).toBeTruthy();
    expect(onDismiss).toHaveBeenCalledTimes(0);
    const closeButtonDriver = ButtonDriver({renderTree, testID: 'closeButton'});
    closeButtonDriver.press();
    expect(dialogDriver.getModal().isVisible()).toBeFalsy();
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('Modal exists even when not visible (WOAUILIB-3606)', () => {
    const onDismiss = jest.fn();
    const component = <TestCase2 onDismiss={onDismiss}/>;
    const {dialogDriver} = getDriver(component);
    expect(dialogDriver.getModal().exists()).toBeTruthy();
  });
});
