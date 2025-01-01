import _ from 'lodash';
import React, {Component} from 'react';
import {Incubator, View, Text, Card, Colors} from 'react-native-ui-lib';
import MockServer from './MockServer';

export default class CalendarScreen extends Component {
  pageIndex = 0;

  state = {
    date: new Date().getTime(),
    events: [] as any[],
    showLoader: false
  };

  componentDidMount(): void {
    this.loadEvents(this.state.date);
  }

  loadEvents = async (date: number) => {
    this.setState({showLoader: true});
    // const {events} = this.state;
    const newEvents = await MockServer.getEvents(date);
    this.pageIndex++;
    // this.setState({events: _.uniqBy([...events, ...newEvents], e => e.id), showLoader: false});
    this.setState({events: newEvents, showLoader: false});
  };

  onChangeDate = (date: number) => {
    console.log('Date change: ', date);
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
    const endTime = new Date(eventItem.end).toLocaleString('en-GB', {hour12: false, hour: '2-digit', minute: '2-digit'});
    return (
      <Card marginH-s5 marginB-s4 padding-s4 backgroundColor={Colors.yellow70}>
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
      <View paddingH-s5 centerV flex marginV-s5>
        <Text text70BO>{headerItem.header}</Text>
      </View>
    );
  };

  render() {
    const {date, events, showLoader} = this.state;

    return (
      <Incubator.Calendar data={events} initialDate={date} onChangeDate={this.onChangeDate} staticHeader>
        <Incubator.Calendar.Agenda
          renderEvent={this.renderEvent}
          renderHeader={this.renderHeader}
          // itemHeight={30}
          onEndReached={this.onEndReached}
          showLoader={showLoader}
        />
      </Incubator.Calendar>
    );
  }
}
