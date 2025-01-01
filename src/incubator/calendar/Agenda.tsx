import React, {useContext, useCallback, useRef} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {runOnJS, useAnimatedReaction, useSharedValue} from 'react-native-reanimated';
import {FlashListPackage} from 'optionalDeps';
import type {FlashList as FlashListType, ViewToken} from '@shopify/flash-list';
import {BorderRadiuses, Colors} from 'style';
import {useDidUpdate} from 'hooks';
import View from '../../components/view';
import Text from '../../components/text';
import {isSameDay, isSameMonth} from './helpers/DateUtils';
import {AgendaProps, InternalEvent, Event, DateSectionHeader, UpdateSource} from './types';
import CalendarContext from './CalendarContext';

const FlashList = FlashListPackage?.FlashList;

// TODO: Fix initial scrolling
function Agenda(props: AgendaProps) {
  // TODO: Consider removing itemHeight if it's not needed
  const {renderEvent, renderHeader, itemHeight, onEndReached, showLoader} = props;
  const {data, selectedDate, setDate, updateSource} = useContext(CalendarContext);
  const flashList = useRef<FlashListType<InternalEvent>>(null);
  const closestSectionHeader = useSharedValue<DateSectionHeader | null>(null);
  const scrolledByUser = useSharedValue<boolean>(false);
  const lastDateBeforeLoadingNewEvents = useRef<number>(0);

  /* const keyExtractor = useCallback((item: InternalEvent) => {
    return item.type === 'Event' ? item.id : item.header;
  }, []); */

  useDidUpdate(() => {
    const result = findClosestDateAfter(lastDateBeforeLoadingNewEvents.current);
    if (result?.index) {
      scrollToIndex(result?.index, false);
    }
  }, [data]);

  const _renderEvent = useCallback((eventItem: Event) => {
    if (renderEvent) {
      return (
        <View height={itemHeight} style={styles.eventContainer}>
          {renderEvent(eventItem)}
        </View>
      );
    }

    return (
      <View marginV-1 marginH-10 paddingH-10 height={itemHeight} centerV style={styles.event}>
        <Text>
          Item for
          {new Date(eventItem.start).toLocaleString('en-GB', {
            month: 'short',
            day: 'numeric',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
          })}
          -{new Date(eventItem.end).toLocaleString('en-GB', {hour12: false, hour: '2-digit', minute: '2-digit'})}
        </Text>
      </View>
    );
  },
  [renderEvent, itemHeight]);

  const _renderHeader = useCallback((headerItem: DateSectionHeader) => {
    if (renderHeader) {
      return <View height={itemHeight}>{renderHeader(headerItem)}</View>;
    }

    return (
      <View bottom marginB-5 marginH-20 height={itemHeight}>
        <Text>{headerItem.header}</Text>
      </View>
    );
  },
  [renderHeader, itemHeight]);

  const renderItem = useCallback(({item}: {item: InternalEvent; index: number}) => {
    switch (item.type) {
      case 'Event':
        return _renderEvent(item);
      case 'Header':
        return _renderHeader(item);
    }
  },
  [_renderEvent, _renderHeader]);

  const getItemType = useCallback((item: any) => item.type, []);

  const findClosestDateAfter = useCallback((selected: number) => {
    'worklet';
    for (let index = 0; index < data.length; ++index) {
      const item = data[index];
      if (item.type === 'Header') {
        if (item.date >= selected) {
          return {dateSectionHeader: item, index};
        }
      }
    }

    return null;
  },
  [data]);

  const scrollToIndex = useCallback((index: number, animated: boolean) => {
    flashList.current?.scrollToIndex({index, animated});
  }, []);

  useAnimatedReaction(() => {
    return selectedDate.value;
  },
  (selected: number, previous: number | null) => {
    if (updateSource.value !== UpdateSource.AGENDA_SCROLL) {
      if (
        selected !== previous &&
          (closestSectionHeader.value?.date === undefined || !isSameDay(selected, closestSectionHeader.value?.date))
      ) {
        const result = findClosestDateAfter(selected);
        if (result !== null) {
          const {dateSectionHeader, index} = result;
          closestSectionHeader.value = dateSectionHeader;
          scrolledByUser.value = false;
          // TODO: Can the animation be improved (not in JS)?
          if (previous) {
            const _isSameMonth = isSameMonth(selected, previous);
            runOnJS(scrollToIndex)(index, _isSameMonth);
          }
        }
      }
    }
  },
  [findClosestDateAfter]);

  // TODO: look at https://docs.swmansion.com/react-native-reanimated/docs/api/hooks/useAnimatedScrollHandler
  const onViewableItemsChanged = useCallback(({viewableItems}: {viewableItems: ViewToken[]}) => {
    if (scrolledByUser.value) {
      const result = viewableItems.find(item => item.item.type === 'Header');
      if (result) {
        const {item}: {item: DateSectionHeader} = result;
        if (closestSectionHeader.value?.date !== item.date) {
          closestSectionHeader.value = item;
          setDate(item.date, UpdateSource.AGENDA_SCROLL);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMomentumScrollBegin = useCallback(() => {
    scrolledByUser.value = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onScrollBeginDrag = useCallback(() => {
    scrolledByUser.value = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _onEndReached = useCallback(() => {
    lastDateBeforeLoadingNewEvents.current = selectedDate.value;
    onEndReached?.(selectedDate.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onEndReached]);

  return (
    <View flex>
      <FlashList
        ref={flashList}
        estimatedItemSize={52}
        data={data}
        // TODO: Not sure we need key extractor in flash list
        // keyExtractor={keyExtractor}
        renderItem={renderItem}
        getItemType={getItemType}
        onViewableItemsChanged={onViewableItemsChanged}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onScrollBeginDrag={onScrollBeginDrag}
        initialScrollIndex={findClosestDateAfter(selectedDate.value)?.index ?? 0}
        onEndReached={_onEndReached}
      />
      {showLoader && (
        <View absF center style={{backgroundColor: Colors.rgba(Colors.grey10, 0.2)}}>
          <ActivityIndicator/>
        </View>
      )}
    </View>
  );
}

export default Agenda;

const styles = StyleSheet.create({
  eventContainer: {
    overflow: 'hidden'
  },
  event: {
    borderWidth: 1,
    borderRadius: BorderRadiuses.br20
  }
});
