import React, {useRef, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {Spacings, Colors, BorderRadiuses} from 'style';
import {useDidUpdate} from 'hooks';
import {asBaseComponent, Constants} from '../../commons/new';
import View from '../../components/view';
import FadedScrollView from '../../components/fadedScrollView';
import ImperativeDialog from './ImperativeDialog';
import DialogHeader from './DialogHeader';
import useSizeStyle from './helpers/useSizeStyle';
import {DialogProps, DialogDirections, DialogDirectionsEnum, ImperativeDialogMethods, DialogHeaderProps} from './types';
export {DialogDirections, DialogDirectionsEnum, DialogProps, DialogHeaderProps};

const FADER_PROPS = {size: 100};

const Dialog = (props: DialogProps) => {
  const {
    visible,
    headerProps,
    scrollableProps = {},
    width: propWidth,
    height: propsHeight,
    containerStyle,
    customHeader,
    children,
    ...others
  } = props;
  const {enable, ...otherScrollableProps} = scrollableProps;
  const initialVisibility = useRef(visible);
  const dialogRef = React.createRef<ImperativeDialogMethods>();
  const {width, height} = useSizeStyle({width: propWidth, height: propsHeight, containerStyle});

  useDidUpdate(() => {
    if (visible) {
      dialogRef.current?.open();
    } else {
      dialogRef.current?.close();
    }
  }, [visible]);

  const style = useMemo(() => {
    return [styles.defaultDialogStyle, containerStyle, {width, height}];
  }, [containerStyle, width, height]);

  const header = useMemo(() => {
    if (customHeader) {
      return customHeader;
    } else {
      return <DialogHeader {...headerProps}/>;
    }
  }, [headerProps, customHeader]);

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
        {header}
        {renderContent()}
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
    backgroundColor: Colors.white,
    maxHeight: Constants.screenHeight * 0.6,
    borderRadius: BorderRadiuses.br20,
    overflow: 'hidden'
  }
});
