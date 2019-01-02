import _ from 'lodash';
import React, {Component} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Constants, Assets, Colors, View, Button, Text, Image, TouchableOpacity, Toast} from 'react-native-ui-lib'; //eslint-disable-line


const colors = [Colors.green30, Colors.red30, Colors.violet30];

export default class ToastsScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showToast: false,
      showTopToast: false,
      showRelativeToast: false,
      selectedColor: 'none',
      showLoader: false,
      showDismiss: false,
    };
  }

  renderColors() {
    return (
      <View row>
        {_.map(['none', ...colors], (color) => {
          const isSelected = color === this.state.selectedColor;
          const backgroundColor = color === 'none' ? undefined : color;
          return (
            <TouchableOpacity key={color} onPress={() => this.setState({selectedColor: color})}>
              <View center style={[styles.color, {backgroundColor}, isSelected && styles.selected]}>
                {color === 'none' && <Image source={Assets.icons.x}/>}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  render() {
    const {showTopToast, showRelativeToast, showToast, selectedColor, showLoader, showDismiss} = this.state;
    const backgroundColor = selectedColor === 'none' ? undefined : selectedColor;
    const action = showLoader ? [{label: 'Undo', backgroundColor: Colors.red40, onPress: () => Alert.alert('undo')}] : [];
    
    return (
      <View flex center bg-dark80 style={styles.container}>
        <Toast
          visible={this.state.showTopToast}
          position={'top'}
          backgroundColor={backgroundColor}
          message='Toast with two lines of text. Toast with two lines of text'
          onDismiss={() => this.setState({showTopToast: false})}
          allowDismiss={showDismiss}
          actions={action}
        />

        <View style={{position: 'absolute', bottom: 100, width: Constants.screenWidth}}>
          <Toast
            visible={this.state.showRelativeToast}
            message='Toast can move content relative to it to the top'
            position='relative'
            centerMessage
            backgroundColor={Colors.red60}
            color={Colors.blue30}
            actions={[
              {
                label: 'No, close it',
                outline: true,
                outlineColor: Colors.blue30,
                color: Colors.blue30,
                onPress: () => this.setState({showRelativeToast: false}),
              },
              {label: 'Yes, close it', onPress: () => this.setState({showRelativeToast: false})},
            ]}
          />
        </View>

        <Toast
          visible={this.state.showToast}
          position={'bottom'}
          backgroundColor={backgroundColor}
          message='Toast with one line of text'
          icon={Assets.icons.check}
          onDismiss={() => this.setState({showToast: false})}
          allowDismiss={showDismiss}
          actions={action}
        />

        <View center>
          <Text marginV-10 text60>Toggle Toast</Text>
          <View center row marginB-10>
            <Button outline size='medium' label='TOP' onPress={() => this.setState({showTopToast: !showTopToast})}/>
            <Button 
              outline size='medium' label='RELATIVE' 
              onPress={() => this.setState({showRelativeToast: !showRelativeToast})} marginH-10
            />
            <Button outline size='medium' label='BOTTOM' onPress={() => this.setState({showToast: !showToast})}/>
          </View>
          <Text marginV-10 text60>Toast Background Color</Text>
          {this.renderColors()}
          <View center row marginV-20>
            <Button 
              outline size='medium' label='Show Action' 
              onPress={() => this.setState({showLoader: !showLoader, showDismiss: false})} marginR-10
            />
            <Button 
              outline size='medium' label='Show Dismiss' 
              onPress={() => this.setState({showLoader: false, showDismiss: !showDismiss})}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
  color: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 5,
  },
  selected: {
    borderWidth: 2,
    borderColor: Colors.grey10,
  },
});
