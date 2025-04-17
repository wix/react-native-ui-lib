import _ from 'lodash';
import {data} from './MockData';

const PAGE_SIZE = 400;
const FAKE_FETCH_TIME = 1500;

class MockServer {
  async getEvents(date: number): Promise<any[]> {
    return new Promise(resolve => {
      const eventIndexByDate = _.findIndex(data, event => {
        return event.start > date;
      });

      setTimeout(() => {
        const newEvents = _.slice(data, eventIndexByDate - PAGE_SIZE / 2, eventIndexByDate + PAGE_SIZE / 2);
        resolve(newEvents);
      }, FAKE_FETCH_TIME);
    });
  }
}

export default new MockServer();
