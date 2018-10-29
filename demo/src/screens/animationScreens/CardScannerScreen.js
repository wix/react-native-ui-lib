import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {View, Assets, Constants, Card, Button, Colors, Typography, Text, AnimatedScanner} from 'react-native-ui-lib';//eslint-disable-line
import posts from '../../data/posts';

const featureIcon = require('../../assets/icons/star.png');
const shareIcon = require('../../assets/icons/share.png');

export default class CardScannerScreen extends Component {

  constructor(props) {
    super(props);

    this.start = this.start.bind(this);
    this.reset = this.reset.bind(this);
    this.onBreak = this.onBreak.bind(this);

    this.state = {
      progress: 0,
      started: false,
      reset: false,
      isDone: false,
    };
  }

  onBreak({isDone, progress}) {
    if (!isDone) {
      this.start();
    } else {
      this.setState({
        isDone,
      });
    }
  }

  start() {
    const {progress} = this.state;
    this.setState({
      started: true,
      reset: false,
      progress: progress + 25,
    });
  }

  reset() {
    this.setState({
      started: false,
      progress: 0,
      reset: true,
      isDone: false,
    });
  }

  render() {
    const {reset} = this.state;
    const post = posts[0];
    const statusColor = post.status === 'Published' ? Colors.green30 : Colors.orange30;
    return (
      <View style={styles.container} useSafeArea>
        <View flex>

          <View paddingL-40 height={6} width={'100%'} bg-violet50 marginB-20>
            <AnimatedScanner backgroundColor={Colors.purple30} progress={98} duration={1600}/>
          </View>

          <Card containerStyle={{marginBottom: 15}} onPress={() => console.log('press on a card')}>
            <Card.Image height={115} imageSource={post.coverImage}/>
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
                  <Button style={{marginRight: 10}} text90 link iconSource={featureIcon} label="Feature"/>
                  <Button text90 link iconSource={shareIcon} label="Share"/>
                </Card.Item>
              </Card.Section>
            </Card.Section>
            <AnimatedScanner
              opacity={0.7}
              progress={this.state.progress}
              duration={reset ? 0 : 1500}
              onBreakpoint={this.onBreak}
            />
          </Card>

          {this.state.started && !this.state.isDone &&
          <Text text70 dark10 style={{alignSelf: 'center', marginTop: 20}}>
            Publishing Post...
          </Text>}

          {this.state.isDone &&
          <Text text70 dark10 style={{alignSelf: 'center', marginTop: 20}}>
            Done!
          </Text>}
        </View>

        <View row center>
          <Button size="medium" label="Reset" onPress={this.reset} disabled={!this.state.isDone}/>
          <Button marginL-10 size="medium" label="Publish" onPress={this.start} disabled={this.state.started}/>
        </View>

      </View>
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
