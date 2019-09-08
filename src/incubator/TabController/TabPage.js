import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Reanimated from 'react-native-reanimated';
import TabBarContext from './TabBarContext';

const {Code, Value, cond, set, and, call, block, eq} = Reanimated;

/**
 * @description: TabController's TabPage
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/incubatorScreens/TabControllerScreen/index.js
 */
export default class TabPage extends PureComponent {
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
    lazy: PropTypes.bool
  };

  static defaultProps = {
    activeOpacity: 0.6
  };

  state = {
    loaded: !this.props.lazy
  };

  _opacity = new Value(0);
  _zIndex = new Value(0);
  _pageStyle = [styles.page, {opacity: this._opacity}, {zIndex: this._zIndex}];

  lazyLoad = () => {
    this.setState({
      loaded: true
    });
  };

  render() {
    const {currentPage} = this.context;
    const {index, lazy, testID} = this.props;
    const {loaded} = this.state;

    return (
      <Reanimated.View style={this._pageStyle} testID={testID}>
        {loaded && this.props.children}
        <Code>
          {() => {
            return block([
              cond(and(eq(currentPage, index), lazy, !loaded), call([], this.lazyLoad)),
              cond(eq(currentPage, index),
                [set(this._opacity, 1), set(this._zIndex, 1)],
                [set(this._opacity, 0), set(this._zIndex, 0)],)
            ]);
          }}
        </Code>
      </Reanimated.View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    ...StyleSheet.absoluteFillObject
  }
});
