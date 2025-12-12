import React from 'react';
import products from '../../assets/data/products';
import {
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
  ChipsInput,
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
  Picker,
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
  ThemeManager,
  Timeline,
  TouchableOpacity,
  View
} from 'react-native-ui-lib';
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
  ChipsInput,
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
  ThemeManager,
  Timeline,
  TouchableOpacity,
  View,
  Picker
};

export default ReactLiveScope;
