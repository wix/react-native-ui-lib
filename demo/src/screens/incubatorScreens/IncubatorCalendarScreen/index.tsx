import _ from 'lodash';
import React, {Component} from 'react';
import {Incubator, View, Text} from 'react-native-ui-lib';
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
    return (
      <View marginH-10 padding-5 bg-blue70>
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
  };

  // TODO: Fix type once we export them
  renderHeader = (headerItem: any) => {
    return (
      <View centerV flex marginL-5>
        <Text>{headerItem.header}</Text>
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
