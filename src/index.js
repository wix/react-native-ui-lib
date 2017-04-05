import Animations from './animations';
import * as Assets from './assets';
import Avatar from './components/avatar';
import Badge from './components/badge';
import Button from './components/button';
import Card from './components/card';
import Commons from './commons';
import ConnectionStatusBar from './components/connection-status-bar';
import ListItem from './components/listItem';
import GridList from './lists/gridList';
import ScreenComponents from './screensComponents';
import PageControl from './components/page-control';
import Picker from './components/picker';
import ScannerAnimation from './components/scanner';
import Stepper from './components/stepper';
import Style from './style';
import Text from './components/text';
import * as Inputs from './components/inputs';
import Helpers from './helpers';
import View from './components/view';

module.exports = {
  ...Animations,
  Assets,
  Avatar,
  Badge,
  Button,
  Card,
  ...Commons,
  ConnectionStatusBar,
  GridList,
  ...Inputs,
  ...Helpers,
  ListItem,
  PageControl,
  Picker,
  ScannerAnimation,
  ...ScreenComponents,
  Stepper,
  ...Style,
  Text,
  View,
};
