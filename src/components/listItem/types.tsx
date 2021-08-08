import {PureComponent} from 'react';
import {ViewStyle} from 'react-native';

export type ListItemProps = {
  /**
   * the list item height
   */
  height?: ViewStyle['height'];
  /**
   * action for when pressing the item
   */
  onPress?: () => void;
  /**
   * action for when long pressing the item
   */
  onLongPress?: () => void;
  /**
   * Additional styles for the top container
   */
  containerStyle?: ViewStyle;
  /**
   * The container element to wrap the ListItem
   */
  containerElement?: JSX.Element;
  /**
   * The inner element style
   */
  style?: ViewStyle;
  /**
   * The inner element pressed backgroundColor
   */
  underlayColor?: string;

  testID: string;
};

/**
 * @description: List item component to render inside a List component
 * @extends: TouchableOpacity
 * @gif: https://media.giphy.com/media/l1IBjHowyPcOTWAY8/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/BasicListScreen.js
 */
// @ts-ignore
class FakeListItemForDocs extends PureComponent<ListItemProps> { // eslint-disable-line
  static displayName = 'ListItem';

  render() {
    return null;
  }
}
