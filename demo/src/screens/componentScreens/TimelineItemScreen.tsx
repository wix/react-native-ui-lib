import React, {useCallback} from 'react';
import {ScrollView} from 'react-native';
import {Colors, TimelineItem, Card, Text} from 'react-native-ui-lib';

const TimelineItemScreen = () => {
  
  const renderContent = useCallback(() => {
    return (
      <Card flex style={{height: 200, backgroundColor: 'green'}}>
        <Text>This is content</Text>
      </Card>
    );
  }, []);

  return (
    <ScrollView>
      <TimelineItem state={TimelineItem.states.NEXT} renderContent={renderContent}/>
    </ScrollView>
  );
};

export default TimelineItemScreen;
