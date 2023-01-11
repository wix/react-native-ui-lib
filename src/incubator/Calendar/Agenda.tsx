import React, {useContext, useCallback, useRef} from 'react';
import {runOnJS, useAnimatedReaction, useSharedValue} from 'react-native-reanimated';
import {FlashList} from '@shopify/flash-list';
import View from '../../components/view';
import Text from '../..//components/text';
import {HOUR_TO_MS} from './helpers/DateUtils';
import {BorderRadiuses} from 'style';
import CalendarContext from './CalendarContext';
import {InternalEvent, Event, DateSectionHeader, AgendaProps} from './types';

function Agenda(props: AgendaProps) {
  const {data, selectedDate} = useContext(CalendarContext);
  const flashList = useRef<FlashList<InternalEvent>>(null);
  const closestDate = useSharedValue<number | null>(null);

  const keyExtractor = useCallback((item: InternalEvent) => {
    return item.type === 'Event' ? item.id : item.header;
  }, []);

  const renderEvent = useCallback((item: Event) => {
    return (
      <View
        marginV-1
        marginH-10
        paddingH-10
        height={(50 * (item.end - item.start)) / HOUR_TO_MS}
        style={{borderWidth: 1, borderRadius: BorderRadiuses.br20, justifyContent: 'center'}}
      >
        <Text style={{}}>
          Item for{' '}
          {new Date(item.start).toLocaleString('en-GB', {
            month: 'short',
            day: 'numeric',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
          })}
          -{new Date(item.end).toLocaleString('en-GB', {hour12: false, hour: '2-digit', minute: '2-digit'})}
        </Text>
      </View>
    );
  }, []);

  const renderHeader = useCallback((item: DateSectionHeader) => {
    return (
      <View margin-5 marginT-15>
        <Text>{item.header}</Text>
      </View>
    );
  }, []);

  const renderItem = useCallback(({item, index}: {item: InternalEvent; index: number}) => {
    switch (item.type) {
      case 'Event':
        return renderEvent(item);
      case 'Header':
        return renderHeader(item);
    }
  },
  [renderEvent, renderHeader]);

  const getItemType = useCallback(item => item.type, []);

  const findClosestDateAfter = useCallback((selected: number) => {
    'worklet';
    for (let index = 0; index < data.length; ++index) {
      const item = data[index];
      if (item.type === 'Header') {
        if (item.date >= selected) {
          return {date: item.date, index};
        }
      }
    }

    return null;
  },
  [data]);

  const scrollToIndex = useCallback((index: number, isInitial: boolean) => {
    if (isInitial) {
      setTimeout(() => {
        flashList.current?.scrollToIndex({index, animated: true});
      }, 500); // TODO: Might need longer timeout (or a configuration for this)
    } else {
      flashList.current?.scrollToIndex({index, animated: true});
    }
  }, []);

  useAnimatedReaction(() => {
    return selectedDate.value;
  },
  (selected, previous) => {
    if (selected !== previous && selected !== closestDate.value) {
      const result = findClosestDateAfter(selected);
      if (result !== null) {
        const {date, index} = result;
        closestDate.value = date;
        runOnJS(scrollToIndex)(index, !previous);
      }
    }
  },
  [findClosestDateAfter]);

  return (
    <FlashList
      ref={flashList}
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      getItemType={getItemType}
    />
  );
}

export default Agenda;
