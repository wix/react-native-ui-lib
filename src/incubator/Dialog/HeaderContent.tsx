import {isEmpty} from 'lodash';
import React from 'react';
import View from '../../components/view';
import Text from '../../components/text';
import {DialogHeaderProps} from './types';

const HeaderContent = (props: Pick<DialogHeaderProps, 'text'>) => {
  const {text = {}} = props;
  const {title, titleStyle, titleProps, subtitle, subtitleStyle, subtitleProps} = text;

  if (title || subtitle) {
    return (
      <View marginH-s5 marginV-s1>
        {!isEmpty(title) && (
          <Text $textDefault {...titleProps} marginB-s3 style={titleStyle}>
            {title}
          </Text>
        )}
        {!isEmpty(subtitle) && (
          <Text $textDefault {...subtitleProps} marginB-s3 style={subtitleStyle}>
            {subtitle}
          </Text>
        )}
      </View>
    );
  }

  return null;
};

export default React.memo(HeaderContent);
