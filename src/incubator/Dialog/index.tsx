import React, {useRef, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {Spacings, Colors, BorderRadiuses} from 'style';
import {Constants} from '../../commons/new';
import {useDidUpdate} from 'hooks';
import View from '../../components/view';
import FadedScrollView from '../../components/fadedScrollView';
import ImperativeDialog from './ImperativeDialog';
import DialogHeader from './DialogHeader';
import {DialogProps, DialogDirections, DialogDirectionsEnum, ImperativeDialogMethods, DialogHeaderProps} from './types';
export {DialogDirections, DialogDirectionsEnum, DialogProps, DialogHeaderProps};

const FADER_PROPS = {size: 100};

const Dialog = (props: DialogProps) => {
  const {visible, headerProps, scrollableProps = {}, containerStyle, children, ...others} = props;
  const {enable, ...otherScrollableProps} = scrollableProps;
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

  const renderContent = () => {
    if (enable) {
      return (
        <FadedScrollView {...otherScrollableProps} useGesture showEndFader endFaderProps={FADER_PROPS}>
          {children}
        </FadedScrollView>
      );
    } else {
      return children;
    }
  };

  return (
    <ImperativeDialog {...others} initialVisibility={initialVisibility.current} ref={dialogRef}>
      <View style={style}>
        <DialogHeader {...headerProps}/>
        {renderContent()}
      </View>
    </ImperativeDialog>
  );
};

Dialog.displayName = 'Incubator.Dialog';
Dialog.directions = DialogDirectionsEnum;
Dialog.Header = DialogHeader;

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
