import React, {PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {ActivityIndicator, StyleSheet, findNodeHandle, AccessibilityInfo, ViewStyle, LayoutChangeEvent} from 'react-native';
import _ from 'lodash';
import {Constants, asBaseComponent} from '../../commons/new';
import {useDidUpdate} from '../../hooks';
import {Colors, BorderRadiuses, Spacings, Typography, Shadows} from 'style';
import View from '../../components/view';
import Text from '../../components/text';
import Icon from '../../components/icon';
import Button from '../../components/button';
import PanView from '../panView';
import {ToastProps, ToastPresets} from './types';
import useToastTimer from './helpers/useToastTimer';
import useToastPresets from './helpers/useToastPresets';
import useToastAnimation from './helpers/useToastAnimation';

const THRESHOLD = {x: Constants.screenWidth / 4, y: 10};

const Toast = (props: PropsWithChildren<ToastProps>) => {
  const {
    visible,
    position = 'bottom',
    icon,
    iconColor,
    preset,
    zIndex,
    elevation,
    style,
    containerStyle,
    message,
    messageStyle,
    renderAttachment,
    centerMessage,
    showLoader,
    loaderElement,
    action,
    swipeable,
    backgroundColor,
    onDismiss,
    onAnimationEnd,
    children,
    testID
  } = props;

  const directions = useRef([
    props.position === 'bottom' ? PanView.directions.DOWN : PanView.directions.UP,
    PanView.directions.LEFT,
    PanView.directions.RIGHT
  ]);

  const viewRef = useRef();
  const [toastHeight, setToastHeight] = useState<number | undefined>();

  const {clearTimer, setTimer} = useToastTimer(props);
  const toastPreset = useToastPresets({icon, iconColor, message, preset});

  const playAccessibilityFeatures = () => {
    if (visible) {
      if (viewRef.current && action) {
        // @ts-expect-error
        const reactTag = findNodeHandle(viewRef.current);
        AccessibilityInfo.setAccessibilityFocus(reactTag!);
      } else if (message) {
        AccessibilityInfo.announceForAccessibility?.(toastPreset.accessibilityMessage);
      }
    }
  };

  const {isAnimating, toggleToast, opacityStyle, translateStyle} = useToastAnimation({
    visible,
    position,
    onAnimationEnd,
    toastHeight,
    setTimer,
    playAccessibilityFeatures
  });

  useEffect(() => {
    if (visible) {
      toggleToast(visible, {delay: 100});
    }
    return () => clearTimer();
  }, []);

  useDidUpdate(() => {
    if (!visible) {
      clearTimer();
    }

    toggleToast(visible);
  }, [visible]);

  const handleDismiss = useCallback(() => {
    clearTimer();
    onDismiss?.();
  }, [onDismiss]);

  const positionStyle = useMemo(() => {
    return {
      position: 'absolute',
      left: 0,
      right: 0,
      [position]: 0
    } as Pick<ViewStyle, 'top' | 'left' | 'right' | 'bottom' | 'position'>;
  }, [position]);

  const toastStyle = useMemo(() => {
    return [opacityStyle, containerStyle];
  }, [opacityStyle, containerStyle]);

  const toastContainerStyle = useMemo(() => {
    return [positionStyle, translateStyle, {zIndex, elevation}];
  }, [positionStyle, translateStyle, zIndex, elevation]);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height;
    if (height !== toastHeight) {
      setToastHeight(height);
    }
  },
  [toastHeight]);

  const renderRightElement = () => {
    // NOTE: order does matter
    if (showLoader) {
      return (
        loaderElement ?? (
          <ActivityIndicator
            size={'small'}
            testID={`${testID}-loader`}
            color={Colors.rgba(Colors.$backgroundNeutralHeavy, 0.6)}
            style={styles.loader}
          />
        )
      );
    }

    if (action) {
      return (
        <Button
          link
          style={styles.action}
          color={Colors.$backgroundNeutralHeavy}
          {...action}
          labelStyle={Typography.bodySmallBold}
          accessibilityRole={'button'}
          activeBackgroundColor={Colors.$backgroundNeutral}
          testID={`${testID}-action`}
        />
      );
    }
  };

  const renderMessage = () => {
    const textAlign = centerMessage ? 'center' : 'left';
    return (
      <View accessible={Constants.isIOS} style={styles.messageContainer}>
        <Text
          testID={`${testID}-message`}
          // @ts-expect-error
          ref={viewRef}
          style={[styles.message, {textAlign}, messageStyle]}
          accessibilityLabel={toastPreset.accessibilityMessage}
        >
          {message}
        </Text>
      </View>
    );
  };

  const renderIcon = () => {
    return (
      <Icon source={toastPreset.icon} resizeMode={'contain'} style={styles.icon} tintColor={toastPreset.iconColor}/>
    );
  };

  const renderToastContent = () => {
    if (!_.isUndefined(children)) {
      return children;
    }

    return (
      <PanView
        directions={swipeable ? directions.current : []}
        dismissible
        animateToOrigin
        directionLock
        onDismiss={handleDismiss}
        threshold={THRESHOLD}
      >
        <View style={[styles.toastContent, style, backgroundColor ? {backgroundColor} : undefined]}>
          {renderIcon()}
          {renderMessage()}
          {renderRightElement()}
        </View>
      </PanView>
    );
  };

  const renderAttachmentContent = () => {
    if (renderAttachment) {
      return <View pointerEvents={'box-none'}>{renderAttachment()}</View>;
    }
  };

  const _renderAttachment = (positionStyle: object, zIndex?: number) => {
    return (
      <View style={[positionStyle, {zIndex}]} pointerEvents={'box-none'}>
        {renderAttachmentContent()}
      </View>
    );
  };

  const renderToast = () => {
    const isTop = position === 'top';

    return (
      <>
        {!isTop && !!toastHeight && renderAttachmentContent()}
        <View animated useSafeArea style={toastStyle} onLayout={onLayout} pointerEvents={visible ? 'box-none' : 'none'}>
          {renderToastContent()}
        </View>
        {isTop && !!toastHeight && renderAttachmentContent()}
      </>
    );
  };

  if (!visible && !isAnimating) {
    return renderAttachment ? _renderAttachment(positionStyle, zIndex) : null;
  }

  return (
    <View key="toast" animated testID={testID} style={toastContainerStyle} pointerEvents={'box-none'}>
      {renderToast()}
    </View>
  );
};

const styles = StyleSheet.create({
  toastContent: {
    backgroundColor: Colors.$backgroundElevated,
    minHeight: 48,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: BorderRadiuses.br40,
    ...Shadows.sh20.bottom,
    marginHorizontal: Spacings.s5,
    marginVertical: Spacings.s3,
    paddingLeft: Spacings.s3
  },
  messageContainer: {
    flex: Constants.isTablet ? undefined : 1,
    paddingVertical: Spacings.s3,
    justifyContent: 'center'
  },
  message: {
    ...Typography.bodySmall,
    color: Colors.$textDefault,
    marginLeft: Spacings.s2,
    marginRight: Spacings.s5
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: Spacings.s1
  },
  loader: {
    marginRight: Spacings.s3
  },
  action: {
    backgroundColor: Colors.$backgroundNeutralLight,
    borderTopRightRadius: BorderRadiuses.br40,
    borderBottomRightRadius: BorderRadiuses.br40,
    paddingHorizontal: Spacings.s3,
    height: '100%'
  }
});

Toast.presets = ToastPresets;
export {ToastProps, ToastPresets};
export default asBaseComponent<ToastProps, typeof Toast>(Toast);
