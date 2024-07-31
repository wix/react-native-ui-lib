import React, {PropsWithChildren, useMemo} from 'react';
import {BorderRadiuses, Colors} from '../../style';
import {DialogCloseButtonProps, DialogContentProps} from './types';
import {StyleSheet} from 'react-native';
import Assets from '../../assets';
import DialogHeader from './DialogHeader';
import Icon from '../../components/icon';
import Text from '../../components/text';
import TouchableOpacity from '../../components/touchableOpacity';
import View from '../../components/view';

interface InternalDialogCloseButtonProps extends DialogCloseButtonProps {
  close: () => void;
}

const useDialogCloseButton = (props: InternalDialogCloseButtonProps) => {
  const {
    showClose,
    close,
    closeProps,
    containerStyle: propsContainerStyle,
    containerProps: propsContainerProps
  } = props;

  const DialogCloseButton = useMemo(() => {
    if (!showClose) {
      return null;
    }

    return (
      <View left centerV pointerEvents={'box-none'}>
        <TouchableOpacity paddingB-s2 row onPress={close}>
          <Icon source={Assets.icons.xMedium} tintColor={Colors.white} {...closeProps?.iconProps}/>
          <Text recorderTag={'unmask'} text70BO white {...closeProps?.textProps}>
            {closeProps?.closeText || 'Close'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }, [showClose, close, closeProps]);

  const containerProps = useMemo((): DialogCloseButtonProps['containerProps'] => {
    return showClose ? {...propsContainerProps, pointerEvents: 'box-none'} : propsContainerProps;
  }, [showClose, propsContainerProps]);

  const containerStyle = useMemo(() => {
    return showClose ? [propsContainerStyle, styles.transparent] : propsContainerStyle;
  }, [showClose, propsContainerStyle]);

  const DialogContent = (props: PropsWithChildren<DialogContentProps>) => {
    const {headerProps, children} = props;
    if (DialogCloseButton) {
      return (
        <>
          {DialogCloseButton}
          <View style={styles.dialogContentContainer}>
            {headerProps && <DialogHeader {...headerProps}/>}
            {children}
          </View>
        </>
      );
    } else {
      return (
        <>
          {headerProps && <DialogHeader {...headerProps}/>}
          {children}
        </>
      );
    }
  };

  return {DialogContent, containerStyle, containerProps};
};

export default useDialogCloseButton;

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
