import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
  Colors,
  KeyboardAwareScrollView,
  KeyboardAwareFlatList,
  TextField,
  Text,
  Typography,
  View
} from 'react-native-ui-lib';
import {renderBooleanOption} from '../ExampleScreenPresenter';

const data = [
  {
    placeholder: 'First Name',
    ref: '_firstNameTI',
    nextRef: '_lastNameTI'
  },
  {
    placeholder: 'Last Name',
    ref: '_lastNameTI',
    nextRef: '_countryTI'
  },
  {
    placeholder: 'Country',
    ref: '_countryTI',
    nextRef: '_stateTI'
  },
  {
    placeholder: 'State',
    ref: '_stateTI',
    nextRef: '_addrTI'
  },
  {
    placeholder: 'Address',
    ref: '_addrTI',
    nextRef: '_emailTI'
  },
  {
    placeholder: 'Email',
    keyboardType: 'email-address',
    ref: '_emailTI',
    nextRef: '_msgTI'
  },
  {
    placeholder: 'Message',
    ref: '_msgTI',
    nextRef: '_notesTI'
  },
  {
    placeholder: 'Notes',
    ref: '_notesTI'
  }
];

export default class KeyboardAwareScrollViewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlatList: false
    };
  }

  renderItem = (data) => {
    const {isFlatList} = this.state;
    const item = isFlatList ? data.item : data;
    const {placeholder, ref, nextRef, keyboardType} = item;
    const returnKeyType = nextRef ? 'next' : 'go';
    const onSubmitEditing = nextRef ? () => this[nextRef].focus() : undefined;
    return (
      <TextField
        key={placeholder}
        text70R
        placeholder={placeholder}
        ref={(r) => {
          this[ref] = r;
        }}
        returnKeyType={returnKeyType}
        keyboardType={keyboardType}
        onSubmitEditing={onSubmitEditing}
      />
    );
  };

  keyExtractor = (item) => item.placeholder;

  renderKeyboardAwareFlatList() {
    return (
      <KeyboardAwareFlatList
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="always"
        data={data}
        contentContainerStyle={{paddingTop: 20}}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        getTextInputRefs={() => {
          return [
            this._firstNameTI,
            this._lastNameTI,
            this._countryTI,
            this._stateTI,
            this._addrTI,
            this._emailTI,
            this._msgTI,
            this._notesTI
          ];
        }}
      />
    );
  }

  renderKeyboardAwareScrollView() {
    return (
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="always"
        getTextInputRefs={() => {
          return [
            this._firstNameTI,
            this._lastNameTI,
            this._countryTI,
            this._stateTI,
            this._addrTI,
            this._emailTI,
            this._msgTI,
            this._notesTI
          ];
        }}
      >
        {_.map(data, (item) => this.renderItem(item))}
      </KeyboardAwareScrollView>
    );
  }

  render() {
    const {isFlatList} = this.state;
    const switchText = `${
      isFlatList ? 'KeyboardAwareFlatList' : 'KeyboardAwareScrollView'
    }`;
    return (
      <View style={styles.container}>
        <Text text65 marginB-20>
          KeyboardAware example form
        </Text>
        {renderBooleanOption.call(this, switchText, 'isFlatList')}
        <View height={40}/>
        {isFlatList
          ? this.renderKeyboardAwareFlatList()
          : this.renderKeyboardAwareScrollView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  TextField: {
    ...Typography.text70R
  },
  topButton: {
    width: '100%',
    marginBottom: 5,
    paddingVertical: 5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: Colors.white
  },
  separator: {
    height: 1,
    backgroundColor: Colors.black
  },
  thumb: {
    width: 64,
    height: 64
  },
  text: {
    flex: 1
  }
});
