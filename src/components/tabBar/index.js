import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, ViewPropTypes, Animated, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../style';
import {BaseComponent} from '../../commons';
import View from '../view';
import TabBarItem from './TabBarItem';


const LAYOUT_MODES = {
  FIT: 'FIT',
  SCROLL: 'SCROLL',
};
const gradientWidth = 36;

/**
 * @description: Basic TabBar component
 * @gif: https://media.giphy.com/media/3o751YHFZVlv3Ay4k8/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabBarScreen.js
 */
export default class TabBar extends BaseComponent {
  static displayName = 'TabBar';
  static propTypes = {
    ...ViewPropTypes.height,
    /**
     * current selected tab index
     */
    selectedIndex: PropTypes.number,
    /**
     * custom style for the tab bar
     */
    style: ViewPropTypes.style,
    /**
     * custom style for the selected indicator
     */
    indicatorStyle: ViewPropTypes.style,
    /**
     * disable the animated transition of the tab indicator
     */
    disableAnimatedTransition: PropTypes.bool,
    /**
     * callback for when index has change
     */
    onChangeIndex: PropTypes.func,
    /**
     * FIT to force the content to fit to screen, or SCROLL to allow content overflow
     */
    layoutMode: PropTypes.oneOf(Object.keys(LAYOUT_MODES)),
    /**
     * Add gradiant effect for scroll overflow. IMPORTANT: must have a native module available!
     */
    useGradientFinish: PropTypes.bool,
  };

  static defaultProps = {
    mode: LAYOUT_MODES.FIT,
    selectedIndex: 0,
    height: 51,
    useGradientFinish: false,
  };

  static modes = LAYOUT_MODES;

  constructor(props) {
    super(props);

    this.widthsArray = {};
    this.contentWidth = undefined;
    this.containerWidth = undefined;
    this.childrenCount = React.Children.count(this.props.children);

    this.state = {
      selectedIndex: props.selectedIndex,
      selectedIndicatorPosition: new Animated.Value(0),
      gradientValue: new Animated.Value(1),
      fadeAnim: 0,
      currentMode: props.mode,
      widths: {},
    };
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  // Indicator

  hasMeasurements() {
    return _.keys(this.widthsArray).length === this.childrenCount;
  }

  updateSelectedIndicatorPosition = () => {
    if (this.hasMeasurements()) {
      this.setState({selectedIndicatorPosition: new Animated.Value(this.calcPosition(this.state.selectedIndex, this.childrenCount))});
    }
  }

  calcIndicatorWidth() {    
    if (this.childrenCount === 0) {
      return '0%';
    }
    const itemWidth = this.state.widths[this.state.selectedIndex];
    const width = (itemWidth / this.contentWidth) * 100;
    return `${width}%`;
  }

  calcPosition(index, tabsCount) {
    let position = 0;
    if (!_.isEmpty(this.state.widths)) {
      let itemPosition = 0;
      for (let i = 0; i < index; i++) {
        itemPosition += this.state.widths[i];
      }
      position = (itemPosition / this.contentWidth) * 100;
    } else {
      position = index * (100 / tabsCount);
    }
    return position;
  }

  onSelectingTab(index) {
    const {disableAnimatedTransition} = this.props;
    const {selectedIndicatorPosition} = this.state;

    const newPosition = this.calcPosition(index, this.props.children.length);

    if (disableAnimatedTransition) {
      selectedIndicatorPosition.setValue(newPosition);
    } else {
      Animated.spring(selectedIndicatorPosition, {
        toValue: newPosition,
        tension: 30,
        friction: 8,
      }).start();
    }

    this.setState({
      selectedIndex: index,
    });

    _.invoke(this.props, 'onChangeIndex', index);
  }

  // Renders

  renderChildren() {
    const {selectedIndex} = this.state;
    const children = React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, {
        selected: selectedIndex === index,
        width: this.state.widths[index] || child.props.width, // HACK: keep initial width for indicator width
        onPress: () => {
          this.onSelectingTab(index);
          _.invoke(child.props, 'onPress');
        },
        onLayout: (event) => {
          const {width} = event.nativeEvent.layout;
          if (_.isUndefined(this.state.widths[index])) {
            this.widthsArray[index] = width;
            this.setState({widths: this.widthsArray});
            this.updateSelectedIndicatorPosition();
          }
        },
      });
    });
    return children;
  }

  renderSelectedIndicator() {
    const {indicatorStyle} = this.props;
    const {selectedIndicatorPosition} = this.state;
    const width = this.calcIndicatorWidth();
    const left = selectedIndicatorPosition.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%'],
    });
    return (
      <Animated.View
        style={[this.styles.selectedIndicator, this.styles.absoluteContainer, {left, width}, indicatorStyle]}
      />
    );
  }

  renderBar() {
    const {height, style} = this.props;
    return (
      <View style={[this.styles.container, style]} bg-white row height={height} onLayout={this.onLayout} useSafeArea>
        {this.renderChildren()}
        {(Object.keys(this.state.widths).length === this.childrenCount) && this.renderSelectedIndicator()}
      </View>
    );
  }

  renderScrollBar() {
    const {height, style, useGradientFinish} = this.props;
    const gradientColor = style['backgroundColor'] || Colors.white;
    const sizeStyle = _.pick(style, ['width']);
    const otherStyle = _.omit(style, ['width','height']);

    return (
      <View row style={{opacity: this.state.fadeAnim, height}} useSafeArea>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          onLayout={this.onLayout}
          onContentSizeChange={this.onContentSizeChange}
          onScroll={this.onScroll}
          style={sizeStyle}
        >
          <View style={[this.styles.container, otherStyle]} bg-white row>
            {this.renderChildren()}
            {(Object.keys(this.state.widths).length === this.childrenCount) && this.renderSelectedIndicator()}
          </View>
        </ScrollView>
        {useGradientFinish && <Animated.View
          pointerEvents="none"
          style={{
            width: gradientWidth,
            height: height - 2,
            position: 'absolute',
            left: this.containerWidth - gradientWidth,
            opacity: this.state.gradientValue}}
        >
          <LinearGradient
            start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 0.0}}
            locations={[0, 0.2, 0.6]}
            colors={[Colors.rgba(gradientColor, 0.3), Colors.rgba(gradientColor, 0.5), Colors.rgba(gradientColor, 0.7)]}
            style={this.styles.linearGradient}
          />
        </Animated.View>
        }
      </View>
    );
  }

  render() {
    switch (this.state.currentMode) {
      case LAYOUT_MODES.FIT:
        return (
          this.renderBar()
        );
      case LAYOUT_MODES.SCROLL:
        return (
          this.renderScrollBar()
        );
      default: break;
    }
  }

  // render events

  onLayout = (event) => {
    this.containerWidth = event.nativeEvent.layout.width;
    switch (this.state.currentMode) {
      case LAYOUT_MODES.FIT:
        this.contentWidth = this.containerWidth;
        break;
      case LAYOUT_MODES.SCROLL:
        if (this.contentWidth) {
          this.calcLayoutMode();
        }
        break;
      default: break;
    }
  }

  onContentSizeChange = (width) => {
    this.contentWidth = width;

    if (this.containerWidth) {
      this.calcLayoutMode();
    }
  }

  calcLayoutMode() {
    if (this.contentWidth < this.containerWidth) {
      this.widthsArray = {};
      this.setState({currentMode: LAYOUT_MODES.FIT, widths: {}});
    } else {
      this.updateSelectedIndicatorPosition();
      this.setState({fadeAnim: 1});
    }
  }

  onScroll = (event) => {
    const x = event.nativeEvent.contentOffset.x;
    const overflow = this.contentWidth - this.containerWidth;
    
    const newValue = (x > 0 && x >= overflow - 1) ? 0 : 1;

    Animated.spring(this.state.gradientValue, {
      toValue: newValue,
      speed: 20,
    }).start();
  }
}

function createStyles() {
  return StyleSheet.create({
    container: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: Colors.dark70,
    },
    selectedIndicator: {
      borderBottomWidth: 1.5,
      borderColor: Colors.blue30,
    },
    absoluteContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
    },
    linearGradient: {
      flex: 1,
    },
  });
}

TabBar.Item = TabBarItem;
