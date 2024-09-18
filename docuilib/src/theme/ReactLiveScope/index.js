import React from 'react';
import Text from 'react-native-ui-lib/text';
import View from 'react-native-ui-lib/view';
import Button from 'react-native-ui-lib/button';
import TextField from 'react-native-ui-lib/textField';
import SegmentedControl from 'react-native-ui-lib/segmentedControl';

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  /* uilib components */
  View,
  Text,
  Button, 
  TextField,
  SegmentedControl
};

export default ReactLiveScope;
