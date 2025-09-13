import React, { useMemo } from 'react';
import { BorderRadiuses, Colors } from "../../style";
import { StyleSheet } from 'react-native';
import Assets from "../../assets";
import DialogHeader from "./DialogHeader";
import Icon from "../../components/icon";
import Text from "../../components/text";
import TouchableOpacity from "../../components/touchableOpacity";
import View from "../../components/view";
const useDialogContent = props => {
  const {
    showCloseButton,
    close,
    closeButtonProps,
    containerStyle: propsContainerStyle,
    containerProps: propsContainerProps,
    headerProps,
    children
  } = props;
  const DialogCloseButton = useMemo(() => {
    if (!showCloseButton) {
      return null;
    }
    return <View left centerV pointerEvents={'box-none'}>
        <TouchableOpacity paddingB-s2 row onPress={close}>
          <Icon source={Assets.internal.icons.xMedium} tintColor={Colors.white} {...closeButtonProps?.iconProps} />
          <Text recorderTag={'unmask'} text70BO white {...closeButtonProps?.labelProps}>
            {closeButtonProps?.label || 'Close'}
          </Text>
        </TouchableOpacity>
      </View>;
  }, [showCloseButton, close, closeButtonProps]);
  const containerProps = useMemo(() => {
    return showCloseButton ? {
      ...propsContainerProps,
      pointerEvents: 'box-none'
    } : propsContainerProps;
  }, [showCloseButton, propsContainerProps]);
  const containerStyle = useMemo(() => {
    return showCloseButton ? [propsContainerStyle, styles.transparent] : propsContainerStyle;
  }, [showCloseButton, propsContainerStyle]);
  const renderDialogContent = () => {
    const DialogContent = <>
        {headerProps && <DialogHeader {...headerProps} />}
        {children}
      </>;
    if (DialogCloseButton) {
      return <>
          {DialogCloseButton}
          <View style={styles.dialogContentContainer}>{DialogContent}</View>
        </>;
    } else {
      return DialogContent;
    }
  };
  return {
    renderDialogContent,
    containerStyle,
    containerProps
  };
};
export default useDialogContent;
const styles = StyleSheet.create({
  transparent: {
    backgroundColor: Colors.transparent
  },
  dialogContentContainer: {
    flexShrink: 1,
    backgroundColor: Colors.$backgroundDefault,
    overflow: 'hidden',
    borderRadius: BorderRadiuses.br60
  }
});