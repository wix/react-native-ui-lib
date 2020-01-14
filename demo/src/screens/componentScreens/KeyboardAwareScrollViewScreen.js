import React, {Component} from 'react';
import {StyleSheet, TouchableHighlight, RecyclerViewBackedScrollView} from 'react-native';
import {
  Button,
  Colors,
  KeyboardAwareScrollView,
  KeyboardAwareListView,
  TextField,
  Typography,
  Text,
  View
} from 'react-native-ui-lib';

const LOREM_IPSUM =
  'Lorem ipsum dolor sit amet, ius ad pertinax oportere accommodare, an vix civibus corrumpit referrentur. Te nam case ludus inciderint, te mea facilisi adipiscing. Sea id integre luptatum. In tota sale consequuntur nec. Erat ocurreret mei ei. Eu paulo sapientem vulputate est, vel an accusam intellegam interesset. Nam eu stet pericula reprimique, ea vim illud modus, putant invidunt reprehendunt ne qui.';
const hashCode = function (str) {
  let hash = 15;
  for (let ii = str.length - 1; ii >= 0; ii--) {
    // eslint-disable-next-line no-bitwise
    hash = (hash << 5) - hash + str.charCodeAt(ii);
  }
  return hash;
};

export default class KeyboardAwareScrollViewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listToggle: false,
      data: {}
    };
  }

  _genRows(pressData) {
    const dataBlob = [];
    for (let ii = 0; ii < 10; ii++) {
      const pressedText = pressData[ii] ? ' (pressed)' : '';
      dataBlob.push('Row ' + ii + pressedText);
    }
    return dataBlob;
  }

  _renderRow(rowData, sectionID, rowID) {
    const rowHash = Math.abs(hashCode(rowData));
    return (
      <TouchableHighlight>
        <View>
          <View style={styles.row}>
            <Text style={styles.text}>{rowData + ' - ' + LOREM_IPSUM.substr(0, (rowHash % 301) + 10)}</Text>
          </View>
          <View style={{backgroundColor: Colors.white}}>
            <TextField style={[styles.text, {borderWidth: 0.5}]} placeholder={'Text goes here'}/>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  _renderBodyButton(bodyHeaderTitle) {
    return (

      <Button
        text80
        link
        label={bodyHeaderTitle}
        labelStyle={{color: Colors.black}}
        onPress={() => this.setState({listToggle: !this.state.listToggle})}
        style={styles.topButton}
      />
    );
  }

  _renderKeyboardAwareListView() {
    return (
      <View style={styles.container}>
        {this._renderBodyButton('Switch to ScrollView')}
        <KeyboardAwareListView
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="always"
          dataSource={this.state.data}
          renderRow={this._renderRow}
          renderScrollComponent={props => (
            <RecyclerViewBackedScrollView {...props} />
          )}
          renderSeparator={(sectionID, rowID) => (
            <View key={`${sectionID}-${rowID}`} style={styles.separator} />
          )}
        />
      </View>
    );
  }

  _renderKeyboardAwareScrollView() {
    return (
      <View style={styles.container}>
        <Text style={styles.mainTitle}>Example Form</Text>

        {this.state.listToggle && this._renderBodyButton('Switch to ListView')}
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
          <TextField
            style={styles.TextField}
            placeholder={'First Name'}
            ref={r => {
              this._firstNameTI = r;
            }}
            returnKeyType={'next'}
            onSubmitEditing={event => this._lastNameTI.focus()}
          />
          <TextField
            style={styles.TextField}
            placeholder={'Last Name'}
            ref={r => {
              this._lastNameTI = r;
            }}
            returnKeyType={'next'}
            onSubmitEditing={event => this._countryTI.focus()}
          />
          <TextField
            style={styles.TextField}
            placeholder={'Country'}
            ref={r => {
              this._countryTI = r;
            }}
            returnKeyType={'next'}
            onSubmitEditing={event => this._stateTI.focus()}
          />
          <TextField
            style={styles.TextField}
            placeholder={'State'}
            ref={r => {
              this._stateTI = r;
            }}
            returnKeyType={'next'}
            onSubmitEditing={event => this._addrTI.focus()}
          />
          <TextField
            style={styles.TextField}
            placeholder={'Address'}
            ref={r => {
              this._addrTI = r;
            }}
            returnKeyType={'next'}
            onSubmitEditing={event => this._emailTI.focus()}
          />
          <TextField
            style={styles.TextField}
            keyboardType="email-address"
            placeholder={'Email'}
            ref={r => {
              this._emailTI = r;
            }}
            returnKeyType={'next'}
            onSubmitEditing={event => this._msgTI.focus()}
          />
          <TextField
            style={styles.TextField}
            placeholder={'Message'}
            ref={r => {
              this._msgTI = r;
            }}
            returnKeyType={'next'}
            onSubmitEditing={event => this._notesTI.focus()}
          />
          <TextField
            style={styles.TextField}
            placeholder={'Notes'}
            ref={r => {
              this._notesTI = r;
            }}
            returnKeyType={'go'}
          />
        </KeyboardAwareScrollView>
      </View>
    );
  }

  render() {
    if (this.state.listToggle) {
      return this._renderKeyboardAwareListView();
    } else {
      return this._renderKeyboardAwareScrollView();
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  mainTitle: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center'
  },
  TextField: {
    ...Typography.text65
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
