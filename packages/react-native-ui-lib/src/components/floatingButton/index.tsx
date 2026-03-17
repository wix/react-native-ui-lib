import React, {PropsWithChildren, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {asBaseComponent} from '../../commons/new';
import {Colors, Shadows} from '../../style';
import Button, {ButtonProps} from '../button';
import ScreenFooter, {
  ScreenFooterLayouts,
  ScreenFooterBackgrounds,
  KeyboardBehavior,
  ItemsFit
} from '../screenFooter';

export enum FloatingButtonLayouts {
  VERTICAL = 'Vertical',
  HORIZONTAL = 'Horizontal'
}

export interface FloatingButtonProps {
  /**
   * Whether the button is visible
   */
  visible?: boolean;
  /**
   * Button element (all Button's component's props)
   */
  button?: PropsWithChildren<ButtonProps>;
  /**
   * Secondary button element (all Button's component's props)
   */
  secondaryButton?: PropsWithChildren<ButtonProps>;
  /**
   * The bottom margin of the button, or secondary button if passed
   */
  bottomMargin?: number;
  /**
   * Whether the buttons get the container's full width (vertical layout only)
   */
  fullWidth?: boolean;
  /**
   * Button layout direction: vertical or horizontal
   */
  buttonLayout?: FloatingButtonLayouts | `${FloatingButtonLayouts}`;
  /**
   * The duration of the button's animations (show/hide)
   */
  duration?: number;
  /**
   * Whether to show/hide the button without animation
   */
  withoutAnimation?: boolean;
  /**
   * Whether to show background overlay
   */
  hideBackgroundOverlay?: boolean;
  /**
   * Whether the footer should be hoisted above the keyboard.
   * When true (default), uses KeyboardAccessoryView for keyboard-aware positioning.
   * When false, uses sticky positioning.
   */
  hoisted?: boolean;
  /**
   * Used as testing identifier
   * <TestID> - the floatingButton container
   * <TestID>.button - the floatingButton main button
   * <TestID>.secondaryButton - the floatingButton secondaryButton
   */
  testID?: string;
}

/**
 * @description: Hovering button with gradient background, backed by ScreenFooter
 * @modifiers: margin, background, color
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/FloatingButtonScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/FloatingButton/FloatingButton.gif?raw=true
 */
const FloatingButton = (props: FloatingButtonProps) => {
  const {
    visible,
    button,
    secondaryButton,
    bottomMargin,
    fullWidth,
    buttonLayout = FloatingButtonLayouts.VERTICAL,
    duration = 300,
    withoutAnimation,
    hideBackgroundOverlay,
    hoisted = true,
    testID
  } = props;

  const isSecondaryOnly = !!secondaryButton && !button;
  const isHorizontal = buttonLayout === FloatingButtonLayouts.HORIZONTAL || isSecondaryOnly;

  if (!button && !secondaryButton) {
    return null;
  }

  const renderPrimaryButton = () => {
    if (!button) {
      return null;
    }

    const shadowStyle = !button.outline && !button.link ? styles.shadow : undefined;
    const shouldFlex = (isHorizontal && !!secondaryButton) || (fullWidth && isHorizontal);

    return (
      <Button
        key="primary"
        size={Button.sizes.large}
        flex={!!shouldFlex}
        style={shadowStyle}
        testID={testID ? `${testID}.button` : undefined}
        {...button}
      />
    );
  };

  const renderSecondaryButton = () => {
    if (!secondaryButton) {
      return null;
    }

    const shouldFlex = (isHorizontal && !!button) || (fullWidth && isSecondaryOnly);
    const bgColor = secondaryButton.backgroundColor || Colors.$backgroundDefault;

    return (
      <Button
        key="secondary"
        outline={isHorizontal}
        link={!isHorizontal}
        flex={shouldFlex}
        size={Button.sizes.large}
        testID={testID ? `${testID}.secondaryButton` : undefined}
        {...secondaryButton}
        style={isHorizontal ? [styles.shadow, {backgroundColor: bgColor}] : undefined}
        enableShadow={false}
      />
    );
  };

  const children = isHorizontal
    ? [renderSecondaryButton(), renderPrimaryButton()]
    : [renderPrimaryButton(), renderSecondaryButton()];

  const footerContentContainerStyle = useMemo(() => {
    if (bottomMargin !== undefined) {
      return {paddingBottom: bottomMargin};
    }
    return undefined;
  }, [bottomMargin]);

  return (
    <ScreenFooter
      visible={visible}
      layout={isHorizontal ? ScreenFooterLayouts.HORIZONTAL : ScreenFooterLayouts.VERTICAL}
      backgroundType={hideBackgroundOverlay ? ScreenFooterBackgrounds.TRANSPARENT : ScreenFooterBackgrounds.FADING}
      keyboardBehavior={hoisted ? KeyboardBehavior.HOISTED : KeyboardBehavior.STICKY}
      animationDuration={withoutAnimation ? 0 : duration}
      itemsFit={fullWidth ? ItemsFit.STRETCH : undefined}
      contentContainerStyle={footerContentContainerStyle}
      testID={testID}
    >
      {children}
    </ScreenFooter>
  );
};

FloatingButton.displayName = 'FloatingButton';
FloatingButton.floatingButtonLayouts = FloatingButtonLayouts;

const styles = StyleSheet.create({
  shadow: {
    ...Shadows.sh20.bottom
  }
});

export default asBaseComponent<FloatingButtonProps, typeof FloatingButton>(FloatingButton);
