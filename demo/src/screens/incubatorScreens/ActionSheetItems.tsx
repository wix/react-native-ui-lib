import {Alert} from 'react-native';
import {Assets} from 'react-native-ui-lib';

export enum TEXT_LENGTH {
  NO_TEXT = 'No text',
  SHORT = 'Short',
  LONG = 'Long'
}

export enum CUSTOM_TITLE_COMPONENT {
  NONE = 'None',
  AVATAR = 'Avatar',
  ICON = 'Icon',
  THUMBNAIL = 'Thumbnail'
}

export enum OPTIONS_TYPE {
  NONE = 'None',
  REGULAR = 'Regular',
  WITH_ICONS = 'With icons',
  LONG = 'Long',
  SECTION_HEADERS = 'Section headers',
  GRID_VIEW = 'Grid view'
}

export type State = {
  shouldShowModal: boolean;
  titleLength: TEXT_LENGTH;
  titleIsProminent: boolean;
  titleIsClickable: boolean;
  subtitleLength: TEXT_LENGTH;
  showFooter: boolean;
  optionsType: OPTIONS_TYPE;
  visible: boolean;
};

const pickOption = (option: string) => {
  Alert.alert(`picked: ${option}`);
};

export const listItems = [
  {title: 'Open Settings', onPress: () => pickOption('Open Settings')},
  {title: 'View Notifications', onPress: () => pickOption('View Notifications')},
  {title: 'Update Profile', onPress: () => pickOption('Update Profile')},
  {title: 'Log Out', onPress: () => pickOption('Log Out')},
  {title: 'Share Post', onPress: () => pickOption('Share Post')},
  {title: 'Send Message', onPress: () => pickOption('Send Message')},
  {title: 'Take Photo', onPress: () => pickOption('Take Photo')},
  {title: 'Record Video', onPress: () => pickOption('Record Video')},
  {title: 'Add to Favorites', onPress: () => pickOption('Add to Favorites')},
  {title: 'Search', onPress: () => pickOption('Search')},
  {title: 'Refresh Feed', onPress: () => pickOption('Refresh Feed')},
  {title: 'Edit Post', onPress: () => pickOption('Edit Post')},
  {title: 'Report Issue', onPress: () => pickOption('Report Issue')},
  {title: 'Contact Support', onPress: () => pickOption('Contact Support')},
  {title: 'View Profile', onPress: () => pickOption('View Profile')},
  {title: 'Cancel', onPress: () => pickOption('Cancel')}
];

export const gridItems = [
  {
    title: 'Open Settings',
    imageProps: {
      source: Assets.icons.demo.settings
    },
    onPress: () => pickOption('Open Settings')
  },
  {
    title: 'View Notifications',
    imageProps: {
      source: Assets.icons.demo.refresh
    },
    onPress: () => pickOption('View Notifications')
  },
  {
    title: 'Update Profile',
    imageProps: {
      source: Assets.icons.check
    },
    onPress: () => pickOption('Update Profile')
  },
  {
    title: 'Log Out',
    imageProps: {
      source: Assets.icons.x
    },
    onPress: () => pickOption('Log Out')
  },
  {
    title: 'Share Post',
    imageProps: {
      source: Assets.icons.plusSmall
    },
    onPress: () => pickOption('Share Post')
  },
  {
    title: 'Take Photo',
    imageProps: {
      source: Assets.icons.demo.camera
    },
    onPress: () => pickOption('Take Photo')
  },
  {
    title: 'Record Video',
    imageProps: {
      source: Assets.icons.demo.camera
    },
    onPress: () => pickOption('Record Video')
  }
];
