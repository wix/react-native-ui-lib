import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Reanimated from 'react-native-reanimated';
import _ from 'lodash';
import TabBarContext from './TabBarContext';
import {Constants} from '../../helpers';

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
    lazy: PropTypes.bool,
    /**
     * How long to wait till lazy load complete (good for showing loader screens)
     */
    lazyLoadTime: PropTypes.number,
    /**
     * Render a custom loading page when lazy loading
     */
    renderLoading: PropTypes.elementType
  };

  static defaultProps = {
    activeOpacity: 0.6,
    lazyLoadTime: 300,
    renderLoading: _.noop
  };

  state = {
    loaded: !this.props.lazy
  };

  _loaded = new Value(Number(!this.props.lazy));
  _opacity = new Value(0);
  _zIndex = new Value(0);
  _pageStyle = [
    {opacity: this._opacity},
    this.context.asCarousel ? styles.carouselPage : styles.page,
    {zIndex: this._zIndex}
  ];

  lazyLoad = () => {
    setTimeout(() => {
      this.setState({
        loaded: true
      });
    }, this.props.lazyLoadTime); // tab bar indicator transition time
  };

  renderCodeBlock = () => {
    const {currentPage} = this.context;
    const {index, lazy} = this.props;
    return block([
      cond(and(eq(currentPage, index), lazy, eq(this._loaded, 0)), [set(this._loaded, 1), call([], this.lazyLoad)]),
      cond(eq(currentPage, index),
        [set(this._opacity, 1), set(this._zIndex, 1)],
        [set(this._opacity, 0), set(this._zIndex, 0)])
    ]);
  };

  render() {
    const {renderLoading, testID} = this.props;
    const {loaded} = this.state;

    return (
      <Reanimated.View style={this._pageStyle} testID={testID}>
        {!loaded && renderLoading()}
        {loaded && this.props.children}
        <Code>
          {this.renderCodeBlock}
        </Code>
      </Reanimated.View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    ...StyleSheet.absoluteFillObject
  },
  carouselPage: {
    width: Constants.screenWidth,
    flex: 1,
    opacity: 1
  }
});
