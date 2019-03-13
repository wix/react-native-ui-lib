import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Constants, Colors, View, Card, Button, Text, Image} from 'react-native-ui-lib'; //eslint-disable-line
import posts from '../../data/posts';

const featureIcon = require('../../assets/icons/star.png');
const shareIcon = require('../../assets/icons/share.png');
const cardImage = require('../../assets/images/card-example.jpg');
const cardImage2 = require('../../assets/images/empty-state.jpg');

export default class CardsScreen extends Component {
  state = {
    selected1: true,
    selected2: true,
  };

  render() {
    const {selected1, selected2} = this.state;
    return (
      <View>
        <Image
          style={StyleSheet.absoluteFillObject}
          source={{
            uri:
              'https://images.pexels.com/photos/1005644/pexels-photo-1005644.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          }}
        />

        <ScrollView>
          <View flex padding-20>
            <ScrollView
              horizontal
              height={100}
              style={{overflow: 'visible'}}
              contentContainerStyle={{padding: 5}}
              showsHorizontalScrollIndicator={false}
            >
              {_.times(4, i => {
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

            <View row>
              <Card
                height={120}
                flex
                marginV-20
                selected={selected1}
                onPress={() => this.setState({selected1: !selected1})}
                activeOpacity={1}
                marginR-20
              >
                <Card.Image height={'100%'} imageSource={cardImage} />
              </Card>
              <Card
                height={120}
                flex
                marginV-20
                selected={selected2}
                onPress={() => this.setState({selected2: !selected2})}
                activeOpacity={1}
                selectionOptions={{
                  color: Colors.dark10,
                  indicatorSize: 25,
                  borderWidth: 3,
                }}
              >
                <Card.Image height={'100%'} imageSource={cardImage} />
              </Card>
            </View>

            <View row>
              <Card flex center marginB-20 height={80} style={{backgroundColor: Colors.dark60}} marginR-20>
                <Text text80 center white>
                  With custom background color
                </Text>
              </Card>
              <Card flex center marginB-20 height={80} style={{backgroundColor: Colors.rgba(Colors.dark60, 0.75)}}>
                <Text text70 center white>
                  With opacity
                </Text>
              </Card>

              {Constants.isIOS && (
                <Card
                  flex
                  center
                  marginL-20
                  marginB-20
                  height={80}
                  enableBlur
                  // onPress={() => {}}
                >
                  <Text text70 dark20 center>
                    With Blur effect
                  </Text>
                  <Text text80 dark20 center>
                    (iOS only)
                  </Text>
                </Card>
              )}
            </View>

            <Card row height={160} style={{marginBottom: 15}} onPress={() => {}} enableBlur>
              <Card.Image width={115} imageSource={cardImage} />
              <View padding-20 flex>
                <Text text70 dark10>
                  You’re Invited!
                </Text>
                <Text text80 dark10>
                  222 Join Old The Town Barbershop Official Store. Download the Wix app to...
                </Text>

                <Text text90 dark50>
                  wix.to/A465c
                </Text>
              </View>
            </Card>

            <Card row height={160} style={{marginBottom: 15}} onPress={() => {}} br10>
              <View padding-20 flex>
                <Text text70 dark10>
                  You’re Invited!
                </Text>

                <Text text80 dark10>
                  Join Old The Town Barbershop Official Store. Download the Wix app to...
                </Text>

                <Text text90 dark50>
                  wix.to/A465c
                </Text>
              </View>
              <Card.Image width={115} imageSource={cardImage} />
            </Card>

            <Card style={{marginBottom: 15}} onPress={() => {}}>
              <View padding-20>
                <Text text70 dark10>
                  You’re Invited!
                </Text>

                <Text text90 dark50>
                  join now
                </Text>
              </View>
              <Card.Image height={120} imageSource={cardImage2} />
            </Card>

            {_.map(posts, (post, i) => {
              const statusColor = post.status === 'Published' ? Colors.green30 : Colors.orange30;
              return (
                <Card key={i} style={{marginBottom: 15}} onPress={() => console.log('press on a card')}>
                  <Card.Image height={160} imageSource={post.coverImage} />

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
                        <Button style={{marginRight: 10}} text90 link iconSource={featureIcon} label="Feature" />
                        <Button text90 link iconSource={shareIcon} label="Share" />
                      </View>
                    </View>
                  </View>
                </Card>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}
