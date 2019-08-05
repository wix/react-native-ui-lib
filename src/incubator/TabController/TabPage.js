import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Reanimated from 'react-native-reanimated';
import TabBarContext from './TabBarContext';

const {cond, and, call, block, eq} = Reanimated;

/**
* @description: TabController's TabPage
* @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/incubatorScreens/TabControllerScreen/index.js
*/
export default class TabPage extends Component {
  static displayName = 'TabController.TabPage';

  static contextType = TabBarContext;

  static propTypes = {
    /**
     * The index of the the TabPage
     */
    index: PropTypes.number.isRequired,
    /**
     * Whether this page should be loaded lazily
     */
    lazy: PropTypes.bool,
  };

  static defaultProps = {
    activeOpacity: 0.6,
  };

  state = {
    loaded: !this.props.lazy,
  };

  lazyLoad = () => {
    this.setState({
      loaded: true,
    });
  };

  render() {
    const {currentPage} = this.context;
    const {index, lazy, testID} = this.props;
    const {loaded} = this.state;
    const opacity = block([
      cond(and(eq(currentPage, index), lazy, !loaded), call([], this.lazyLoad)),
      cond(eq(currentPage, index), 1, 0),
    ]);

    const zIndex = cond(eq(currentPage, index), 1, 0);

    return (
      <Reanimated.View style={[styles.page, {opacity}, {zIndex}]} testID={testID}>
        {loaded && this.props.children}
      </Reanimated.View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    ...StyleSheet.absoluteFillObject,
  },
});
