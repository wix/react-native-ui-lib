import Animations from './animations';
import Assets from './assets';
import Components from './components';
import Commons from './commons';
import GridList from './lists/gridList';
import ScreenComponents from './screensComponents';
import Style from './style';
import Helpers from './helpers';

module.exports = {
  ...Animations,
  ...Components,
  Assets,
  ...Commons,
  GridList,
  ...Helpers,
  ...ScreenComponents,
  ...Style,
};
