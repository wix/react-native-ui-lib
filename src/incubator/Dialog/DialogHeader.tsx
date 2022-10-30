import {isEmpty} from 'lodash';
import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {asBaseComponent} from '../../commons/new';
import {Spacings, Colors, BorderRadiuses, Dividers} from 'style';
import View from '../../components/view';
import TouchableOpacity from '../../components/touchableOpacity';
import Text from '../../components/text';
import {DialogHeaderProps} from './types';

const DialogHeader = (props: DialogHeaderProps = {}) => {
  const {
    title,
    titleStyle,
    titleProps,
    subtitle,
    subtitleStyle,
    subtitleProps,
    showKnob = true,
    showDivider = true,
    leadingAccessory,
    trailingAccessory,
    contentContainerStyle,
    onPress,
    bottomAccessory,
    style,
    ...others
  } = props;

  const knob = useMemo(() => {
    if (showKnob) {
      return <View style={styles.knob}/>;
    }
  }, [showKnob]);

  const headerContent = useMemo(() => {
    const Container = onPress ? TouchableOpacity : View;
    if (!isEmpty(title) || !isEmpty(subtitle)) {
      return (
        <Container onPress={onPress} center flex>
          {title && (
            <Text $textDefault {...titleProps} marginB-s3 style={titleStyle}>
              {title}
            </Text>
          )}
          {subtitle && (
            <Text $textDefault {...subtitleProps} marginB-s3 style={subtitleStyle}>
              {subtitle}
            </Text>
          )}
        </Container>
      );
    }

    return null;
  }, [title, titleStyle, titleProps, subtitle, subtitleStyle, subtitleProps, onPress]);

  const content = useMemo(() => {
    if (headerContent || leadingAccessory || trailingAccessory) {
      return (
        <View marginH-s5 marginV-s1 style={contentContainerStyle} row spread>
          {leadingAccessory}
          {headerContent}
          {trailingAccessory}
        </View>
      );
    }

    return null;
  }, [headerContent, leadingAccessory, trailingAccessory, contentContainerStyle]);

  const divider = useMemo(() => {
    if (showDivider) {
      return <View style={Dividers.d10}/>;
    }
  }, [showDivider]);

  if (knob || content || bottomAccessory || divider) {
    return (
      <View {...others} style={style}>
        {knob}
        {content}
        {bottomAccessory}
        {divider}
      </View>
    );
  }

  return null;
};

DialogHeader.displayName = 'Incubator.Dialog.Header';

export default asBaseComponent<DialogHeaderProps>(DialogHeader);

const styles = StyleSheet.create({
  knob: {
    alignSelf: 'center',
    width: 44,
    height: Spacings.s1,
    marginTop: Spacings.s2,
    marginBottom: Spacings.s2,
    backgroundColor: Colors.$outlineDefault,
    borderRadius: BorderRadiuses.br10
  }
});
