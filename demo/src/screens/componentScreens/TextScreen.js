import React, {Component} from 'react';
import {View, Text, Colors} from 'react-native-ui-lib';

class TextScreen extends Component {
  state = {};

  renderDivider() {
    return <View height={2} bg-grey60/>;
  }
  render() {
    return (
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
        </View>
        {this.renderDivider()}
      </View>
    );
  }
}

export default TextScreen;
