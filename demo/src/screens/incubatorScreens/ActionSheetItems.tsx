import React from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Assets, BorderRadiuses, Colors, Image, ImageProps, Spacings, View} from 'react-native-ui-lib';

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
  SECTION_HEADERS = 'Section headers',
  GRID_VIEW = 'Grid view',
  GRID_VIEW_LONG = 'Grid view long'
}

export type State = {
  titleLength: TEXT_LENGTH;
  titleIsProminent: boolean;
  titleIsClickable: boolean;
  subtitleLength: TEXT_LENGTH;
  showFooter: boolean;
  optionsType: OPTIONS_TYPE;
  visible: boolean;
};

export const ICONS = [
  Assets.icons.demo.settings,
  Assets.icons.demo.refresh,
  Assets.icons.check,
  Assets.icons.x,
  Assets.icons.plusSmall,
  Assets.icons.demo.camera
];

const GRID_ITEM_CIRCLE_SIZE = 52;

const pickOption = (option: string) => {
  Alert.alert(`picked: ${option}`);
};

const renderCustomItem = (imageProps: ImageProps) => {
  return (
    <View center>
      <View center style={styles.gridItemCircle}>
        <Image {...imageProps}/>
      </View>
    </View>
  );
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
    renderCustomItem: () => renderCustomItem({source: Assets.icons.demo.settings}),
    onPress: () => pickOption('Open Settings')
  },
  {
    title: 'View Notifications',
    renderCustomItem: () => renderCustomItem({source: Assets.icons.demo.refresh}),
    onPress: () => pickOption('View Notifications')
  },
  {
    title: 'Update Profile',
    renderCustomItem: () => renderCustomItem({source: Assets.icons.check}),
    onPress: () => pickOption('Update Profile'),
    avoidDismiss: true
  },
  {
    title: 'Log Out',
    renderCustomItem: () => renderCustomItem({source: Assets.icons.x}),
    onPress: () => pickOption('Log Out')
  },
  {
    title: 'Share Post',
    renderCustomItem: () => renderCustomItem({source: Assets.icons.plusSmall}),
    onPress: () => pickOption('Share Post')
  },
  {
    title: 'Take Photo',
    renderCustomItem: () => renderCustomItem({source: Assets.icons.demo.camera}),
    onPress: () => pickOption('Take Photo')
  },
  {
    title: 'Record Video',
    renderCustomItem: () => renderCustomItem({source: Assets.icons.demo.camera}),
    onPress: () => pickOption('Record Video')
  },
  {
    title: 'Send Message',
    renderCustomItem: () => renderCustomItem({source: Assets.icons.demo.settings}),
    onPress: () => pickOption('Send Message')
  },
  {
    title: 'Create Event',
    renderCustomItem: () => renderCustomItem({source: Assets.icons.x}),
    onPress: () => pickOption('Create Event')
  },
  {
    title: 'Browse Contacts',
    renderCustomItem: () => renderCustomItem({source: Assets.icons.check}),
    onPress: () => pickOption('Browse Contacts')
  },
  {
    title: 'Check Updates',
    renderCustomItem: () => renderCustomItem({source: Assets.icons.plusSmall}),
    onPress: () => pickOption('Check Updates')
  },
  {
    title: 'Provide Feedback',
    renderCustomItem: () => renderCustomItem({source: Assets.icons.demo.refresh}),
    onPress: () => pickOption('Provide Feedback')
  },
  {
    title: 'View Gallery',
    renderCustomItem: () => renderCustomItem({source: Assets.icons.demo.camera}),
    onPress: () => pickOption('View Gallery')
  },
  {
    title: 'Access Help',
    renderCustomItem: () => renderCustomItem({source: Assets.icons.check}),
    onPress: () => pickOption('Access Help')
  },
  {
    title: 'Explore Settings',
    renderCustomItem: () => renderCustomItem({source: Assets.icons.x}),
    onPress: () => pickOption('Explore Settings')
  },
  {
    title: 'Manage Subscriptions',
    renderCustomItem: () => renderCustomItem({source: Assets.icons.plusSmall}),
    onPress: () => pickOption('Manage Subscriptions')
  },
  {
    title: 'Change Password',
    renderCustomItem: () => renderCustomItem({source: Assets.icons.demo.settings}),
    onPress: () => pickOption('Change Password')
  },
  {
    title: 'View Terms of Service',
    renderCustomItem: () => renderCustomItem({source: Assets.icons.demo.refresh}),
    onPress: () => pickOption('View Terms of Service')
  },
  {
    title: 'Contact Support',
    renderCustomItem: () => renderCustomItem({source: Assets.icons.x}),
    onPress: () => pickOption('Contact Support')
  },
  {
    title: 'Manage Privacy Settings',
    renderCustomItem: () => renderCustomItem({source: Assets.icons.check}),
    onPress: () => pickOption('Manage Privacy Settings')
  },
  {
    title: 'Send Feedback',
    renderCustomItem: () => renderCustomItem({source: Assets.icons.plusSmall}),
    onPress: () => pickOption('Send Feedback')
  },
  {
    title: 'View FAQ',
    renderCustomItem: () => renderCustomItem({source: Assets.icons.demo.camera}),
    onPress: () => pickOption('View FAQ')
  },
  {
    title: 'Reset App Preferences',
    renderCustomItem: () => renderCustomItem({source: Assets.icons.demo.refresh}),
    onPress: () => pickOption('Reset App Preferences')
  }
];

const styles = StyleSheet.create({
  gridItemCircle: {
    width: GRID_ITEM_CIRCLE_SIZE,
    height: GRID_ITEM_CIRCLE_SIZE,
    borderWidth: 1,
    borderRadius: BorderRadiuses.br100,
    borderColor: Colors.$outlineDisabled
  },

  containerStyle: {marginBottom: Spacings.s2, marginHorizontal: Spacings.s2, alignContent: 'center'}
});
