import React from 'react';
import Button, {ButtonPropTypes} from '../../components/button';

const AccessoryButton = (props: ButtonPropTypes) => {
  return (
    <Button link grey10 activeOpacity={props.onPress ? 0.6 : 1} {...props} />
  );
};

AccessoryButton.displayName = 'Incubator.TextField';
export default AccessoryButton;
