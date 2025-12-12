import React, {Component} from 'react';
import {Alert, Animated, ScrollView} from 'react-native';
import {View, Text, Colors} from 'react-native-ui-lib';

class TextScreen extends Component {
  private toggle = false;
  private animatedValue = new Animated.Value(0);

  animate = () => {
    this.toggle = !this.toggle;
    Animated.timing(this.animatedValue, {
      toValue: Number(this.toggle),
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  renderDivider() {
    return <View height={2} bg-grey60/>;
  }

  render() {
    return (
      <ScrollView>
        <View>
          <View padding-20>
            <Text text40 marginB-20>
              Text
            </Text>
            <Text text60M marginB-10>
              Modifiers
            </Text>
            <Text text70>
              Use your color (red30, blue20, grey40...) or typography (text40, text70M, text70BO, text100L...) presets
              directly as modifiers
            </Text>
            <View row marginT-20>
              <Text text60>text60</Text>
              <Text red20>red20</Text>
              <Text blue30 text60BO>
                blue bold text
              </Text>
              <Text text40L purple30>
                BIG TITLE
              </Text>
            </View>
            <View row>
              <Text flex bg-red30>flex</Text>
              <Text flex-2 bg-yellow30>flex-2</Text>
              <Text flex-3 bg-green30>flex-3</Text>
            </View>
          </View>

          {this.renderDivider()}

          <View padding-20>
            <Text text60M marginB-10>
              Transformations
            </Text>
            <Text center text70 marginB-10>
              Center Text
            </Text>
            <Text uppercase text70>
              uppercase
            </Text>
            <Text underline text70>
              underline
            </Text>
          </View>
          {this.renderDivider()}

          <View padding-20>
            <Text text60M marginB-10>
              Highlight String
            </Text>
            <Text text60R highlightString={'da'}>
              Dancing in The Dark
            </Text>
            <Text text60R highlightString={'the'} highlightStyle={{color: Colors.yellow30}}>
              Dancing in The Dark
            </Text>
            <Text text50R highlightString={'danc'} highlightStyle={{fontWeight: '200', color: Colors.grey20}}>
              Dancing in The Dark
            </Text>
            <Text text60R highlightString={['dancing', 'da']} highlightStyle={{color: Colors.green30}}>
              Dancing in The Dark
            </Text>
            <Text
              text60R
              highlightString={{
                string: 'Dancing',
                onPress: () => Alert.alert('Dancing is pressed!'),
                style: {color: Colors.blue10, backgroundColor: Colors.green50}
              }}
              highlightStyle={{color: Colors.green30}}
            >
              Dancing in The Dark
            </Text>
            <Text
              text60R
              highlightString={[
                {
                  string: 'Dancing',
                  onPress: () => Alert.alert('Dancing is pressed!'),
                  style: {color: Colors.blue10, backgroundColor: Colors.green50}
                },
                {
                  string: 'laugh',
                  onPress: () => Alert.alert('laugh is pressed!'),
                  style: {color: Colors.red50, textDecorationLine: 'underline', textDecorationColor: Colors.blue30}
                },
                {
                  string: 'more',
                  onPress: () => Alert.alert('more is pressed!')
                }
              ]}
              highlightStyle={{color: Colors.green30}}
            >
              Dancing in The Dark, laughing drinking and more
            </Text>
          </View>
          {this.renderDivider()}
          <View padding-20 centerH>
            <Text
              text70
              animated
              style={{transform: [{scale: this.animatedValue.interpolate({inputRange: [0, 1], outputRange: [1, 2]})}]}}
              onPress={this.animate}
            >
              Animated Text (press)
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default TextScreen;
