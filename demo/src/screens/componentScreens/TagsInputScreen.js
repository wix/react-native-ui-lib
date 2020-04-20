import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {View, Colors, Text, Typography, TagsInput} from 'react-native-ui-lib'; // eslint-disable-line


export default class TagsInputScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [{label: 'Amit'}, {label: 'Ethan', invalid: true}],
      tags2: ['Tags', 'Input'],
      tags3: ['Non', 'Removable', 'Tags']
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
      <ScrollView keyboardShouldPersistTaps="never">
        <View style={styles.container}>
          <Text text40 marginB-20>
            TagsInput
          </Text>

          <TagsInput containerStyle={{marginBottom: 25}} placeholder="Enter Tags" tags={this.state.tags2}/>

          <TagsInput containerStyle={{marginBottom: 25}} placeholder="Enter Tags" tags={this.state.tags}
                     onTagNotValidate="error validation message" />

          <TagsInput
            containerStyle={{marginBottom: 25}}
            placeholder="Editing disabled"
            tags={this.state.tags3}
            disableTagRemoval
            disableTagAdding
          />

          <TagsInput
            ref={r => (this.customTagsInput = r)}
            containerStyle={{marginBottom: 25}}
            placeholder="With custom tags"
            tags={this.state.tags}
            renderTag={this.renderCustomTag}
            onCreateTag={value => ({label: value})}
            onTagPress={this.onTagPress}
            inputStyle={{...Typography.text60, color: Colors.blue30}}
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
