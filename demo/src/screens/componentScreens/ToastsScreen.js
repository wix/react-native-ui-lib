import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Assets, Colors, View, Button, Text, Image, TouchableOpacity, Toast} from 'react-native-ui-lib';


const colors = [Colors.green30, Colors.red30, Colors.violet30];
const shareIcon = require('../../assets/icons/share.png');
const plusIcon = require('../../assets/icons/plus.png');
const settingsIcon = require('../../assets/icons/settings.png');


export default class ToastsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showToast: false,
      showTopToast: false,
      showCustomToast: false,
      selectedColor: 'none',
      showLoader: false,
      showDismiss: false,
      showContent: false
    };
  }

  renderColors() {
    return (
      <View row>
        {_.map(['none', ...colors], (color, index) => {
          const isSelected = color === this.state.selectedColor;
          const backgroundColor = color === 'none' ? undefined : color;
          return (
            <TouchableOpacity key={color} onPress={() => this.setState({selectedColor: color})}>
              <View center style={[styles.color, {backgroundColor}, isSelected && styles.selected]}>
                {color === 'none' && <Image source={plusIcon} tintColor={Colors.black}/>}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  renderAboveToast = () => {
    if (this.state.showContent) {
      return (
        <View flex bottom right paddingB-50 paddingR-20 pointerEvents={'box-none'}>
          <Button iconSource={shareIcon} color={Colors.white} style={{height: 50, width: 50}}/>
        </View>
      );
    }
  };

  renderBelowToast = () => {
    if (this.state.showContent) {
      return (
        <View center bg-violet50 padding-8>
          <Text white text70>Objects may be closer than they appear</Text>
        </View>
      );
    }
  };

  renderCustomContent = () => {
    const {selectedColor} = this.state;
    const backgroundColor = selectedColor === 'none' ? undefined : selectedColor;

    return (
      <View flex padding-10 style={{backgroundColor}}>
        <Text white text60>
          This is a custom content
        </Text>
        <Text white>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book.
        </Text>
      </View>
    );
  };

  dismissTopToast = () => {
    this.setState({showTopToast: false});
  }

  dismissBottomToast = () => {
    this.setState({showToast: false});
  }

  dismissCustomToast = () => {
    this.setState({showCustomToast: false});
  }

  render() {
    const {showToast, showTopToast, showCustomToast, selectedColor, showLoader, showDismiss} = this.state;
    const backgroundColor = selectedColor === 'none' ? undefined : selectedColor;

    return (
      <View flex center bg-dark80 style={styles.container}>
        <Toast
          renderAttachment={this.renderBelowToast}
          visible={this.state.showTopToast}
          position={'top'}
          backgroundColor={backgroundColor}
          message="Toast with two lines of text. Toast with two lines of text"
          onDismiss={this.dismissTopToast}
          // autoDismiss={3000}
          showDismiss={showDismiss}
          action={{iconSource: Assets.icons.x, onPress: () => console.log('dismiss')}}
          showLoader={showLoader}
        />
        <Toast
          renderAttachment={this.renderAboveToast}
          visible={this.state.showToast}
          position={'bottom'}
          backgroundColor={backgroundColor}
          message="Toast with one line of text"
          icon={settingsIcon}
          onDismiss={this.dismissBottomToast}
          // autoDismiss={3000}
          showDismiss={showDismiss}
          action={{label: 'Undo', onPress: () => console.log('undo')}}
          showLoader={showLoader}
        />
        <Toast
          visible={this.state.showCustomToast}
          position={'bottom'}
          onDismiss={this.dismissCustomToast}
        >
          {this.renderCustomContent()}
        </Toast>

        <View center>
          <Text marginV-10 text60>
            Toggle Toast
          </Text>
          <View center row marginB-10>
            <Button
              outline
              size="medium"
              label="TOP"
              onPress={() => this.setState({showTopToast: !showTopToast})}
              marginR-10
            />
            <Button
              outline
              size="medium"
              label="BOTTOM"
              onPress={() => this.setState({showToast: !showToast, showCustomToast: false})}
              marginR-10
            />
            <Button
              outline
              size="medium"
              label="CUSTOM"
              onPress={() => this.setState({showCustomToast: !showCustomToast, showToast: false})}
            />
          </View>
          <Text marginV-10 text60>
            Toast Background Color
          </Text>
          {this.renderColors()}
          <View center row marginV-20>
            <Button
              outline
              size="medium"
              label="Show Loader"
              onPress={() => this.setState({showLoader: !showLoader, showDismiss: false})}
              marginR-10
            />
            <Button
              outline
              size="medium"
              label="Show Dismiss"
              onPress={() => this.setState({showLoader: false, showDismiss: !showDismiss})}
            />
          </View>
          <View center row marginV-20>
            <Button
              outline
              size="medium"
              label="Toggle content above bottom toast"
              onPress={() => this.setState({showContent: !this.state.showContent})}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  color: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 5
  },
  selected: {
    borderWidth: 2,
    borderColor: Colors.dark10
  }
});
