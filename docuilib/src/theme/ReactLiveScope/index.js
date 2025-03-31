import React from 'react';
import products from '../../assets/data/products';
import {Colors} from 'react-native-ui-lib/style';
import {BorderRadiuses, Button, Image, Spacings, Text, TouchableOpacity, View} from 'react-native-ui-lib/core';
import ActionBar from 'react-native-ui-lib/actionBar';
import Assets from 'react-native-ui-lib/assets';
import Avatar from 'react-native-ui-lib/avatar';
import Badge from 'react-native-ui-lib/badge';
import Card from 'react-native-ui-lib/card';
import Carousel from 'react-native-ui-lib/carousel';
import Checkbox from 'react-native-ui-lib/checkbox';
import Chip from 'react-native-ui-lib/chip';
import ColorPalette from 'react-native-ui-lib/colorPalette';
import ColorPicker from 'react-native-ui-lib/colorPicker';
import ColorSwatch from 'react-native-ui-lib/colorSwatch';
import Constants from 'react-native-ui-lib/constants';
import Drawer from 'react-native-ui-lib/drawer';
import Hint from 'react-native-ui-lib/hint';
import Icon from 'react-native-ui-lib/icon';
import * as Incubator from 'react-native-ui-lib/incubator';
import MaskedInput from 'react-native-ui-lib/maskedInput';
import RadioButton from 'react-native-ui-lib/radioButton';
import RadioGroup from 'react-native-ui-lib/radioGroup';
import SegmentedControl from 'react-native-ui-lib/segmentedControl';
import SortableGridList from 'react-native-ui-lib/sortableGridList';
import SortableList from 'react-native-ui-lib/sortableList';
import Stepper from 'react-native-ui-lib/stepper';
import Switch from 'react-native-ui-lib/switch';
import TextField from 'react-native-ui-lib/textField';
import Timeline from 'react-native-ui-lib/timeline';
import Picker from 'react-native-ui-lib/picker';
import * as Playground from './Playground';

Assets.loadAssetsGroup('icons.demo', {
  // chevronDown: require('../../assets/icons/chevronDown.png').default,
  chevronRight: {
    uri: require('../../assets/icons/chevronRight.png'),
    width: 24,
    height: 24
  },
  chevronDown: {
    uri: require('../../assets/icons/chevronDown.png'),
    width: 14,
    height: 8
  },
  star: {
    uri: require('../../assets/icons/star.png'),
    width: 24,
    height: 24
  },
  // add: require('../../assets/icons/add.png').default,
  // camera: require('../../assets/icons/cameraSelected.png').default,
  // close: require('../../assets/icons/close.png').default,
  // dashboard: require('../../assets/icons/dashboard.png').default,
  drag: {
    uri: require('../../assets/icons/drag.png'),
    width: 10,
    height: 16
  }
  // image: require('../../assets/icons/image.png').default,
  // plus: require('../../assets/icons/plus.png').default,
  // refresh: require('../../assets/icons/refresh.png').default,
  // search: require('../../assets/icons/search.png').default,
  // settings: require('../../assets/icons/settings.png').default,
  // share: require('../../assets/icons/share.png').default,
  // info: require('../../assets/icons/info.png').default,
  // exclamation: require('../../assets/icons/exclamationFillSmall.png').default
});

const Data = {products};

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  /* Docs' utils and components */
  Data,
  Playground,
  /* UI Lib's components */
  ActionBar,
  Assets,
  Avatar,
  Badge,
  BorderRadiuses,
  Button,
  Card,
  Carousel,
  Checkbox,
  Chip,
  ColorPalette,
  ColorPicker,
  Colors,
  ColorSwatch,
  Constants,
  Drawer,
  Hint,
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
  Stepper,
  Switch,
  Text,
  TextField,
  Timeline,
  TouchableOpacity,
  View,
  Picker
};

export default ReactLiveScope;
