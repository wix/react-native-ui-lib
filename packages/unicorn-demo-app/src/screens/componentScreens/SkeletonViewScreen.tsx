import _ from 'lodash';
import React, {Component} from 'react';
import {Alert, ScrollView, StyleSheet} from 'react-native';
import {
  Avatar,
  BorderRadiuses,
  Button,
  Constants,
  Image,
  ListItem,
  SkeletonView,
  Spacings,
  Text,
  View,
  Colors
} from 'react-native-ui-lib';
import * as ExampleScreenPresenter from '../ExampleScreenPresenter';

const AVATAR_SIZE = 48;

const IMAGE_URIS = [
  'https://static.wixstatic.com/media/17db2bb89a1d405886bf6c5f90c776e8.jpg',
  'https://static.wixstatic.com/media/ed8de924f9a04bc1b7f43137378d696e.jpg',
  'https://static.wixstatic.com/media/ea3157fe992346728dd08cc2e4560e1c.jpg'
];

const NUMBER_OF_ITEMS_TO_SHOW = 10;

const DATA_TYPE = {
  List: 'list',
  Content: 'content',
  Images: 'images',
  Avatars: 'avatars',
  Custom: 'custom'
};

const LIST_TYPE = {
  Regular: 'regular',
  Avatar: 'avatar',
  Thumbnail: 'thumbnail'
};

export default class SkeletonViewScreen extends Component {
  state = {
    isDataAvailable: false,
    dataType: DATA_TYPE.List,
    listType: LIST_TYPE.Regular,
    isLarge: false,
    showEndContent: true,
    key: 1
  };

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

  setEndContent = () => {
    const {showEndContent, key} = this.state;
    this.setState({showEndContent: !showEndContent, key: key + 1, isDataAvailable: false});
  };

  renderEndContent = () => {
    const {showEndContent} = this.state;
    if (showEndContent) {
      return (
        <View flex right paddingR-20>
          <SkeletonView width={45} height={18} borderRadius={BorderRadiuses.br10}/>
        </View>
      );
    }
  };

  renderTopSection = () => {
    const {isDataAvailable, isLarge, showEndContent, dataType} = this.state;
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
            label={'Show data'}
            style={[styles.toggleButton]}
            size={Button.sizes.xSmall}
            outline={!isDataAvailable}
            onPress={this.toggleVisibility}
          />
          {dataType === DATA_TYPE.List && (
            <Button
              label={'Large items'}
              style={[styles.toggleButton]}
              size={Button.sizes.xSmall}
              outline={!isLarge}
              onPress={this.setSize}
            />
          )}
          {dataType === DATA_TYPE.List && (
            <Button
              label={'End content'}
              style={[styles.toggleButton]}
              size={Button.sizes.xSmall}
              outline={!showEndContent}
              onPress={this.setEndContent}
            />
          )}
        </View>
      </View>
    );
  };

  renderAvatar = () => {
    return (
      <ListItem.Part left>
        <Avatar source={this.getRandomAvatar()} containerStyle={{marginStart: 14}}/>
      </ListItem.Part>
    );
  };

  renderThumbnail = () => {
    return (
      <ListItem.Part left>
        <Image source={this.getRandomAvatar()} style={{height: 54, width: 54, marginLeft: 14}}/>
      </ListItem.Part>
    );
  };

  renderEndLabel = () => {
    return (
      <View centerV paddingR-20>
        <Text>Verified</Text>
      </View>
    );
  };

  renderListItemsData = (customValue?: any) => {
    const {isLarge, showEndContent} = this.state;
    const {hasAvatar, hasThumbnail} = customValue || {};

    return (
      <React.Fragment>
        {_.times(NUMBER_OF_ITEMS_TO_SHOW, index => {
          return (
            <ListItem key={index} height={90} onPress={() => Alert.alert(`pressed on order #${index + 1}`)}>
              {hasAvatar && this.renderAvatar()}
              {hasThumbnail && this.renderThumbnail()}
              <ListItem.Part middle column containerStyle={[styles.border, {marginLeft: 18}]}>
                <ListItem.Part containerStyle={{marginBottom: 3}}>
                  <Text text60 numberOfLines={1}>{`User ${index + 1}`}</Text>
                </ListItem.Part>
                <ListItem.Part>
                  <Text text70 numberOfLines={1}>
                    Member
                  </Text>
                </ListItem.Part>
                {isLarge && (
                  <ListItem.Part>
                    <Text text70 numberOfLines={1}>
                      Since:{' '}
                    </Text>
                  </ListItem.Part>
                )}
              </ListItem.Part>
              {showEndContent && this.renderEndLabel()}
            </ListItem>
          );
        })}
      </React.Fragment>
    );
  };

  renderListItems = (hasAvatar = false, hasThumbnail = false) => {
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
        listProps={{size, contentType, renderEndContent: this.renderEndContent}}
        showContent={isDataAvailable}
        renderContent={this.renderListItemsData}
        customValue={{hasAvatar, hasThumbnail}}
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

  getImageSize = () => (Constants.screenWidth - IMAGE_URIS.length * Spacings.s5) / IMAGE_URIS.length;

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
      <SkeletonView
        row
        spread
        margin-page
        width={imageSize}
        height={imageSize}
        showContent={isDataAvailable}
        renderContent={this.renderImagesData}
        accessibilityLabel={'Loading image'}
        times={IMAGE_URIS.length}
      />
    );
  };

  getRandomInt = (max: number) => {
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

  renderCustom = () => {
    const {isDataAvailable} = this.state;

    return (
      <View margin-20>
        <View row spread marginB-8>
          <SkeletonView
            width={120}
            height={20}
            borderRadius={5}
            showContent={isDataAvailable}
            renderContent={() => <Text text60BO>Lorem Ipsum</Text>}
          />
          <SkeletonView
            width={40}
            height={10}
            borderRadius={5}
            style={{marginTop: 5}}
            showContent={isDataAvailable}
            renderContent={() => <Button label={'Info'} size={Button.sizes.small} link/>}
          />
        </View>
        <SkeletonView
          shimmerStyle={{width: '100%' /* , height: 30 */}}
          height={10}
          borderRadius={5}
          showContent={isDataAvailable}
          renderContent={() => <Text>Lorem Ipsum is simply dummy text of the industry.</Text>}
          colors={[Colors.red70, Colors.red50, Colors.red70]}
        />
      </View>
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
      case DATA_TYPE.Content:
        return this.renderContent();
      case DATA_TYPE.Images:
        return this.renderImages();
      case DATA_TYPE.Avatars:
        return this.renderAvatarStrip();
      case DATA_TYPE.Custom:
        return this.renderCustom();
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
  avatar: {
    marginVertical: 8
  },
  image: {
    flex: 1,
    borderRadius: BorderRadiuses.br20
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey70
  }
});
