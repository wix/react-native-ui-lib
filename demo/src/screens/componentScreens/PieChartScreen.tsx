import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {View, PieChart, Card, Text, Badge, PieChartSegmentProps, Colors} from 'react-native-ui-lib';

const SEGMENTS: PieChartSegmentProps[] = [
  {
    percentage: 60,
    color: Colors.blue30
  },
  {
    percentage: 20,
    color: Colors.red30
  },
  {
    percentage: 10,
    color: Colors.green30
  },
  {
    percentage: 10,
    color: Colors.purple30
  }
];

const MONOCHROME_SEGMENTS: PieChartSegmentProps[] = [
  {
    percentage: 60,
    color: Colors.blue70
  },
  {
    percentage: 20,
    color: Colors.blue50
  },
  {
    percentage: 10,
    color: Colors.blue30
  },
  {
    percentage: 10,
    color: Colors.blue10
  }
];

const PieChartScreen = () => {
  const renderSegmentLabel = (segment: PieChartSegmentProps, text: string) => {
    const {percentage, color} = segment;
    return (
      <View row gap-s1 marginB-s1>
        <Badge size={10} containerStyle={{justifyContent: 'center'}} backgroundColor={color}/>
        <View>
          <Text>{text}</Text>
          <Text marginL-s1>{percentage}%</Text>
        </View>
      </View>
    );
  };

  const renderPieChartCard = (heading: string, segments: PieChartSegmentProps[]) => {
    return (
      <View>
        <Text text50L marginB-s2>
          {heading}
        </Text>
        <Card row spread paddingL-s2 paddingR-s10 paddingV-s2>
          <View centerV>
            <PieChart segments={segments} size={150}/>
          </View>
          <View height={'100%'} gap-s1>
            {segments.map((segment, index) => renderSegmentLabel(segment, `Value ${index + 1}`))}
          </View>
        </Card>
      </View>
    );
  };

  return (
    <ScrollView>
      <View padding-page gap-s2>
        {renderPieChartCard('PieChart', SEGMENTS)}
        {renderPieChartCard('Monochrome colors', MONOCHROME_SEGMENTS)}
      </View>
    </ScrollView>
  );
};

export default PieChartScreen;

const styles = StyleSheet.create({});
