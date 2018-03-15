import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {PageControl, Colors, Constants} from 'react-native-ui-lib';//eslint-disable-line

const containerStyle = {
  marginBottom: 40,
};

export default class PageControlScreen extends Component {

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <PageControl containerStyle={containerStyle} numOfPages={2} currentPage={0}/>
        <PageControl containerStyle={containerStyle} numOfPages={5} currentPage={2}/>
        <PageControl containerStyle={containerStyle} numOfPages={3} currentPage={2} color={Colors.red40}/>
        <PageControl containerStyle={containerStyle} numOfPages={10} currentPage={4} color={Colors.purple40}/>
        <PageControl containerStyle={containerStyle} numOfPages={10} currentPage={5} color={Colors.violet40} size={20}/>
        <PageControl containerStyle={containerStyle} numOfPages={10} currentPage={6} color={Colors.orange40} size={20}/>
        <PageControl
          containerStyle={containerStyle} numOfPages={10} currentPage={6} inactiveColor={Colors.dark70}
        />
        <PageControl
          containerStyle={containerStyle} numOfPages={10} currentPage={6} inactiveColor={Colors.dark70}
          enlargeActive
        />
        <PageControl
          containerStyle={containerStyle} numOfPages={10} currentPage={6} inactiveColor={Colors.dark70} enlargeActive
          spacing={10}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 25,
  },
});
