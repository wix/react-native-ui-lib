
import React from 'react';
import {StackAggregator, Text, View} from 'react-native-ui-lib';

const contents = [
  'CURRENT (default) state with dashed line.\nAligned to title',
  'SUCCESS state with label.',
  'ERROR state with icon.',
  'Custom color with icon and outline.\nAligned to title',
  'NEXT state with outline.',
  'NEXT state with circle point and entry point.'
];

const StackAggregatorWrapper = () => {
  const renderStackItem = (content: string, index: number) => {
    return (
      <View
        key={index} padding-12
        style={{justifyContent: 'center', alignItems: 'center', height: 100}}
        onPress={() => {
          console.log('onItemPress');
        }}
      >
        <Text>{content}</Text>
      </View>
    );
  };


  return (
    <StackAggregator
      containerStyle={{marginTop: 12}}
      contentContainerStyle={{width: '50%', margin: 'auto', height: 100}}
    >
      {contents.slice(0, 3).map((item, index) => {
        return renderStackItem(item, index);
      })}
    </StackAggregator>
  );
};

export default StackAggregatorWrapper;
