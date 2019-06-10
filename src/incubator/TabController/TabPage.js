import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Reanimated from 'react-native-reanimated';
import TabBarContext from './TabBarContext';

const {cond, and, call, block, eq} = Reanimated;

export default class TabPage extends Component {
  static contextType = TabBarContext;
  static propTypes = {
    index: PropTypes.number.isRequired,
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
    const {index, lazy} = this.props;
    const {loaded} = this.state;
    const opacity = block([
      cond(and(eq(currentPage, index), lazy, !loaded), call([], this.lazyLoad)),
      cond(eq(currentPage, index), 1, 0),
    ]);

    const zIndex = cond(eq(currentPage, index), 1, 0);

    return <Reanimated.View style={[styles.page, {opacity}, {zIndex}]}>{loaded && this.props.children}</Reanimated.View>;
  }
}

const styles = StyleSheet.create({
  page: {
    ...StyleSheet.absoluteFillObject,
  }
});
