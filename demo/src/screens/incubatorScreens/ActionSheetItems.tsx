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
    <View center style={styles.gridItemCircle}>
      <Image {...imageProps}/>
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
