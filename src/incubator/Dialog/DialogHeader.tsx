import {isEmpty} from 'lodash';
import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {asBaseComponent} from '../../commons/new';
import {Spacings, Colors, BorderRadiuses, Dividers} from 'style';
import View from '../../components/view';
import HeaderContent from './HeaderContent';
import {DialogHeaderProps} from './types';

const DialogHeader = (props: DialogHeaderProps = {}) => {
  const {text = {}, renderContent, showKnob = true, showDivider = true, ...others} = props;

  const knob = useMemo(() => {
    if (showKnob) {
      return <View style={styles.knob}/>;
    }
  }, [showKnob]);

  const headerContent = useMemo(() => {
    if (renderContent) {
      return renderContent(props);
    }

    return <HeaderContent text={text}/>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderContent, text]);

  const divider = useMemo(() => {
    if (showDivider) {
      return <View style={Dividers.d10}/>;
    }
  }, [showDivider]);

  if (!isEmpty(props)) {
    return (
      <View {...others}>
        {knob}
        {headerContent}
        {divider}
      </View>
    );
  }

  return null;
};

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
