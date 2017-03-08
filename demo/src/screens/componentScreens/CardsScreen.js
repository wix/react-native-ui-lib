import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import _ from 'lodash';
import {Assets, Constants, Card, Button, Colors, Typography, Text} from 'react-native-ui-lib';//eslint-disable-line
import posts from '../../data/posts';

const featureIcon = require('../../assets/icons/star.png');

export default class ButtonsScreen extends Component {

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {_.map(posts, (post, i) => {
          const statusColor = post.status === 'Published' ? Colors.green30 : Colors.orange30;
          return (
            <Card key={i} containerStyle={{marginBottom: 15}}>
              <Card.Image imageSource={post.coverImage}/>
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
                    <Button text90 link iconSource={featureIcon} label="Share"/>
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
    backgroundColor: Colors.dark80,
    flex: 1,
  },
});
