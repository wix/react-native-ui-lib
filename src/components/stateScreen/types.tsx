import {PureComponent} from 'react';
import {ImageURISource} from 'react-native';

export type StateScreenProps = {
  /**
   * The image source that's showing at the top. use an image that was required locally
   */
  imageSource?: ImageURISource;
  source?: ImageURISource; // TODO: remove after deprecation
  /**
   * To to show as the title
   */
  title: string;
  /**
   * Text to to show as the subtitle
   */
  subtitle?: string | React.ReactNode;
  /**
   * Text to to show in the "call to action" button
   */
  ctaLabel?: string;
  /**
   * Action handler for "call to action" button
   */
  onCtaPress?: () => void;
  /**
   * Use to identify the container in tests
   */
  testId?: string;
  testID?: string;
};

/**
 * @description: Component that shows a full screen for a certain state, like an empty state
 * @image: https://user-images.githubusercontent.com/33805983/34672894-f262ab84-f488-11e7-83f0-4ee0f0ac34ba.png
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/EmptyStateScreen.tsx
 */
// @ts-ignore
class FakeStateScreenForDocs extends PureComponent<StateScreenProps> { // eslint-disable-line
  static displayName = 'StateScreen';

  render() {
    return null;
  }
}
