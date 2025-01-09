import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Image, ImageProps, Assets, BorderRadiuses, Colors, Spacings} from 'react-native-ui-lib';

const GRID_ITEM_CIRCLE_SIZE = 52;

const pickOption = (option: string) => {
  console.log(`picked: ${option}`);
};

const renderCustomItem = (imageProps: ImageProps) => {
  return (
    <View style={styles.gridItemCustomRenderStyle}>
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
    subtitle: 'Subtitle',
    onPress: () => pickOption('Open Settings'),
    renderCustomItem: () =>
      renderCustomItem({
        source: Assets.icons.demo.settings
      }),
    containerStyle: {alignItems: 'center', margin: Spacings.s1}
  },
  {
    title: 'View Notifications',
    onPress: () => pickOption('View Notifications'),
    renderCustomItem: () =>
      renderCustomItem({
        source: Assets.icons.demo.refresh
      }),
    containerStyle: {alignItems: 'center', margin: Spacings.s1}
  },
  {
    title: 'Update Profile',
    onPress: () => pickOption('Update Profile'),
    renderCustomItem: () =>
      renderCustomItem({
        source: Assets.icons.check
      }),
    containerStyle: {alignItems: 'center', margin: Spacings.s1}
  },
  {
    title: 'Log Out',
    onPress: () => pickOption('Log Out'),
    renderCustomItem: () =>
      renderCustomItem({
        source: Assets.icons.x
      }),
    containerStyle: {alignItems: 'center', margin: Spacings.s1}
  },
  {
    title: 'Share Post',
    onPress: () => pickOption('Share Post'),
    renderCustomItem: () =>
      renderCustomItem({
        source: Assets.icons.plusSmall
      }),
    containerStyle: {alignItems: 'center', margin: Spacings.s1}
  },
  {
    title: 'Send Message',
    onPress: () => pickOption('Send Message'),
    renderCustomItem: () =>
      renderCustomItem({
        source: Assets.icons.minusSmall
      }),
    containerStyle: {alignItems: 'center', margin: Spacings.s1}
  },
  {
    title: 'Take Photo',
    onPress: () => pickOption('Take Photo'),
    renderCustomItem: () =>
      renderCustomItem({
        source: Assets.icons.demo.camera
      }),
    containerStyle: {alignItems: 'center', margin: Spacings.s1}
  },
  {
    title: 'Record Video',
    onPress: () => pickOption('Record Video'),
    renderCustomItem: () =>
      renderCustomItem({
        source: Assets.icons.demo.camera
      }),
    containerStyle: {alignItems: 'center', margin: Spacings.s1}
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
  gridItemCustomRenderStyle: {
    marginBottom: Spacings.s2,
    alignSelf: 'center'
  },
  containerStyle: {marginVertical: Spacings.s2}
});
