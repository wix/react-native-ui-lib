import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {PageControl, Colors, View, Button, Text} from 'react-native-ui-lib';
import {renderBooleanOption, renderSliderOption} from '../ExampleScreenPresenter';

const containerStyle = {
  marginBottom: 40
};

export default class PageControlScreen extends Component {
  state = {
    currentPage: 0,
    limitShownPages: false,
    numberOfPagesShown: 7
  };

  prevPage = () => {
    this.setState({currentPage: this.state.currentPage - 1});
  }

  nextPage = () => {
    this.setState({currentPage: this.state.currentPage + 1});
  }

  render() {
    const {currentPage, limitShownPages, numberOfPagesShown} = this.state;

    return (
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <PageControl containerStyle={containerStyle} numOfPages={2} currentPage={0}/>
        <PageControl containerStyle={containerStyle} numOfPages={5} currentPage={2}/>
        <PageControl containerStyle={containerStyle} numOfPages={3} currentPage={2} color={Colors.red40}/>
        <PageControl containerStyle={containerStyle} numOfPages={10} currentPage={4} color={Colors.purple40}/>
        <PageControl
          containerStyle={containerStyle}
          numOfPages={10}
          currentPage={5}
          color={Colors.violet40}
          size={20}
        />
        <PageControl
          containerStyle={containerStyle}
          numOfPages={10}
          currentPage={6}
          color={Colors.orange40}
          size={20}
        />
        <PageControl containerStyle={containerStyle} numOfPages={10} currentPage={6} inactiveColor={Colors.dark70}/>
        <PageControl
          containerStyle={containerStyle}
          numOfPages={10}
          currentPage={6}
          inactiveColor={Colors.dark70}
          enlargeActive
        />
        <PageControl
          containerStyle={containerStyle}
          numOfPages={10}
          currentPage={6}
          inactiveColor={Colors.dark70}
          enlargeActive
          spacing={10}
        />
        <View marginH-20 width={'100%'}>
          {renderBooleanOption.call(this, 'Limit number of pages shown in page control', 'limitShownPages')}
          {renderSliderOption.call(this, 'Number of pages shown', 'numberOfPagesShown', {
            min: 5,
            max: 10,
            step: 1,
            initial: 7
          })}

          <PageControl
            size={6}
            spacing={8}
            limitShownPages={limitShownPages}
            containerStyle={containerStyle}
            inactiveColor={Colors.dark60}
            color={Colors.dark20}
            numOfPages={numberOfPagesShown}
            currentPage={currentPage}
          />
          <View row flex spread centerV>
            <Button label={'Prev page'} onPress={this.prevPage} disabled={currentPage === 0}/>
            <Text>{currentPage}</Text>
            <Button label={'Next page'} onPress={this.nextPage} disabled={currentPage === numberOfPagesShown - 1}/>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 25
  }
});
