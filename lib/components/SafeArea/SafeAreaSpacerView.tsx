import React from 'react';
import PropTypes from 'prop-types';
import {View, requireNativeComponent} from 'react-native';

const NativeSafeAreaSpacerView = requireNativeComponent('SafeAreaSpacerView', null);

const SafeAreaSpacerView = ({style}) => {
  return (
    NativeSafeAreaSpacerView ? <NativeSafeAreaSpacerView style={style}/> : <View style={style}/>
  );
};

SafeAreaSpacerView.displayName = 'IGNORE';
SafeAreaSpacerView.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
};

export default SafeAreaSpacerView;
