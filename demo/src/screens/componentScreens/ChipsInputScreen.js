import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {View, Colors, Text, Typography, ChipsInput} from 'react-native-ui-lib'; // eslint-disable-line


export default class ChipsInputScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chips: [{label: 'Falcon 9'}, {label: 'Enterprise'}, {label: 'Challenger'}, {label: 'Coca Cola', invalid: true}],
      tags: [{label: 'Amit'}, {label: 'Ethan', invalid: true}],
      tags2: ['Chips', 'Input'],
      tags3: ['Non', 'Removable', 'Tags'],
      tags4: ['Change', 'Typography']
    };
  }

  onTagPress = (tagIndex, markedTagIndex) => {
    this.customChipsInput.markTagIndex(tagIndex === markedTagIndex ? undefined : tagIndex);
  };

  renderCustomTag(tag, _, shouldMarkToRemove) {
    return (
      <View style={[styles.customTag, shouldMarkToRemove && {backgroundColor: Colors.purple70}]}>
        <Text white>{tag.label}</Text>
      </View>
    );
  }

  renderRightElement = () => {
    return (
      <View center height={40} marginR-s2 style={{alignItems: 'flex-start'}}>
        <Text grey30 text70M>
          To:
        </Text>
      </View>
    );
  };

  renderSearchTypeInput = () => {
    return (
      <>
        <Text marginB-10 text60>Search Type</Text>
        <View bg-grey60>
          <ChipsInput
            placeholder={'Enter Tags'}
            chipsProps={this.state.chips}
            leftElement={this.renderRightElement()}
            hideUnderline
            maxHeight={100}
          />
        </View>
      </>
    );
  };

  renderFormTypeInput = () => {
    return (
      <View marginT-40>
        <Text marginB-10 text60>Form Type</Text>
        <ChipsInput
          placeholder={'Enter Tags'}
          title={'Mendy'}
          chipsProps={this.state.chips}
          maxLength={4}
        />
      </View>
    );
  };

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="never">
        <View style={styles.container}>
          <Text text40 marginB-20>
            ChipsInput
          </Text>


          {this.renderSearchTypeInput()}

          {this.renderFormTypeInput()}

          <Text text50 marginV-20>Old Usage</Text>
          <ChipsInput
            containerStyle={{marginBottom: 25}}
            placeholder="Enter Tags"
            tags={this.state.tags}
            validationErrorMessage="error validation message"
          />

          <ChipsInput
            containerStyle={{marginBottom: 25}}
            placeholder="Editing disabled"
            tags={this.state.tags3}
            disableTagRemoval
            disableTagAdding
          />

          <ChipsInput
            ref={r => (this.customChipsInput = r)}
            containerStyle={{marginBottom: 25}}
            placeholder="With custom tags"
            tags={this.state.tags}
            renderTag={this.renderCustomTag}
            onCreateTag={value => ({label: value})}
            onTagPress={this.onTagPress}
            inputStyle={{...Typography.text60, color: Colors.blue30}}
          />

          <ChipsInput
            text60
            containerStyle={{marginBottom: 25}}
            placeholder="Enter Tags"
            tags={this.state.tags4}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  customTag: {
    backgroundColor: Colors.purple30,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 3,
    marginRight: 10,
    marginBottom: 10
  }
});
