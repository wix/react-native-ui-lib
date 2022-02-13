import React, {Component} from 'react';
import {View, Card, Button, Colors, Text, AnimatedScanner} from 'react-native-ui-lib'; //eslint-disable-line
import posts from '../../data/posts';


const featureIcon = require('../../assets/icons/star.png');
const shareIcon = require('../../assets/icons/share.png');

export default class CardScannerScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      started: false,
      reset: false,
      isDone: false
    };
  }

  onBreak = ({isDone}) => {
    if (!isDone) {
      this.start();
    } else {
      this.setState({isDone});
    }
  }

  start = () => {
    const {progress} = this.state;

    this.setState({
      started: true,
      reset: false,
      progress: progress + 25
    });
  }

  reset = () => {
    this.setState({
      started: false,
      progress: 0,
      reset: true,
      isDone: false
    });
  }

  render() {
    const {reset} = this.state;
    const post = posts[0];
    const statusColor = post.status === 'Published' ? Colors.green30 : Colors.orange30;

    return (
      <View flex useSafeArea>
        <View flex padding-20>
          <View paddingL-40 marginB-20>
            <AnimatedScanner
              backgroundColor={Colors.purple30}
              progress={98}
              duration={1600}
              containerStyle={{backgroundColor: Colors.violet50, height: 6}}
            />
          </View>

          <Card containerStyle={{marginBottom: 15}} onPress={() => console.log('press on a card')}>
            <Card.Image height={115} source={post.coverImage}/>
            <View padding-20>
              <Text text40 color={Colors.grey10}>
                {post.title}
              </Text>
              <Text text90> | {post.timestamp}</Text>
              <Text text90 color={statusColor}>
                {post.status}
              </Text>

              <Text text70 color={Colors.grey10}>
                {post.description}
              </Text>

              <Text text90 color={Colors.grey50}>
                {post.likes} Likes
              </Text>
              <View row spread>
                <Button style={{marginRight: 10}} text90 link iconSource={featureIcon} label="Feature"/>
                <Button text90 link iconSource={shareIcon} label="Share"/>
              </View>
            </View>

            <AnimatedScanner
              opacity={0.7}
              progress={this.state.progress}
              duration={reset ? 0 : 1500}
              onBreakpoint={this.onBreak}
            />
          </Card>

          {this.state.started && !this.state.isDone && (
            <Text text70 grey10 style={{alignSelf: 'center', marginTop: 20}}>
              Publishing Post...
            </Text>
          )}

          {this.state.isDone && (
            <Text text70 grey10 style={{alignSelf: 'center', marginTop: 20}}>
              Done!
            </Text>
          )}
        </View>

        <View row center padding-20>
          <Button size="medium" label="Reset" onPress={this.reset} disabled={!this.state.isDone}/>
          <Button marginL-10 size="medium" label="Publish" onPress={this.start} disabled={this.state.started}/>
        </View>
      </View>
    );
  }
}
