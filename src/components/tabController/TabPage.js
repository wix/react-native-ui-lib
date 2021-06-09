import _pt from "prop-types";
import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import Reanimated from 'react-native-reanimated';
import _ from 'lodash';
import TabBarContext from "./TabBarContext";
import { Constants } from "../../helpers";
const {
  Code,
  Value,
  cond,
  set,
  and,
  call,
  block,
  eq
} = Reanimated;

/**
 * @description: TabController's TabPage
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx
 */
export default class TabPage extends PureComponent {
  static propTypes = {
    /**
       * The index of the the TabPage
       */
    index: _pt.number.isRequired,

    /**
       * Whether this page should be loaded lazily
       */
    lazy: _pt.bool,

    /**
       * How long to wait till lazy load complete (good for showing loader screens)
       */
    lazyLoadTime: _pt.number,

    /**
       * Render a custom loading page when lazy loading
       */
    renderLoading: _pt.func,

    /**
       * Used as a testing identifier
       */
    testID: _pt.string
  };
  static displayName = 'TabController.TabPage';
  static contextType = TabBarContext;
  static defaultProps = {
    lazy: false,
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
  _pageStyle = [{
    opacity: this._opacity
  }, this.context.asCarousel ? styles.carouselPage : styles.page, this.context.asCarousel ? {
    width: this.context.containerWidth
  } : undefined, {
    zIndex: this._zIndex
  }];
  lazyLoad = () => {
    setTimeout(() => {
      this.setState({
        loaded: true
      });
    }, this.props.lazyLoadTime); // tab bar indicator transition time
  };
  renderCodeBlock = _.memoize(() => {
    const {
      targetPage
    } = this.context;
    const {
      index,
      lazy
    } = this.props;
    return <Code>
        {() => block([cond(and(eq(targetPage, index), Number(lazy), eq(this._loaded, 0)), [set(this._loaded, 1), call([], this.lazyLoad)]), cond(eq(targetPage, index), [set(this._opacity, 1), set(this._zIndex, 1)], [set(this._opacity, 0), set(this._zIndex, 0)])])}
      </Code>;
  });

  render() {
    const {
      renderLoading,
      testID
    } = this.props;
    const {
      loaded
    } = this.state;
    return <Reanimated.View style={this._pageStyle} testID={testID}>
        {!loaded && renderLoading?.()}
        {loaded && this.props.children}
        {this.renderCodeBlock()}
      </Reanimated.View>;
  }

}
const styles = StyleSheet.create({
  page: { ...StyleSheet.absoluteFillObject
  },
  carouselPage: {
    width: Constants.screenWidth,
    flex: 1,
    opacity: 1
  }
});