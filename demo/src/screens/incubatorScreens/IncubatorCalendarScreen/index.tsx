import _ from 'lodash';
import {StyleSheet} from 'react-native';
import React, {Component} from 'react';
import {Incubator, View, Text, Card, Colors} from 'react-native-ui-lib';
import MockServer from './MockServer';

export default class CalendarScreen extends Component {
  pageIndex = 0;
  loadingEventsPromise?: Promise<any[]>;

  state = {
    date: new Date(/* '2025-01-12' */).getTime(),
    events: [] as any[],
    showLoader: false
  };

  componentDidMount(): void {
    this.loadEvents(this.state.date);
  }

  // Note: we throttle event loading because initially the Agenda reach end and trigger extra event load
  loadEvents = (async (date: number) => {

    if (this.loadingEventsPromise) {
      return;
    }

    this.setState({showLoader: true});
    // const {events} = this.state;
    this.loadingEventsPromise = MockServer.getEvents(date);
    const newEvents = await this.loadingEventsPromise;
    this.loadingEventsPromise = undefined;
    this.pageIndex++;
    // this.setState({events: _.uniqBy([...events, ...newEvents], e => e.id), showLoader: false});
    this.setState({events: newEvents, showLoader: false});
  });

  onChangeDate = (date: number) => {
    /* console.log('Date change: ', date); */
    const {events} = this.state;
    if (date < events[0]?.start || date > _.last(events)?.start) {
      console.log('Load new events');
      this.loadEvents(date);
    }
  };

  onEndReached = (date: number) => {
    console.log('Reached End: ', date);
    this.loadEvents(date);
  };

  // TODO: Fix type once we export them
  renderEvent = (eventItem: any) => {
    const makeEventBigger = new Date(eventItem.start).getDay() % 2 === 0;
    const startTime = new Date(eventItem.start).toLocaleString('en-GB', {
      // month: 'short',
      // day: 'numeric',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
    const endTime = new Date(eventItem.end).toLocaleString('en-GB', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
    return (
      <Card marginH-s5 marginB-s4 padding-s4 backgroundColor={Colors.$backgroundGeneralLight}>
        <Text text70>Event Title</Text>
        {makeEventBigger && <Text>Event short description</Text>}
        <Text marginT-s1 text90>
          {startTime}-{endTime}
        </Text>
      </Card>
    );
  };

  // TODO: Fix type once we export them
  renderHeader = (headerItem: any) => {
    return (
      <View bg-$backgroundDefault paddingH-s5 centerV flex paddingV-s2 style={styles.sectionHeader}>
        <Text text70BO>
          {new Date(headerItem.date).toLocaleString('en-US', {weekday: 'long', day: 'numeric', month: 'short'})}
        </Text>
      </View>
    );
  };

  render() {
    const {date, events, showLoader} = this.state;

    return (
      <View flex>
        <Incubator.Calendar data={events} initialDate={date} onChangeDate={this.onChangeDate} staticHeader>
          <Incubator.Calendar.Agenda
            renderEvent={this.renderEvent}
            renderHeader={this.renderHeader}
            onEndReached={this.onEndReached}
            showLoader={showLoader}
          />
        </Incubator.Calendar>
        <Incubator.Toast visible={showLoader} message="Loading events..." preset="general"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionHeader: {
    opacity: 0.9
  }
});
