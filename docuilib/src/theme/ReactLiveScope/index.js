import React from 'react';
import {Colors} from 'react-native-ui-lib/style';
import {Button, Image, Text, TouchableOpacity, View} from 'react-native-ui-lib/core';
import ActionBar from 'react-native-ui-lib/actionBar';
import Assets from 'react-native-ui-lib/assets';
import Checkbox from 'react-native-ui-lib/checkbox';
import Chip from 'react-native-ui-lib/chip';
import Icon from 'react-native-ui-lib/icon';
import Incubator from 'react-native-ui-lib/incubator';
import RadioButton from 'react-native-ui-lib/radioButton';
import RadioGroup from 'react-native-ui-lib/radioGroup';
import SegmentedControl from 'react-native-ui-lib/segmentedControl';
import SortableList from 'react-native-ui-lib/sortableList';
import Switch from 'react-native-ui-lib/switch';
import TextField from 'react-native-ui-lib/textField';

Assets.loadAssetsGroup('icons.demo', {
  // chevronDown: require('../../assets/icons/chevronDown.png'),
  chevronRight: require('../../assets/icons/chevronRight.png'),
  // add: require('../../assets/icons/add.png'),
  // camera: require('../../assets/icons/cameraSelected.png'),
  // close: require('../../assets/icons/close.png'),
  // dashboard: require('../../assets/icons/dashboard.png'),
  drag: require('../../assets/icons/drag.png')
  // image: require('../../assets/icons/image.png'),
  // plus: require('../../assets/icons/plus.png'),
  // refresh: require('../../assets/icons/refresh.png'),
  // search: require('../../assets/icons/search.png'),
  // settings: require('../../assets/icons/settings.png'),
  // share: require('../../assets/icons/share.png'),
  // info: require('../../assets/icons/info.png'),
  // exclamation: require('../../assets/icons/exclamationFillSmall.png')
});

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  /* uilib components */
  ActionBar,
  Assets,
  Button,
  Checkbox,
  Chip,
  Colors,
  Icon,
  Image,
  Incubator,
  RadioButton,
  RadioGroup,
  SegmentedControl,
  SortableList,
  Switch,
  Text,
  TextField,
  TouchableOpacity,
  View
};

export default ReactLiveScope;
