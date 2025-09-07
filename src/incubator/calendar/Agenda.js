import React, { useContext, useCallback, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { runOnJS, useAnimatedReaction, useSharedValue } from 'react-native-reanimated';
import { FlashListPackage } from "../../optionalDependencies";
import { BorderRadiuses, Colors } from "../../style";
import { useDidUpdate } from "../../hooks";
import View from "../../components/view";
import Text from "../../components/text";
import { isSameDay, isSameMonth } from "./helpers/DateUtils";
import { UpdateSource } from "./types";
import CalendarContext from "./CalendarContext";
const FlashList = FlashListPackage?.FlashList;
function Agenda(props) {
  const {
    renderEvent,
    renderHeader,
    onEndReached,
    showLoader
  } = props;
  const {
    data,
    selectedDate,
    setDate,
    updateSource
  } = useContext(CalendarContext);
  const flashList = useRef(null);
  const closestSectionHeader = useSharedValue(null);
  const scrolledByUser = useSharedValue(false);
  const [stickyHeaderIndices, setStickyHeaderIndices] = useState([]);
  const lastDateBeforeLoadingNewEvents = useSharedValue(selectedDate.value);

  /* const keyExtractor = useCallback((item: InternalEvent) => {
    return item.type === 'Event' ? item.id : item.header;
  }, []); */

  useDidUpdate(() => {
    const result = findClosestDateAfter(lastDateBeforeLoadingNewEvents.value);
    if (result?.index) {
      setTimeout(() => scrollToIndex(result?.index, false), 200);
    }
    const headerIndices = data.map((e, index) => e.type === 'Header' ? index : undefined).filter(i => i !== undefined);
    // @ts-expect-error
    setStickyHeaderIndices(headerIndices);
  }, [data]);
  const _renderEvent = useCallback(eventItem => {
    if (renderEvent) {
      return <View style={styles.eventContainer}>{renderEvent(eventItem)}</View>;
    }
    return <View marginV-1 marginH-10 paddingH-10 centerV style={styles.event}>
        <Text>
          Item for
          {new Date(eventItem.start).toLocaleString('en-GB', {
          month: 'short',
          day: 'numeric',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit'
        })}
          -{new Date(eventItem.end).toLocaleString('en-GB', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit'
        })}
        </Text>
      </View>;
  }, [renderEvent]);
  const _renderHeader = useCallback(headerItem => {
    if (renderHeader) {
      return <View>{renderHeader(headerItem)}</View>;
    }
    return <View bg-$backgroundDefault bottom marginB-5 marginH-20>
        <Text>{headerItem.header}</Text>
      </View>;
  }, [renderHeader]);
  const renderItem = useCallback(({
    item
  }) => {
    switch (item.type) {
      case 'Event':
        return _renderEvent(item);
      case 'Header':
        return _renderHeader(item);
    }
  }, [_renderEvent, _renderHeader]);
  const getItemType = useCallback(item => item.type, []);
  const findClosestDateAfter = useCallback(selected => {
    'worklet';

    for (let index = 0; index < data.length; ++index) {
      const item = data[index];
      if (item.type === 'Header') {
        if (item.date >= selected) {
          return {
            dateSectionHeader: item,
            index
          };
        }
      }
    }
    return null;
  }, [data]);
  const scrollToIndex = useCallback((index, animated) => {
    flashList.current?.scrollToIndex({
      index,
      animated
    });
  }, []);
  useAnimatedReaction(() => {
    return selectedDate.value;
  }, (selected, previous) => {
    if (updateSource.value !== UpdateSource.AGENDA_SCROLL) {
      if (selected !== previous && (closestSectionHeader.value?.date === undefined || !isSameDay(selected, closestSectionHeader.value?.date))) {
        const result = findClosestDateAfter(selected);
        if (result !== null) {
          const {
            dateSectionHeader,
            index
          } = result;
          closestSectionHeader.value = dateSectionHeader;
          scrolledByUser.value = false;
          // TODO: Can the animation be improved (not in JS)?
          if (previous) {
            const _isSameMonth = isSameMonth(selected, previous);
            runOnJS(scrollToIndex)(index, _isSameMonth);
          }
        } else {
          // Note: We got here because we are missing future agenda events to scroll to.
          // therefor we should expect and new events data load
          lastDateBeforeLoadingNewEvents.value = selectedDate.value;
        }
      }
    }
  }, [findClosestDateAfter]);

  // TODO: look at https://docs.swmansion.com/react-native-reanimated/docs/api/hooks/useAnimatedScrollHandler
  const onViewableItemsChanged = useCallback(({
    viewableItems
  }) => {
    if (scrolledByUser.value) {
      const result = viewableItems.find(item => item.item.type === 'Header');
      if (result) {
        const {
          item
        } = result;
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
    lastDateBeforeLoadingNewEvents.value = selectedDate.value;
    onEndReached?.(selectedDate.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onEndReached]);
  return <View flex>
      <FlashList ref={flashList} estimatedItemSize={52} data={data}
    // TODO: Not sure we need key extractor in flash list
    // keyExtractor={keyExtractor}
    renderItem={renderItem} getItemType={getItemType} stickyHeaderIndices={stickyHeaderIndices} onViewableItemsChanged={onViewableItemsChanged} onMomentumScrollBegin={onMomentumScrollBegin} onScrollBeginDrag={onScrollBeginDrag} initialScrollIndex={findClosestDateAfter(selectedDate.value)?.index ?? 0} onEndReached={_onEndReached} />
      {showLoader && <View absF center style={{
      backgroundColor: Colors.rgba(Colors.grey10, 0.2)
    }}>
          <ActivityIndicator />
        </View>}
    </View>;
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