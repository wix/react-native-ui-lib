import React from 'react';
import {ScrollView} from 'react-native';
import {View, PieChart, Card, Text, Badge, PieChartSegmentProps, Colors} from 'react-native-ui-lib';

const SEGMENTS: PieChartSegmentProps[] = [
  {
    percentage: 40,
    color: Colors.blue30
  },
  {
    percentage: 30,
    color: Colors.red30
  },
  {
    percentage: 20,
    color: Colors.green30
  },
  {
    percentage: 10,
    color: Colors.purple30
  }
];

const MONOCHROME_SEGMENTS: PieChartSegmentProps[] = [
  {
    percentage: 40,
    color: Colors.blue70
  },
  {
    percentage: 30,
    color: Colors.blue50
  },
  {
    percentage: 20,
    color: Colors.blue30
  },
  {
    percentage: 10,
    color: Colors.blue10
  }
];

const NOT_FULL_PIECHART: PieChartSegmentProps[] = [
  {
    percentage: 30,
    color: Colors.blue30
  },
  {
    percentage: 40,
    color: Colors.red30
  }
];

const PieChartScreen = () => {
  const renderSegmentLabel = (segment: PieChartSegmentProps, text: string) => {
    const {percentage, color} = segment;
    return (
      <View row gap-s1 marginB-s1 key={text}>
        <Badge size={10} containerStyle={{justifyContent: 'center'}} backgroundColor={color}/>
        <View>
          <Text>{text}</Text>
          <Text marginL-s1>{percentage}%</Text>
        </View>
      </View>
    );
  };

  const renderPieChartCard = (segments: PieChartSegmentProps[]) => {
    return (
      <Card row spread paddingL-s2 paddingR-s10 paddingV-s2>
        <View centerV>
          <PieChart segments={segments} diameter={150}/>
        </View>
        <View height={'100%'} gap-s1>
          {segments.map((segment, index) => renderSegmentLabel(segment, `Value ${index + 1}`))}
        </View>
      </Card>
    );
  };

  return (
    <ScrollView>
      <View padding-page gap-s2>
        <Text text50L marginB-s2>
          PieChart
        </Text>
        {renderPieChartCard(SEGMENTS)}
        <Text text50L marginV-s2>
          Monochrome colors
        </Text>
        {renderPieChartCard(MONOCHROME_SEGMENTS)}
        <Text text50L marginV-s2>
          Not Full PieChart
        </Text>
        {renderPieChartCard(NOT_FULL_PIECHART)}
      </View>
    </ScrollView>
  );
};

export default PieChartScreen;
