import React, {useRef, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {Spacings, Colors, BorderRadiuses} from 'style';
import {asBaseComponent, Constants} from '../../commons/new';
import {useDidUpdate} from 'hooks';
import View from '../../components/view';
import ImperativeDialog from './ImperativeDialog';
import DialogHeader from './DialogHeader';
import {DialogProps, DialogDirections, DialogDirectionsEnum, ImperativeDialogMethods, DialogHeaderProps} from './types';
export {DialogProps, DialogDirections, DialogDirectionsEnum, DialogHeaderProps};

const Dialog = (props: DialogProps) => {
  const {visible, headerProps, containerStyle, width = 250, children, ...others} = props;
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

  const widthStyle = useMemo(() => {
    return {width};
  }, [width]);

  return (
    <ImperativeDialog
      {...others}
      initialVisibility={initialVisibility.current}
      ref={dialogRef}
      containerStyle={widthStyle}
    >
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

export default asBaseComponent<DialogProps>(Dialog);

const styles = StyleSheet.create({
  defaultDialogStyle: {
    marginBottom: Spacings.s5,
    backgroundColor: Colors.$backgroundDefault,
    maxHeight: Constants.screenHeight * 0.6,
    borderRadius: BorderRadiuses.br20,
    overflow: 'hidden'
  }
});
