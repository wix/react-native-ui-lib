import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Image, ImageProps, Assets, BorderRadiuses, Colors, Spacings} from 'react-native-ui-lib';

const GRID_ITEM_CIRCLE_SIZE = 52;

const pickOption = (option: string) => {
  console.log(`picked: ${option}`);
};

const renderCustomItem = (imageProps: ImageProps) => {
  return (
    <View style={styles.gridItemContainerStyle}>
      <View center style={styles.gridItemCircle}>
        <Image {...imageProps}/>
      </View>
    </View>
  );
};

export const listItems = [
  {label: 'Open Settings', onPress: () => pickOption('Open Settings')},
  {label: 'View Notifications', onPress: () => pickOption('View Notifications')},
  {label: 'Update Profile', onPress: () => pickOption('Update Profile')},
  {label: 'Log Out', onPress: () => pickOption('Log Out')},
  {label: 'Share Post', onPress: () => pickOption('Share Post')},
  {label: 'Send Message', onPress: () => pickOption('Send Message')},
  {label: 'Take Photo', onPress: () => pickOption('Take Photo')},
  {label: 'Record Video', onPress: () => pickOption('Record Video')},
  {label: 'Add to Favorites', onPress: () => pickOption('Add to Favorites')},
  {label: 'Search', onPress: () => pickOption('Search')},
  {label: 'Refresh Feed', onPress: () => pickOption('Refresh Feed')},
  {label: 'Edit Post', onPress: () => pickOption('Edit Post')},
  {label: 'Report Issue', onPress: () => pickOption('Report Issue')},
  {label: 'Contact Support', onPress: () => pickOption('Contact Support')},
  {label: 'View Profile', onPress: () => pickOption('View Profile')},
  {label: 'Cancel', onPress: () => pickOption('Cancel')}
];

export const gridItems = [
  {
    title: 'Open Settings',
    onPress: () => pickOption('Open Settings'),
    renderCustomItem: () =>
      renderCustomItem({
        source: Assets.icons.demo.settings
      })
  },
  {
    title: 'View Notifications',
    onPress: () => pickOption('View Notifications'),
    renderCustomItem: () =>
      renderCustomItem({
        source: Assets.icons.demo.refresh
      })
  },
  {
    title: 'Update Profile',
    onPress: () => pickOption('Update Profile'),
    renderCustomItem: () =>
      renderCustomItem({
        source: Assets.icons.check
      })
  },
  {
    title: 'Log Out',
    onPress: () => pickOption('Log Out'),
    renderCustomItem: () =>
      renderCustomItem({
        source: Assets.icons.x
      })
  },
  {
    title: 'Share Post',
    onPress: () => pickOption('Share Post'),
    renderCustomItem: () =>
      renderCustomItem({
        source: Assets.icons.plusSmall
      })
  },
  {
    title: 'Send Message',
    onPress: () => pickOption('Send Message'),
    renderCustomItem: () =>
      renderCustomItem({
        source: Assets.icons.minusSmall
      })
  },
  {
    title: 'Take Photo',
    onPress: () => pickOption('Take Photo'),
    renderCustomItem: () =>
      renderCustomItem({
        source: Assets.icons.demo.camera
      })
  },
  {
    title: 'Record Video',
    onPress: () => pickOption('Record Video'),
    renderCustomItem: () =>
      renderCustomItem({
        source: Assets.icons.demo.camera
      })
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
  gridItemContainerStyle: {
    marginBottom: Spacings.s2
  },
  containerStyle: {marginVertical: Spacings.s2}
});
