import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {View, Colors, Text, Typography, ChipsInput, ChipsInputChipProps} from 'react-native-ui-lib'; // eslint-disable-line

interface State {
  chips: Array<ChipsInputChipProps>;
  namesChips: Array<ChipsInputChipProps>;
  nonRemovalChips: Array<ChipsInputChipProps>;
  customChips: Array<string>;
  tags: Array<string | any>;
  tags2: Array<string>;
  tags3: Array<string>;
}

export default class ChipsInputScreen extends Component<{}, State> {
  // @ts-ignore
  customChipsInput = React.createRef<ChipsInput>();

  constructor(props: any) {
    super(props);

    this.state = {
      chips: [{label: 'Falcon 9'}, {label: 'Enterprise'}, {label: 'Challenger', borderRadius: 0}, {label: 'Coca Cola', invalid: true}],
      namesChips: [{label: 'Amit'}, {label: 'Ethan', invalid: true}],
      nonRemovalChips: [{label: 'Non'}, {label: 'Removable'}, {label: 'Tags'}],
      customChips: ['Chips', 'Input'],
      tags: [{label: 'Amit'}, {label: 'Ethan', invalid: true}],
      tags2: ['Non', 'Removable', 'Tags'],
      tags3: ['Change', 'Typography']
    };
  }

  onTagPress = (tagIndex: number, markedTagIndex: number) => {
    this.customChipsInput.current?.markTagIndex(tagIndex === markedTagIndex ? undefined : tagIndex);
  };

  renderCustomTag(tag: any, _: number, shouldMarkToRemove: boolean) {
    return (
      <View style={[styles.customTag, shouldMarkToRemove && {backgroundColor: Colors.purple70}]}>
        <Text white>{tag.label}</Text>
      </View>
    );
  }

  renderLeftElement = () => {
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
            chips={this.state.chips}
            leftElement={this.renderLeftElement()}
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
          chips={this.state.chips}
          maxLength={4}
        />
      </View>
    );
  };

  onCreateTag = (value: string) => {
    return {label: value};
  }

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="never">
        <View style={styles.container}>
          <Text text40 marginB-20>
            ChipsInput
          </Text>


          {this.renderSearchTypeInput()}

          {this.renderFormTypeInput()}

          <ChipsInput
            containerStyle={styles.bottomMargin}
            placeholder="Enter Tags"
            chips={this.state.namesChips}
            validationErrorMessage="error validation message"
          />

          <ChipsInput
            containerStyle={styles.bottomMargin}
            placeholder="Editing disabled"
            chips={this.state.nonRemovalChips}
            disableTagRemoval
            disableTagAdding
          />

          <Text text50 marginV-20>Old Usage</Text>
          <ChipsInput
            containerStyle={styles.bottomMargin}
            placeholder="Enter Tags"
            tags={this.state.tags}
            validationErrorMessage="error validation message"
          />
          
          <ChipsInput
            containerStyle={styles.bottomMargin}
            placeholder="Editing disabled"
            tags={this.state.tags2}
            disableTagRemoval
            disableTagAdding
          />
          <ChipsInput
            ref={this.customChipsInput}
            containerStyle={styles.bottomMargin}
            placeholder="With custom tags"
            tags={this.state.tags}
            renderTag={this.renderCustomTag}
            onCreateTag={this.onCreateTag}
            onTagPress={this.onTagPress}
            inputStyle={styles.customInput}
          />
          <ChipsInput 
            text60
            containerStyle={styles.bottomMargin}
            placeholder="Enter Tags"
            tags={this.state.tags3}
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
  customInput: {
    ...Typography.text60,
    color: Colors.blue30
  },
  bottomMargin: {
    marginBottom: 25
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
