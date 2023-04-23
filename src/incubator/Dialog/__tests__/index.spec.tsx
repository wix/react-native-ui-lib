import React, {useCallback, useEffect, useState} from 'react';
import Button from '../../../components/button';
import View from '../../../components/view';
import Dialog from '../index';
import {ButtonDriver, ComponentDriver} from '../../../testkit';

const onDismiss = () => {};

const defaultProps = {
  testID: 'dialog',
  useSafeArea: true,
  onDismiss,
  bottom: true,
  centerH: true
};

const TestCase = props => {
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

const _TestCase = props => <TestCase {...props}/>;

describe('Incubator.Dialog', () => {
  it('Incubator.Dialog should exist only if visible', async () => {
    const onDismiss = jest.fn();
    const component = _TestCase({onDismiss});
    const dialogDriver = new ComponentDriver({component, testID: 'dialog'});
    expect(await dialogDriver.exists()).toBeFalsy();
    const openButtonDriver = new ButtonDriver({component, testID: 'openButton'});
    await openButtonDriver.press();
    expect(await dialogDriver.exists()).toBeTruthy();
    expect(onDismiss).toHaveBeenCalledTimes(0);
    const closeButtonDriver = new ButtonDriver({component, testID: 'closeButton'});
    await closeButtonDriver.press();
    expect(await dialogDriver.exists()).toBeFalsy();
    // TODO:
    // expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
