import _isEmpty from "lodash/isEmpty";
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { asBaseComponent } from "../../commons/new";
import { Spacings, Colors, BorderRadiuses, Dividers } from "../../style";
import View from "../../components/view";
import TouchableOpacity from "../../components/touchableOpacity";
import Text from "../../components/text";
const DialogHeader = (props = {}) => {
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
    topAccessory,
    bottomAccessory,
    contentContainerStyle,
    onPress,
    style,
    ...others
  } = props;
  const knob = useMemo(() => {
    if (showKnob) {
      return <View style={[styles.knob, {
        backgroundColor: Colors.$outlineDefault
      }]} />;
    }
  }, [showKnob]);
  const headerContent = useMemo(() => {
    const Container = onPress ? TouchableOpacity : View;
    if (!_isEmpty(title) || !_isEmpty(subtitle)) {
      return <Container onPress={onPress} center flex>
          {!_isEmpty(title) && <Text $textDefault {...titleProps} marginB-s3 style={titleStyle}>
              {title}
            </Text>}
          {!_isEmpty(subtitle) && <Text $textDefault {...subtitleProps} marginB-s3 style={subtitleStyle}>
              {subtitle}
            </Text>}
        </Container>;
    }
    return null;
  }, [title, titleStyle, titleProps, subtitle, subtitleStyle, subtitleProps, onPress]);
  const content = useMemo(() => {
    if (headerContent || leadingAccessory || trailingAccessory) {
      return <View marginH-s5 marginV-s1 style={contentContainerStyle} row spread>
          {leadingAccessory}
          {headerContent}
          {trailingAccessory}
        </View>;
    }
    return null;
  }, [headerContent, leadingAccessory, trailingAccessory, contentContainerStyle]);
  const divider = useMemo(() => {
    if (showDivider) {
      return <View style={Dividers.d10} />;
    }
  }, [showDivider]);
  if (knob || content || topAccessory || bottomAccessory || divider) {
    return <View {...others} style={style}>
        {knob}
        {topAccessory}
        {content}
        {bottomAccessory}
        {divider}
      </View>;
  }
  return null;
};
DialogHeader.displayName = 'Incubator.Dialog.Header';
export default asBaseComponent(DialogHeader);
const styles = StyleSheet.create({
  knob: {
    alignSelf: 'center',
    width: 44,
    height: Spacings.s1,
    marginTop: Spacings.s2,
    marginBottom: Spacings.s2,
    borderRadius: BorderRadiuses.br10
  }
});