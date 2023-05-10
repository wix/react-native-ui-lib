import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Colors, View, Card, CardProps, Button, Text} from 'react-native-ui-lib';
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

export default class CardsScreen extends Component<CardsScreenProps, CardsScreenState> {
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
          <Card.Section imageSource={cardImage} imageStyle={{height: '100%'}}/>
        </Card>
        <Card
          height={120}
          flex
          selected={selected2}
          onPress={() => this.setState({selected2: !selected2})}
          activeOpacity={1}
          selectionOptions={{
            color: Colors.grey40,
            indicatorSize: 25,
            borderWidth: 3
          }}
        >
          <Card.Section imageSource={cardImage} imageStyle={{height: '100%'}}/>
        </Card>
      </View>
    );
  };

  renderTextSection = () => {
    return (
      <Card.Section
        content={[
          {text: 'You’re Invited!', text70: true, $textDefault: true},
          {
            text: '222 Join Old The Town Barbershop Official Store. Download the Wix app to...',
            text80: true,
            $textDefault: true
          },
          {text: 'wix.to/A465c', text90: true, $textDisabled: true}
        ]}
        style={{padding: 20, flex: 1}}
      />
    );
  };

  renderText = () => {
    return (
      <View padding-20 flex>
        <Text text70 $textDefault>
          You’re Invited!
        </Text>
        <Text text80 $textDefault>
          222 Join Old The Town Barbershop Official Store. Download the Wix app
          to...
        </Text>
        <Text text90 $textDisabled>
          wix.to/A465c
        </Text>
      </View>
    );
  };

  renderHorizontalCard = (isImageOnLeft: boolean, borderRadius: number, useSection: boolean) => {
    return (
      <Card
        row
        height={160}
        style={{marginBottom: 15}}
        onPress={() => {}}
        borderRadius={borderRadius}
        bg-$backgroundElevated
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
            {text: 'You’re Invited!', text70: true, $textDefault: true},
            {text: 'join now', text90: true, $textDisabled: true}
          ]}
          style={{padding: 20}}
        />
        <Card.Section imageSource={cardImage2} imageStyle={{height: 120}}/>
      </Card>
    );
  };

  renderCoupon = (cardProps: CardProps) => {
    return (
      <Card {...cardProps} flex height={160} onPress={() => {}} activeOpacity={1} activeScale={0.96}>
        <Card.Section
          bg-$backgroundDangerHeavy
          padding-20
          flex-3
          content={[
            {text: 'Special sale!', text70: true, $textDefaultLight: true},
            {text: '10%', text60: true, $textDefaultLight: true}
          ]}
          contentStyle={{alignItems: 'center'}}
        />
        <Card.Section
          bg-$backgroundElevated
          padding-20
          flex
          content={[{text: 'All site', text70: true, $textDefault: true}]}
          contentStyle={{alignItems: 'center', margin: 0, padding: 0}}
        />
      </Card>
    );
  };

  renderCoupons = () => {
    return (
      <View row spread marginB-10>
        {/* @ts-expect-error */}
        {this.renderCoupon({'marginR-10': true})}
        {/* @ts-expect-error */}
        {this.renderCoupon({'marginL-10': true})}
      </View>
    );
  };

  renderComplexImage = (cardProps: CardProps, image: React.ReactNode) => {
    return (
      <Card {...cardProps} flex marginV-10 onPress={() => {}} activeOpacity={1} activeScale={0.96}>
        {image}
        <Card.Section
          bg-$backgroundElevated
          padding-20
          content={[{text: 'All site', text70: true, $textDefault: true}]}
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
          // @ts-expect-error
          this.renderComplexImage({'marginR-5': true},
            <Card.Section
              flex
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
            />)
        }
        {
          // Image with overlay content
          // @ts-expect-error
          this.renderComplexImage({'marginL-5': true},
            <Card.Section
              flex
              imageSource={cardImage2}
              imageStyle={{height: '100%'}}
              content={[
                {text: 'Special sale!', text70: true, $textGeneral: true},
                {text: '10%', text60: true, $textGeneral: true}
              ]}
              contentStyle={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            />)
        }
      </View>
    );
  };

  renderNumbers = () => {
    return (
      <ScrollView style={{height: 100, marginBottom: 20}} horizontal showsHorizontalScrollIndicator={false}>
        {_.times(4, i => {
          return (
            <Card key={i} width={100} style={{marginRight: 20}}>
              <View padding-15>
                <Text text30 $textNeutral>
                  {i}
                </Text>
              </View>
            </Card>
          );
        })}
      </ScrollView>
    );
  };

  renderBackgroundCard = (cardProps: CardProps, body: React.ReactNode) => {
    return (
      <Card flex center height={80} {...cardProps}>
        {body}
      </Card>
    );
  };

  renderComplexExample = () => {
    return _.map(posts, (post, i) => {
      const statusColor = post.status === 'Published' ? Colors.$textSuccess : Colors.$textMajor;

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
            <Text text40 $textDefault>
              {post.title}
            </Text>
            <View row>
              <Text text90 color={statusColor}>
                {post.status}
              </Text>
              <Text text90 $textDefault> | {post.timestamp}</Text>
            </View>

            <Text text70 $textDefault>
              {post.description}
            </Text>

            <View>
              <Text text90 $textDisabled>
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
                <Button text90 link iconSource={shareIcon} label="Share"/>
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
        {this.renderImageOnBottom()}
        {this.renderComplexExample()}
      </>
    );
  };

  render() {
    return (
      <View>
        <ScrollView>
          <View flex padding-20>
            <Text h1 marginB-s4 $textDefault>Cards</Text>
            <Text h3 $textDefault>Selectable Cards</Text>
            {this.renderSelectableCards()}
            <Text h3 marginV-s5 $textDefault>
              Horizontal Cards
            </Text>
            {this.renderHorizontalCard(true, 0, true)}
            {this.renderHorizontalCard(true, 20, false)}
            {this.renderHorizontalCard(false, 0, false)}
            {this.renderHorizontalCard(false, 20, true)}
            <Text h3 marginV-s5 $textDefault>
              Card Sections
            </Text>
            {this.renderCoupons()}
            {this.renderComplexImages()}
            <Text h3 marginB-s4 $textDefault>
              Others
            </Text>
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
