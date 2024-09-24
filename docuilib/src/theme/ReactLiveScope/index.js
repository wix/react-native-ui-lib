import React from 'react';
import {Colors} from 'react-native-ui-lib/style';
import {Button, Image, Text, TouchableOpacity, View} from 'react-native-ui-lib/core';
import ActionBar from 'react-native-ui-lib/actionBar';
import TextField from 'react-native-ui-lib/textField';
import SegmentedControl from 'react-native-ui-lib/segmentedControl';

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  /* uilib components */
  ActionBar,
  Button,
  Colors,
  Image,
  SegmentedControl,
  Text,
  TextField,
  TouchableOpacity,
  View
};

export default ReactLiveScope;
