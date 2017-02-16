import React, {Component} from 'react';
import {ScrollView, StyleSheet, Alert, Text} from 'react-native';
import {Constants, Button, Colors, Typography} from 'react-native-ui-lib';//eslint-disable-line

const ButtonSpace = 20;

export default class ButtonsScreen extends Component {

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>

        <Text style={styles.title}>Buttons</Text>

        <Text style={styles.header}>Do you have it in small?</Text>
        <Button
          label={'Default'}
          onPress={() => Alert.alert('Default Button #1')}
          containerStyle={{marginBottom: ButtonSpace}}
        />
        <Button
          label={'Medium'}
          size={Button.sizes.medium}
          onPress={() => Alert.alert('Medium Button #1')}
          containerStyle={{marginBottom: ButtonSpace}}
        />
        <Button
          label={'Small'}
          size={Button.sizes.small}
          onPress={() => Alert.alert('Small Button #1')}
          containerStyle={{marginBottom: ButtonSpace}}
        />
        <Button
          label={'This is a button with long text'}
          onPress={() => Alert.alert('Long Text #2')}
          containerStyle={{marginBottom: ButtonSpace}}
        />

        <Text style={styles.header}>Do you have it in red?</Text>
        <Button
          label={'Bold!'}
          onPress={() => Alert.alert('Button #3')}
          labelStyle={{fontWeight: '800'}}
          containerStyle={{marginBottom: ButtonSpace}}
        />
        <Button
          label={'Red Button'}
          onPress={() => Alert.alert('Button #3')}
          backgroundColor={Colors.red30}
          containerStyle={{marginBottom: ButtonSpace}}
        />
        <Button
          label={'With Shadow'}
          onPress={() => Alert.alert('Button #3')}
          enableShadow
          containerStyle={{marginBottom: ButtonSpace}}
        />
        
        <Text style={styles.header}>Inside Out</Text>
        <Button
          label="Outline"
          outline
          onPress={() => Alert.alert('Long Text #2')}
          containerStyle={{marginBottom: ButtonSpace}}
        />
        <Button
          label="Outline M"
          size={Button.sizes.medium}
          outline
          onPress={() => Alert.alert('Long Text #2')}
          containerStyle={{marginBottom: ButtonSpace}}
        />
        <Button
          label="Red Outline"
          outline
          outlineColor={Colors.red10}
          onPress={() => Alert.alert('Long Text #2')}
          containerStyle={{marginBottom: ButtonSpace}}
        />

        <Text style={styles.header}>Let your curves show</Text>
        {Constants.isIOS ? <Button
          label={'Squarish'}
          borderRadius="br10"
          onPress={() => Alert.alert('Button #3')}
          containerStyle={{marginBottom: ButtonSpace}}
        /> : <Button
          label={'Roundish'}
          borderRadius="br50"
          onPress={() => Alert.alert('Button #3')}
          containerStyle={{marginBottom: ButtonSpace}}
        />}
        <Button
          label={'Custom'}
          borderRadius={22}
          onPress={() => Alert.alert('Button #3')}
          containerStyle={{marginBottom: ButtonSpace}}
        />
        <Button
          label={'No Radius'}
          borderRadius={'br0'}
          onPress={() => Alert.alert('Button #3')}
          containerStyle={{marginBottom: ButtonSpace}}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 25,
  },
  title: {
    ...Typography.text20,
  },
  header: {
    ...Typography.text60,
    marginVertical: 20,
  },
});
