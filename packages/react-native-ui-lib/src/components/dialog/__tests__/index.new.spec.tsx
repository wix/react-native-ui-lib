import React, {useRef, useState, useEffect, useCallback} from 'react';
import {render, act} from '@testing-library/react-native';
import * as Reanimated from 'react-native-reanimated';
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

describe('Dialog sanity checks', () => {
  it('Should show dialog', () => {
    const {dialogDriver} = getDriver(<TestCase1 visible/>);
    expect(dialogDriver.isVisible()).toBeTruthy();
  });

  it('Should dismiss dialog on background press', () => {
    const dismissFn = jest.fn();
    const {dialogDriver} = getDriver(<TestCase1 visible onDismiss={dismissFn}/>);
    expect(dismissFn).not.toHaveBeenCalled();
    expect(dialogDriver.isVisible()).toBeTruthy();
    dialogDriver.pressOnBackground();
    expect(dialogDriver.isVisible()).toBeFalsy();
    expect(dismissFn).toHaveBeenCalledTimes(1);
  });

  it('Should dismiss dialog on dismiss call', () => {
    let dialogRef: React.RefObject<{dismiss: () => void} | null>;
    const RefTestCase = () => {
      dialogRef = useRef<{dismiss:() => void}>(null);
      return <Dialog testID={testID} visible ref={dialogRef}/>;
    };
    const {dialogDriver} = getDriver(<RefTestCase/>);
    expect(dialogDriver.isVisible()).toBeTruthy();
    act(() => {
      dialogRef.current?.dismiss();
    });
    expect(dialogDriver.isVisible()).toBeFalsy();
  });

  it('Should exist only if visible', () => {
    const onDismiss = jest.fn();
    const component = <TestCase2 onDismiss={onDismiss}/>;
    const {dialogDriver, renderTree} = getDriver(component);
    expect(dialogDriver.isVisible()).toBeFalsy();
    const openButtonDriver = ButtonDriver({renderTree, testID: 'openButton'});
    openButtonDriver.press();
    expect(dialogDriver.isVisible()).toBeTruthy();
    expect(onDismiss).toHaveBeenCalledTimes(0);
    const closeButtonDriver = ButtonDriver({renderTree, testID: 'closeButton'});
    closeButtonDriver.press();
    expect(dialogDriver.isVisible()).toBeFalsy();
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  // Note: since RN73 modals do not render when not visible
  it('Modal should not exists even when not visible (WOAUILIB-3606)', () => {
    const onDismiss = jest.fn();
    const component = <TestCase2 onDismiss={onDismiss}/>;
    const {dialogDriver} = getDriver(component);
    expect(dialogDriver.exists()).toBeFalsy();
    expect(dialogDriver.isVisible()).toBeFalsy();
  });
});

// Mirrors the non-exported constants in index.tsx.
const WATCHDOG_INTERVAL_MS = 400;
const WATCHDOG_MAX_ATTEMPTS = 8;

// Mounted already `visible` so open/close and the watchdog share one render. Reanimated's mock
// useSharedValue returns a new value per call (the real one is ref-backed for the component's
// lifetime), so a post-mount `visible` flip would have them reading different values.
describe('Dialog open animation watchdog', () => {
  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('recovers a dialog that never opens, then stops once it reaches full visibility', () => {
    jest.useFakeTimers();
    const withSpringSpy = jest.spyOn(Reanimated, 'withSpring');
    const {dialogDriver} = getDriver(<TestCase1 visible/>);
    expect(dialogDriver.isVisible()).toBeTruthy();
    expect(withSpringSpy).not.toHaveBeenCalled();

    // Stuck at 0 since mount - the watchdog opens it.
    act(() => {
      jest.advanceTimersByTime(WATCHDOG_INTERVAL_MS);
    });
    expect(withSpringSpy).toHaveBeenCalledTimes(1);

    // Reached 1, so the watchdog clears itself for good.
    act(() => {
      jest.advanceTimersByTime(WATCHDOG_INTERVAL_MS * (WATCHDOG_MAX_ATTEMPTS + 3));
    });
    expect(withSpringSpy).toHaveBeenCalledTimes(1);
  });

  it('keeps retrying while the open animation stays frozen, then permanently gives up at the attempt cap', () => {
    jest.useFakeTimers();
    // open() always lands on the same value, so visibility never advances: the frozen-open failure.
    const withSpringSpy = jest.spyOn(Reanimated, 'withSpring').mockReturnValue(0.5);
    getDriver(<TestCase1 visible/>);

    act(() => {
      jest.advanceTimersByTime(WATCHDOG_INTERVAL_MS * (WATCHDOG_MAX_ATTEMPTS + 3));
    });
    const attemptsMade = withSpringSpy.mock.calls.length;
    expect(attemptsMade).toBeGreaterThan(1);
    expect(attemptsMade).toBeLessThanOrEqual(WATCHDOG_MAX_ATTEMPTS + 1);

    act(() => {
      jest.advanceTimersByTime(WATCHDOG_INTERVAL_MS * 5);
    });
    // No growth long after the cap: permanently given up, not paused.
    expect(withSpringSpy).toHaveBeenCalledTimes(attemptsMade);
  });

  it('does not re-open while the dialog is closing (visibility decreasing)', () => {
    jest.useFakeTimers();
    const withSpringSpy = jest.spyOn(Reanimated, 'withSpring');
    // Drive visibility down as an in-progress close() would, without the completion callback -
    // so modalVisibility stays true, matching a close that is still animating.
    const withTimingSpy = jest.spyOn(Reanimated, 'withTiming').mockReturnValue(-0.1);
    const {dialogDriver} = getDriver(<TestCase1 visible/>);

    act(() => {
      dialogDriver.pressOnBackground();
    });
    expect(withTimingSpy).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(WATCHDOG_INTERVAL_MS * 3);
    });
    expect(withSpringSpy).not.toHaveBeenCalled();
  });
});
