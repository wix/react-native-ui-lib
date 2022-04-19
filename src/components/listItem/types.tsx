import {PureComponent} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {TouchableOpacityProps} from '../touchableOpacity';

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
  containerElement?: React.ComponentType<ListItemProps | TouchableOpacityProps>;
  /**
   * The inner element style
   */
  style?: ViewStyle;
  /**
   * The inner element pressed backgroundColor
   */
  underlayColor?: string;

  testID?: string;
};

export type ListItemPartProps = {
  /**
   * this part content will be aligned to left
   */
  left?: boolean;
  /**
   * this part content will be aligned to spreaded
   */
  middle?: boolean;
  /**
   * this part content will be aligned to right
   */
  right?: boolean;
  /**
   * this part content direction will be row (default)
   */
  row?: boolean;
  /**
   * this part content direction will be column
   */
  column?: boolean;
  /**
   * container style
   */
  containerStyle?: StyleProp<ViewStyle>;
};

/**
 * @description: List item component to render inside a List component
 * @extends: TouchableOpacity
 * @gif: https://media.giphy.com/media/l1IBjHowyPcOTWAY8/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/BasicListScreen.tsx
 */
// @ts-ignore
class FakeListItemForDocs extends PureComponent<ListItemProps> { // eslint-disable-line
  static displayName = 'ListItem';

  render() {
    return null;
  }
}


/**
 * @description: ListItem.Part, a sub ListItem component for layout-ing inside a ListItem
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/BasicListScreen.tsx
 */
// @ts-ignore
class FakeListItemPartForDocs extends PureComponent<ListItemPartProps> { // eslint-disable-line
    static displayName = 'ListItemPart';
  
    render() {
      return null;
    }
}
