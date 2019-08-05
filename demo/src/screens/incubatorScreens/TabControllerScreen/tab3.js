import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import _ from 'lodash';
import {Card, Avatar, View, Text, Image, Assets, Button} from 'react-native-ui-lib'; //eslint-disable-line

class Tab2 extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({loading: false});
    }, 1200);

    // this.slow();
  }

  slow(iterations = 10) {
    if (iterations === 0) {
      return;
    }

    setTimeout(() => {
      _.times(5000, () => {
        console.log('slow log');
      });

      this.slow(iterations - 1);
    }, 10);
  }

  render() {
    const {loading} = this.state;

    return (
      <ScrollView>
        <View flex padding-20>
          <Text text40>TAB 3</Text>

          {loading && (
            <Text marginT-20 text60>
              Loading...
            </Text>
          )}

          {!loading &&
            _.times(100, index => {
              return (
                <Card row centerV margin-20 padding-20 key={index} onPress={_.noop}>
                  <Avatar
                    size={50}
                    imageSource={{
                      uri: 'https://static.pexels.com/photos/60628/flower-garden-blue-sky-hokkaido-japan-60628.jpeg',
                    }}
                  />
                  <Text text40 marginL-20>{index}</Text>
                </Card>
              );
            })}
        </View>
      </ScrollView>
    );
  }
}

export default Tab2;
