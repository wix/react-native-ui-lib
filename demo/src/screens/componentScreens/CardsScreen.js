import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import _ from 'lodash';
import {Assets, Constants, Card, Button, Colors, Typography, Text} from 'react-native-ui-lib';//eslint-disable-line
import posts from '../../data/posts';

const featureIcon = require('../../assets/icons/star.png');
const shareIcon = require('../../assets/icons/share.png');
const cardImage = require('../../assets/images/card-example.jpg');
const cardImage2 = require('../../assets/images/empty-state.jpg');

export default class ButtonsScreen extends Component {

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>

        <Card row height={160} containerStyle={{marginBottom: 15}} onPress={() => {}}>
          <Card.Image width={115} imageSource={cardImage}/>
          <Card.Section body>
            <Card.Section>
              <Text text70 dark10>You’re Invited!</Text>
            </Card.Section>
            <Card.Section>
              <Text text80 dark10>Join Old The Town Barbershop Official Store. Download the Wix app to...</Text>
            </Card.Section>
            <Card.Section footer>
              <Text text90 dark50>wix.to/A465c</Text>
            </Card.Section>
          </Card.Section>
        </Card>

        <Card shadowType="white10" row height={160} containerStyle={{marginBottom: 15}} onPress={() => {}}>
          <Card.Section body>
            <Card.Section>
              <Text text70 dark10>You’re Invited!</Text>
            </Card.Section>
            <Card.Section>
              <Text text80 dark10>Join Old The Town Barbershop Official Store. Download the Wix app to...</Text>
            </Card.Section>
            <Card.Section footer>
              <Text text90 dark50>wix.to/A465c</Text>
            </Card.Section>
          </Card.Section>
          <Card.Image width={115} imageSource={cardImage}/>
        </Card>

        <Card containerStyle={{marginBottom: 15}} onPress={() => {}}>
          <Card.Section body>
            <Card.Section>
              <Text text70 dark10>You’re Invited!</Text>
            </Card.Section>
            <Card.Section footer>
              <Text text90 dark50>join now</Text>
            </Card.Section>
          </Card.Section>
          <Card.Image height={120} imageSource={cardImage2}/>
        </Card>

        {_.map(posts, (post, i) => {
          const statusColor = post.status === 'Published' ? Colors.green30 : Colors.orange30;
          return (
            <Card key={i} containerStyle={{marginBottom: 15}} onPress={() => console.log('press on a card')}>
              <Card.Image height={160} imageSource={post.coverImage}/>
              <Card.Section body>
                <Card.Section>
                  <Text text40 color={Colors.dark10}>{post.title}</Text>
                </Card.Section>
                <Card.Section>
                  <Card.Item>
                    <Text text90 color={statusColor}>{post.status}</Text>
                    <Text text90> | {post.timestamp}</Text>
                  </Card.Item>
                </Card.Section>
                <Card.Section>
                  <Text text70 color={Colors.dark10}>{post.description}</Text>
                </Card.Section>
                <Card.Section footer>
                  <Text text90 color={Colors.dark50}>{post.likes} Likes</Text>
                  <Card.Item>
                    <Button containerStyle={{marginRight: 10}} text90 link iconSource={featureIcon} label="Feature"/>
                    <Button text90 link iconSource={shareIcon} label="Share"/>
                  </Card.Item>
                </Card.Section>
              </Card.Section>
            </Card>
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: Colors.white,
  },
});
