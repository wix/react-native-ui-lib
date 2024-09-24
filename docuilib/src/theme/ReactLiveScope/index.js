import React from 'react';
import {Colors} from 'react-native-ui-lib/style';
import {Button, Image, Text, TouchableOpacity, View} from 'react-native-ui-lib/core';
import ActionBar from 'react-native-ui-lib/actionBar';
import Checkbox from 'react-native-ui-lib/checkbox';
import Chip from 'react-native-ui-lib/chip';
import RadioButton from 'react-native-ui-lib/radioButton';
import SegmentedControl from 'react-native-ui-lib/segmentedControl';
import TextField from 'react-native-ui-lib/textField';
// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  /* uilib components */
  ActionBar,
  Button,
  Checkbox,
  Chip,
  Colors,
  Image,
  RadioButton,
  SegmentedControl,
  Text,
  TextField,
  TouchableOpacity,
  View
};

export default ReactLiveScope;
