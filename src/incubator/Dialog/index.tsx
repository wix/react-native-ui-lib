import React, {useRef, useMemo} from 'react';
import {StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {Spacings, Colors, BorderRadiuses} from 'style';
import {Constants} from '../../commons/new';
import {useDidUpdate} from 'hooks';
import View from '../../components/view';
import ImperativeDialog from './ImperativeDialog';
import DialogHeader from './DialogHeader';
import DialogText from './DialogText';
import DialogKnob from './DialogKnob';
import DialogDivider from './DialogDivider';
import {
  ImperativeDialogProps,
  DialogDirections,
  DialogDirectionsEnum,
  ImperativeDialogMethods,
  DialogHeaderProps,
  DialogTextProps
} from './types';
export {DialogDirections, DialogDirectionsEnum, DialogHeaderProps, DialogTextProps};

export interface DialogProps extends Omit<ImperativeDialogProps, 'initialVisibility'> {
  /**
   * The visibility of the dialog.
   */
  visible?: boolean;
  /**
   * The Dialog's header
   */
  headerProps?: DialogHeaderProps;
  /**
   * The Dialog`s container style (it is set to {position: 'absolute'})
   */
  containerStyle?: StyleProp<ViewStyle>;
}

const Dialog = (props: DialogProps) => {
  const {visible, headerProps, containerStyle, children, ...others} = props;
  const initialVisibility = useRef(visible);
  const dialogRef = React.createRef<ImperativeDialogMethods>();

  useDidUpdate(() => {
    if (visible) {
      dialogRef.current?.open();
    } else {
      dialogRef.current?.close();
    }
  }, [visible]);

  const style = useMemo(() => {
    return [styles.defaultDialogStyle, containerStyle];
  }, [containerStyle]);

  return (
    <ImperativeDialog {...others} initialVisibility={initialVisibility.current} ref={dialogRef}>
      <View style={style}>
        <DialogHeader {...headerProps}/>
        {children}
      </View>
    </ImperativeDialog>
  );
};

Dialog.displayName = 'Incubator.Dialog';
Dialog.directions = DialogDirectionsEnum;
Dialog.Header = DialogHeader;
Dialog.Text = DialogText;
Dialog.Knob = DialogKnob;
Dialog.Divider = DialogDivider;

export default Dialog;

const styles = StyleSheet.create({
  defaultDialogStyle: {
    marginBottom: Spacings.s5,
    backgroundColor: Colors.white,
    maxHeight: Constants.screenHeight * 0.6,
    width: 250,
    borderRadius: BorderRadiuses.br20,
    overflow: 'hidden'
  }
});
