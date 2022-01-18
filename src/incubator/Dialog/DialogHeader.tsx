import {isEmpty} from 'lodash';
import React, {useMemo} from 'react';
import View from '../../components/view';
import DialogText from './DialogText';
import DialogKnob from './DialogKnob';
import DialogDivider from './DialogDivider';
import {DialogHeaderProps} from './types';

const DialogHeader = (props: DialogHeaderProps = {}) => {
  const {text = {}, renderContent, showKnob = true, showDivider = true, ...others} = props;

  const _renderContent = useMemo(() => {
    if (renderContent) {
      return renderContent(props);
    }

    return <DialogText text={text}/>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderContent, text]);

  if (!isEmpty(props)) {
    return (
      <View {...others}>
        <DialogKnob showKnob={showKnob}/>
        {_renderContent}
        <DialogDivider showDivider={showDivider}/>
      </View>
    );
  }

  return null;
};

export default DialogHeader;
