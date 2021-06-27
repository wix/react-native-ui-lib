import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, ScrollView, Alert} from 'react-native';
import {ListItem, SkeletonView, Spacings, Constants, BorderRadiuses, Avatar, Text, View, Image, Button} from 'react-native-ui-lib';
import * as ExampleScreenPresenter from '../ExampleScreenPresenter';

const AVATAR_SIZE = 48;

const THUMBNAIL_URL =
  'https://static.wixstatic.com/media/8616c2ac52ee4d0294dd3c7e578228a1.jpg/v1/fit/w_300,h_600,q_85/8616c2ac52ee4d0294dd3c7e578228a1.jpg';

const IMAGE_URIS = [
  'https://static.wixstatic.com/media/17db2bb89a1d405886bf6c5f90c776e8.jpg',
  'https://static.wixstatic.com/media/ed8de924f9a04bc1b7f43137378d696e.jpg',
  'https://static.wixstatic.com/media/ea3157fe992346728dd08cc2e4560e1c.jpg'
];

const NUMBER_OF_ITEMS_TO_SHOW = 5;

const DATA_TYPE = {
  List: 'list',
  Images: 'images',
  Avatars: 'avatars',
  Content: 'content'
};

const LIST_TYPE = {
  Regular: 'regular',
  Avatar: 'avatar',
  Thumbnail: 'thumbnail'
};

export default class SkeletonViewScreen extends Component {
  state = {isDataAvailable: false, dataType: DATA_TYPE.List, listType: LIST_TYPE.Regular, isLarge: false, key: 1};

  increaseKey = () => {
    const {key} = this.state;
    this.setState({isDataAvailable: false, key: key + 1});
  };

  toggleVisibility = () => {
    const {isDataAvailable} = this.state;
    if (isDataAvailable) {
      this.increaseKey();
    } else {
      this.setState({isDataAvailable: true});
    }
  };

  setSize = () => {
    const {isLarge, key} = this.state;
    this.setState({isLarge: !isLarge, key: key + 1, isDataAvailable: false});
  };

  renderTopSection = () => {
    const {isDataAvailable, isLarge, dataType} = this.state;
    return (
      <View marginH-page marginV-s1>
        {ExampleScreenPresenter.renderHeader.call(this, 'Skeleton')}
        {ExampleScreenPresenter.renderRadioGroup.call(this, 'Data type', 'dataType', DATA_TYPE, {
          isRow: true,
          afterValueChanged: this.increaseKey
        })}
        {dataType === DATA_TYPE.List &&
        ExampleScreenPresenter.renderRadioGroup.call(this, 'List type', 'listType', LIST_TYPE, {
          isRow: true,
          afterValueChanged: this.increaseKey
        })}
        <View row centerV spread>
          <Button
            label={isDataAvailable ? 'Hide data' : 'Show data'}
            style={[styles.toggleButton]}
            size={'small'}
            outline={!isDataAvailable}
            onPress={this.toggleVisibility}
          />
          {dataType === DATA_TYPE.List && (
            <Button
              label={isLarge ? 'Set items to small' : 'Set items to large'}
              style={[styles.toggleButton]}
              size={'small'}
              outline={!isLarge}
              onPress={this.setSize}
            />
          )}
        </View>
      </View>
    );
  };

  itemPressed = props => {
    Alert.alert('Item pressed', 'Title:' + props.title);
  };

  renderListItemsData = ({contentProps: {hasAvatar, hasThumbnail}}) => {
    const {isLarge} = this.state;
    const thumbnail = hasThumbnail ? {source: {uri: THUMBNAIL_URL}} : undefined;

    return (
      <React.Fragment>
        {_.times(NUMBER_OF_ITEMS_TO_SHOW, index => {
          return (
            <ListItem
              key={`list-item-${index}`}
              testID={`list-item-${index}`}
              title={`Small list item ${index + 1}`}
              subtitle={'Some text'}
              description={isLarge ? 'Other text' : undefined}
              avatar={hasAvatar ? {source: this.getRandomAvatar(), animate: false} : undefined}
              thumbnail={thumbnail}
              onPress={this.itemPressed}
            />
          );
        })}
      </React.Fragment>
    );
  };

  renderListItems = (hasAvatar, hasThumbnail) => {
    const {isDataAvailable, isLarge} = this.state;
    const contentType = hasAvatar
      ? SkeletonView.contentTypes.AVATAR
      : hasThumbnail
        ? SkeletonView.contentTypes.THUMBNAIL
        : undefined;
    const size = isLarge ? SkeletonView.sizes.LARGE : SkeletonView.sizes.SMALL;
    return (
      <SkeletonView
        template={SkeletonView.templates.LIST_ITEM}
        contentType={contentType}
        size={size}
        showContent={isDataAvailable}
        renderContent={this.renderListItemsData}
        contentProps={{hasAvatar, hasThumbnail}}
        times={NUMBER_OF_ITEMS_TO_SHOW}
      />
    );
  };

  renderRegularListItems = () => {
    return this.renderListItems();
  };

  renderListItemsWithAvatar = () => {
    return this.renderListItems(true);
  };

  renderListItemsWithThumbnail = () => {
    return this.renderListItems(false, true);
  };

  getImageSize = () => (Constants.screenWidth - IMAGE_URIS.length * Spacings.page) / IMAGE_URIS.length;

  renderImagesData = () => {
    const imageSize = this.getImageSize();

    return _.map(IMAGE_URIS, (uri, index) => {
      return (
        <View key={`image-${index}`} testID={`image-${index}`} width={imageSize} height={imageSize}>
          <Image style={styles.image} source={{uri}}/>
        </View>
      );
    });
  };

  renderImages = () => {
    const {isDataAvailable} = this.state;
    const imageSize = this.getImageSize();

    return (
      <View row spread margin-page>
        <SkeletonView
          width={imageSize}
          height={imageSize}
          showContent={isDataAvailable}
          renderContent={this.renderImagesData}
          accessibilityLabel={'Loading image'}
          times={IMAGE_URIS.length}
        />
      </View>
    );
  };

  getRandomInt = max => {
    return Math.floor(Math.random() * max);
  };

  getRandomAvatar = () => {
    const isMan = Math.random() >= 0.5;
    return {uri: `https://randomuser.me/api/portraits/${isMan ? 'men' : 'women'}/${this.getRandomInt(50)}.jpg`};
  };

  renderAvatarsData = () => {
    return (
      <React.Fragment>
        {_.times(NUMBER_OF_ITEMS_TO_SHOW, index => {
          const {isDataAvailable} = this.state;
          const avatarSize = isDataAvailable ? AVATAR_SIZE : NaN; // NaN creates a red screen (on purpose, to test it's not rendered)
          return (
            <Avatar
              key={`avatar-${index}`}
              testID={`avatar-${index}`}
              size={avatarSize}
              source={this.getRandomAvatar()}
              animate={false}
              containerStyle={styles.avatar}
            />
          );
        })}
      </React.Fragment>
    );
  };

  renderAvatarStrip = () => {
    const {isDataAvailable} = this.state;
    return (
      <View style={styles.section}>
        <SkeletonView
          width={AVATAR_SIZE}
          height={AVATAR_SIZE}
          showContent={isDataAvailable}
          renderContent={this.renderAvatarsData}
          circle
          style={styles.avatar}
          accessibilityLabel={'Loading avatar'}
          times={NUMBER_OF_ITEMS_TO_SHOW}
        />
      </View>
    );
  };

  renderText = () => {
    return (
      <Text>
        I want to sell my goods internationally and found Wix Web Services can be used for shipping-centric
        implementations.
      </Text>
    );
  };

  renderContent = () => {
    const {isDataAvailable} = this.state;
    return (
      <View style={styles.contentSection}>
        <SkeletonView
          template={SkeletonView.templates.TEXT_CONTENT}
          showContent={isDataAvailable}
          renderContent={this.renderText}
        />
      </View>
    );
  };

  renderData = () => {
    const {dataType, listType} = this.state;

    switch (dataType) {
      case DATA_TYPE.List:
      default:
        switch (listType) {
          case LIST_TYPE.Regular:
          default:
            return this.renderRegularListItems();
          case LIST_TYPE.Avatar:
            return this.renderListItemsWithAvatar();
          case LIST_TYPE.Thumbnail:
            return this.renderListItemsWithThumbnail();
        }
      case DATA_TYPE.Images:
        return this.renderImages();
      case DATA_TYPE.Avatars:
        return this.renderAvatarStrip();
      case DATA_TYPE.Content:
        return this.renderContent();
    }
  };

  render() {
    const {key} = this.state;

    return (
      <View flex key={key}>
        {this.renderTopSection()}
        <ScrollView>
          <View flex>{this.renderData()}</View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  toggleButton: {
    borderRadius: BorderRadiuses.br10
  },
  section: {
    flexDirection: 'row',
    paddingTop: Spacings.s5,
    paddingHorizontal: Spacings.s5
  },
  contentSection: {
    padding: Spacings.s5
  },
  sectionTitle: {
    paddingTop: Spacings.s5,
    paddingLeft: Spacings.s5
  },
  image: {
    flex: 1
  },
  avatar: {
    marginRight: 20
  }
});
