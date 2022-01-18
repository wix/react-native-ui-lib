import React from 'react';
import {StyleSheet} from 'react-native';
import {Spacings, Colors, BorderRadiuses} from 'style';
import View from '../../components/view';
import {DialogHeaderProps} from './types';

const DialogKnob = (props: Pick<DialogHeaderProps, 'showKnob'>) => {
  const {showKnob = true} = props;

  if (showKnob) {
    return <View style={styles.knob}/>;
  }

  return null;
};

export default React.memo(DialogKnob);

const styles = StyleSheet.create({
  knob: {
    alignSelf: 'center',
    width: 44,
    height: Spacings.s1,
    marginTop: Spacings.s2,
    marginBottom: Spacings.s2,
    backgroundColor: Colors.grey60,
    borderRadius: BorderRadiuses.br10
  }
});
