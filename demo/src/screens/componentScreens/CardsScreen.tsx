import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {
  Constants,
  Colors,
  View,
  Card,
  CardPropTypes,
  Button,
  Text,
  Image
} from 'react-native-ui-lib';
// @ts-ignore
import posts from '../../data/posts';

const featureIcon = require('../../assets/icons/star.png');
const shareIcon = require('../../assets/icons/share.png');
const cardImage = require('../../assets/images/card-example.jpg');
const cardImage2 = require('../../assets/images/empty-state.jpg');

type CardsScreenProps = {};

type CardsScreenState = {
  selected1: boolean;
  selected2: boolean;
};

export default class CardsScreen extends Component<
  CardsScreenProps,
  CardsScreenState
> {
  state = {
    selected1: true,
    selected2: true
  };

  renderSelectableCards = () => {
    const {selected1, selected2} = this.state;
    return (
      <View row marginV-10>
        <Card
          height={120}
          flex
          selected={selected1}
          onPress={() => this.setState({selected1: !selected1})}
          activeOpacity={1}
          marginR-20
        >
          <Card.Section imageSource={cardImage} imageStyle={{height: '100%'}} />
        </Card>
        <Card
          height={120}
          flex
          selected={selected2}
          onPress={() => this.setState({selected2: !selected2})}
          activeOpacity={1}
          selectionOptions={{
            color: Colors.dark10,
            indicatorSize: 25,
            borderWidth: 3
          }}
        >
          <Card.Section imageSource={cardImage} imageStyle={{height: '100%'}} />
        </Card>
      </View>
    );
  };

  renderTextSection = () => {
    return (
      <Card.Section
        content={[
          {text: 'You’re Invited!', text70: true, dark10: true},
          {
            text:
              '222 Join Old The Town Barbershop Official Store. Download the Wix app to...',
            text80: true,
            dark10: true
          },
          {text: 'wix.to/A465c', text90: true, dark50: true}
        ]}
        style={{padding: 20, flex: 1}}
      />
    );
  };

  renderText = () => {
    return (
      <View padding-20 flex>
        <Text text70 dark10>
          You’re Invited!
        </Text>
        <Text text80 dark10>
          222 Join Old The Town Barbershop Official Store. Download the Wix app
          to...
        </Text>
        <Text text90 dark50>
          wix.to/A465c
        </Text>
      </View>
    );
  };

  renderHorizontalCard = (
    isImageOnLeft: boolean,
    borderRadius: number,
    useSection: boolean
  ) => {
    return (
      <Card
        row
        height={160}
        style={{marginBottom: 15}}
        onPress={() => {}}
        enableBlur
        borderRadius={borderRadius}
        useNative
        backgroundColor={Colors.white}
        activeOpacity={1}
        activeScale={isImageOnLeft ? 0.96 : 1.04}
      >
        {isImageOnLeft && (
          <Card.Section
            imageSource={cardImage}
            imageStyle={{width: 115, height: '100%'}}
          />
        )}
        {useSection ? this.renderTextSection() : this.renderText()}
        {!isImageOnLeft && (
          <Card.Section
            imageSource={cardImage}
            imageStyle={{width: 115, height: '100%'}}
          />
        )}
      </Card>
    );
  };

  renderImageOnBottom = () => {
    return (
      <Card style={{marginBottom: 10}} onPress={() => {}}>
        <Card.Section
          content={[
            {text: 'You’re Invited!', text70: true, dark10: true},
            {text: 'join now', text90: true, dark50: true}
          ]}
          style={{padding: 20}}
        />
        <Card.Section imageSource={cardImage2} imageStyle={{height: 120}} />
      </Card>
    );
  };

  renderCoupon = (cardProps: CardPropTypes) => {
    return (
      <Card
        {...cardProps}
        flex
        height={160}
        onPress={() => {}}
        useNative
        activeOpacity={1}
        activeScale={0.96}
      >
        <Card.Section
          bg-red30
          padding-20
          flex-3
          content={[
            {text: 'Special sale!', text70: true, white: true},
            {text: '10%', text60: true, white: true}
          ]}
          contentStyle={{alignItems: 'center'}}
        />
        <Card.Section
          padding-20
          flex
          content={[{text: 'All site', text70: true, dark10: true}]}
          contentStyle={{alignItems: 'center', margin: 0, padding: 0}}
        />
      </Card>
    );
  };

  renderCoupons = () => {
    return (
      <View row spread marginB-10>
        {this.renderCoupon({'marginR-10': true})}
        {this.renderCoupon({'marginL-10': true})}
      </View>
    );
  };

  renderComplexImage = (cardProps: CardPropTypes, image: React.ReactNode) => {
    return (
      <Card
        {...cardProps}
        flex
        marginV-10
        onPress={() => {}}
        useNative
        activeOpacity={1}
        activeScale={0.96}
      >
        {image}
        <Card.Section
          padding-20
          content={[{text: 'All site', text70: true, dark10: true}]}
          contentStyle={{alignItems: 'center'}}
        />
      </Card>
    );
  };

  renderComplexImages = () => {
    return (
      <View row spread height={160}>
        {
          // Icon
          this.renderComplexImage(
            {'marginR-5': true},
            <Card.Section
              flex
              backgroundColor={Colors.blue20}
              imageSource={featureIcon}
              imageStyle={{
                width: 25,
                height: 25,
                flex: 0,
                alignSelf: 'center'
              }}
              style={{
                justifyContent: 'center'
              }}
            />
          )
        }
        {
          // Image with overlay content
          this.renderComplexImage(
            {'marginL-5': true},
            <Card.Section
              flex
              imageSource={cardImage2}
              imageStyle={{height: '100%'}}
              content={[
                {text: 'Special sale!', text70: true, blue10: true},
                {text: '10%', text60: true, blue10: true}
              ]}
              contentStyle={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            />
          )
        }
      </View>
    );
  };

  renderNumbers = () => {
    return (
      <ScrollView
        style={{height: 100}}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {_.times(4, (i) => {
          return (
            <Card key={i} width={100} style={{marginRight: 20}}>
              <View padding-15>
                <Text text30 dark30>
                  {i}
                </Text>
              </View>
            </Card>
          );
        })}
      </ScrollView>
    );
  };

  renderBackgroundCard = (cardProps: CardPropTypes, body: React.ReactNode) => {
    return (
      <Card flex center height={80} {...cardProps}>
        {body}
      </Card>
    );
  };

  renderBackgroundTypes = () => {
    return (
      <View row marginV-10>
        {this.renderBackgroundCard(
          {'marginR-20': true, style: {backgroundColor: Colors.dark60}},
          <Text text80 center white>
            With custom background color
          </Text>
        )}
        {this.renderBackgroundCard(
          {
            'marginR-20': true,
            style: {backgroundColor: Colors.rgba(Colors.dark60, 0.75)}
          },
          <Text text70 center white>
            With opacity
          </Text>
        )}
        {Constants.isIOS &&
          this.renderBackgroundCard(
            {enableBlur: true, 'marginL-20': true},
            <>
              <Text text70 dark20 center>
                With Blur effect
              </Text>
              <Text text80 dark20 center>
                (iOS only)
              </Text>
            </>
          )}
      </View>
    );
  };

  renderComplexExample = () => {
    return _.map(posts, (post, i) => {
      const statusColor =
        post.status === 'Published' ? Colors.green30 : Colors.orange30;

      return (
        <Card
          key={i}
          style={{marginBottom: 15}}
          onPress={() => console.log('press on a card')}
        >
          <Card.Section
            imageSource={post.coverImage}
            imageStyle={{height: 160}}
          />

          <View padding-20>
            <Text text40 color={Colors.dark10}>
              {post.title}
            </Text>
            <View row>
              <Text text90 color={statusColor}>
                {post.status}
              </Text>
              <Text text90> | {post.timestamp}</Text>
            </View>

            <Text text70 color={Colors.dark10}>
              {post.description}
            </Text>

            <View>
              <Text text90 color={Colors.dark50}>
                {post.likes} Likes
              </Text>
              <View row right>
                <Button
                  style={{marginRight: 10}}
                  text90
                  link
                  iconSource={featureIcon}
                  label="Feature"
                />
                <Button text90 link iconSource={shareIcon} label="Share" />
              </View>
            </View>
          </View>
        </Card>
      );
    });
  };

  renderCustomContent = () => {
    return (
      <>
        {this.renderNumbers()}
        {this.renderBackgroundTypes()}
        {this.renderComplexExample()}
      </>
    );
  };

  render() {
    return (
      <View>
        <Image
          style={StyleSheet.absoluteFillObject}
          source={{
            uri:
              'https://images.pexels.com/photos/1005644/pexels-photo-1005644.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
          }}
        />

        <ScrollView>
          <View flex padding-20>
            {this.renderSelectableCards()}
            {this.renderHorizontalCard(true, 0, true)}
            {this.renderHorizontalCard(true, 20, false)}
            {this.renderHorizontalCard(false, 0, false)}
            {this.renderHorizontalCard(false, 20, true)}
            {this.renderImageOnBottom()}
            {this.renderCoupons()}
            {this.renderComplexImages()}
            {this.renderCustomContent()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

StyleSheet.create({
  container: {}
});
