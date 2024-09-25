import React from 'react';
import products from '../../assets/data/products';
import {Colors} from 'react-native-ui-lib/style';
import {BorderRadiuses, Button, Image, Spacings, Text, TouchableOpacity, View} from 'react-native-ui-lib/core';
import ActionBar from 'react-native-ui-lib/actionBar';
import Assets from 'react-native-ui-lib/assets';
import Card from 'react-native-ui-lib/card';
import Carousel from 'react-native-ui-lib/carousel';
import Checkbox from 'react-native-ui-lib/checkbox';
import Chip from 'react-native-ui-lib/chip';
import Constants from 'react-native-ui-lib/constants';
import Drawer from 'react-native-ui-lib/drawer';
import Icon from 'react-native-ui-lib/icon';
import Incubator from 'react-native-ui-lib/incubator';
import MaskedInput from 'react-native-ui-lib/maskedInput';
import RadioButton from 'react-native-ui-lib/radioButton';
import RadioGroup from 'react-native-ui-lib/radioGroup';
import SegmentedControl from 'react-native-ui-lib/segmentedControl';
import SortableGridList from 'react-native-ui-lib/sortableGridList';
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

Assets.data = {products};

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  /* uilib components */
  ActionBar,
  Assets,
  BorderRadiuses,
  Button,
  Card,
  Carousel,
  Checkbox,
  Chip,
  Constants,
  Colors,
  Drawer,
  Icon,
  Image,
  Incubator,
  MaskedInput,
  RadioButton,
  RadioGroup,
  SegmentedControl,
  SortableGridList,
  SortableList,
  Spacings,
  Switch,
  Text,
  TextField,
  TouchableOpacity,
  View
};

export default ReactLiveScope;
