import React from 'react';
import {Dividers} from 'style';
import View from '../../components/view';
import {DialogHeaderProps} from './types';

const DialogDivider = (props: Pick<DialogHeaderProps, 'showDivider'>) => {
  const {showDivider = true} = props;

  if (showDivider) {
    return <View style={Dividers.d10}/>;
  }

  return null;
};

export default React.memo(DialogDivider);
