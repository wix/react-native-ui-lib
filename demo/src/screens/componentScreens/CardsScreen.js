import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Constants, Colors, View, Card, Button, Text} from 'react-native-ui-lib'; //eslint-disable-line
import posts from '../../data/posts';


const featureIcon = require('../../assets/icons/star.png');
const shareIcon = require('../../assets/icons/share.png');
const cardImage = require('../../assets/images/card-example.jpg');
const cardImage2 = require('../../assets/images/empty-state.jpg');

export default class CardsScreen extends Component {
  
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View flex>
          <View style={{backgroundColor: 'red', width: 50, height: '100%', position: 'absolute', top: 0, left: 200, bottom: 0}}/>
          <ScrollView
            horizontal
            height={100}
            style={{marginBottom: 20, padding: 10}}
            showsHorizontalScrollIndicator={false}
          >
            {_.times(4, (i) => {
              return (
                <Card shadowType="white10" key={i} width={100} containerStyle={{marginRight: 20}}>
                  <View padding-15>
                    <Text text30 dark30>
                      {i}
                    </Text>
                  </View>
                </Card>
              );
            })}
          </ScrollView>

          <Card height={120} width={120} marginV-20>
            <Card.Image height={'100%'} imageSource={cardImage} />
          </Card>
          
          <Card
            marginB-20
            height={150}
            style={{backgroundColor: Colors.dark60}}
            containerStyle={{backgroundColor: 'transparent'}}
            shadowType="white10"
            shadowColor={Colors.purple10}
            enableShadow
          >
            <View flex padding-20>
              <Text text50 white>
                With custom shadow color (purple shadow)
              </Text>
            </View>
          </Card>

          <Card
            marginB-20
            height={80}
            style={{backgroundColor: Colors.rgba(Colors.dark60, 0.75)}}
          >
            <View flex padding-20>
              <Text text50 white>
                With opacity
              </Text>
            </View>
          </Card>

          {Constants.isIOS && <Card
            marginB-20
            height={80}
            shadowType="white10"
            shadowColor={Colors.purple10}
            enableBlur
            // onPress={() => {}} 
          >
            <View flex padding-20>
              <Text text50 dark20>
                With Blur effect (iOS only)
              </Text>
              <Text text80 dark20>
                Must pass style backgroundColor as rgba
              </Text>
            </View>
          </Card>}

          <Card row height={160} containerStyle={{marginBottom: 15}} onPress={() => {}} enableBlur>
            <Card.Image width={115} imageSource={cardImage} />
            <Card.Section body>
              <Card.Section>
                <Text text70 dark10>
                  You’re Invited!
                </Text>
              </Card.Section>
              <Card.Section>
                <Text text80 dark10>
                  Join Old The Town Barbershop Official Store. Download the Wix app to...
                </Text>
              </Card.Section>
              <Card.Section footer>
                <Text text90 dark50>
                  wix.to/A465c
                </Text>
              </Card.Section>
            </Card.Section>
          </Card>

          <Card shadowType="white10" row height={160} containerStyle={{marginBottom: 15}} onPress={() => {}} br10>
            <Card.Section body>
              <Card.Section>
                <Text text70 dark10>
                  You’re Invited!
                </Text>
              </Card.Section>
              <Card.Section>
                <Text text80 dark10>
                  Join Old The Town Barbershop Official Store. Download the Wix app to...
                </Text>
              </Card.Section>
              <Card.Section footer>
                <Text text90 dark50>
                  wix.to/A465c
                </Text>
              </Card.Section>
            </Card.Section>
            <Card.Image width={115} imageSource={cardImage} />
          </Card>

          <Card containerStyle={{marginBottom: 15}} onPress={() => {}}>
            <Card.Section body>
              <Card.Section>
                <Text text70 dark10>
                  You’re Invited!
                </Text>
              </Card.Section>
              <Card.Section footer>
                <Text text90 dark50>
                  join now
                </Text>
              </Card.Section>
            </Card.Section>
            <Card.Image height={120} imageSource={cardImage2} />
          </Card>

          {_.map(posts, (post, i) => {
            const statusColor = post.status === 'Published' ? Colors.green30 : Colors.orange30;
            return (
              <Card key={i} containerStyle={{marginBottom: 15}} onPress={() => console.log('press on a card')}>
                <Card.Image height={160} imageSource={post.coverImage} />
                <Card.Section body>
                  <Card.Section>
                    <Text text40 color={Colors.dark10}>
                      {post.title}
                    </Text>
                  </Card.Section>
                  <Card.Section>
                    <Card.Item>
                      <Text text90 color={statusColor}>
                        {post.status}
                      </Text>
                      <Text text90> | {post.timestamp}</Text>
                    </Card.Item>
                  </Card.Section>
                  <Card.Section>
                    <Text text70 color={Colors.dark10}>
                      {post.description}
                    </Text>
                  </Card.Section>
                  <Card.Section footer>
                    <Text text90 color={Colors.dark50}>
                      {post.likes} Likes
                    </Text>
                    <Card.Item>
                      <Button style={{marginRight: 10}} text90 link iconSource={featureIcon} label="Feature" />
                      <Button text90 link iconSource={shareIcon} label="Share" />
                    </Card.Item>
                  </Card.Section>
                </Card.Section>
              </Card>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: Colors.yellow80,
  },
});
