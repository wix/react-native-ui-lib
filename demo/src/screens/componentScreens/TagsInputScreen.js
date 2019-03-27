import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {View, Colors, Text, Stepper, Typography, Avatar, Assets, TagsInput} from 'react-native-ui-lib'; //eslint-disable-line
import contacts from '../../data/conversations';

const filters = [
  {label: 'All', value: 0},
  {label: 'Draft', value: 1},
  {label: 'Published', value: 2},
  {label: 'Scheduled', value: 3},
];

export default class TagsInputScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemsCount: 1,
      // language: {value: 'java', label: 'Java'},
      language: undefined,
      languages: [],
      filter: filters[0],
      contact: contacts[0],
      tags: [{label: 'Amit'}, {label: 'Ethan'}],
      tags2: ['Tags', 'Input'],
      tags3: ['Non', 'Removable', 'Tags'],
    };
  }

  onTagPress = (tagIndex, markedTagIndex) => {
    this.customTagsInput.markTagIndex(tagIndex === markedTagIndex ? undefined : tagIndex);
  };

  renderCustomTag(tag, index, shouldMarkToRemove) {
    return (
      <View style={[styles.customTag, shouldMarkToRemove && {backgroundColor: Colors.purple70}]}>
        <Text white>{tag.label}</Text>
      </View>
    );
  }

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.container}>
          <Text text40 marginB-20>
            TagsInput
          </Text>

          <TagsInput containerStyle={{marginBottom: 20}} placeholder="Enter Tags" tags={this.state.tags2} />

          <TagsInput
            containerStyle={{marginBottom: 20}}
            placeholder="with disableTagAdding disableTagRemoval"
            tags={this.state.tags3}
            disableTagRemoval
            disableTagAdding
          />

          <TagsInput
            ref={r => (this.customTagsInput = r)}
            containerStyle={{marginBottom: 20}}
            placeholder="With custom tags"
            tags={this.state.tags}
            renderTag={this.renderCustomTag}
            onCreateTag={value => ({label: value})}
            onTagPress={this.onTagPress}
            inputStyle={{...Typography.text60, color: Colors.blue30}}
          />

          <Text style={{...Typography.text60}}>Stepper</Text>
          <Stepper
            label={this.state.itemsCount === 1 ? 'Item' : 'Items'}
            min={1}
            max={5}
            onValueChange={count => this.setState({itemsCount: count})}
            initialValue={1}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  customTag: {
    backgroundColor: Colors.purple30,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 3,
    marginRight: 10,
    marginBottom: 10,
  },
});
