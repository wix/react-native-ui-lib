import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Constants} from '../../helpers';
import {BaseComponent} from '../../commons';
import View from '../view';
import * as presenter from './CarouselPresenter';


/**
 * @description: Carousel for scrolling pages horizontally
 * @gif: https://media.giphy.com/media/l0HU7f8gjpRlMRhKw/giphy.gif, https://media.giphy.com/media/3oFzmcjX9OhpyckhcQ/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CarouselScreen.js
 * @extends: ScrollView
 * @extendsLink: https://facebook.github.io/react-native/docs/scrollview 
 * @notes: This is screed width Component
 */
export default class Carousel extends BaseComponent {
  static displayName = 'Carousel';
  
  static propTypes = {
    /**
     * the first page to start with
     */
    initialPage: PropTypes.number,
    /**
     * the page width (all pages should have the same width)
     */
    pageWidth: PropTypes.number,
    /**
     * if true, will have infinite scroll
     */
    loop: PropTypes.bool,
    /**
     * callback for when page has changed
     */
    onChangePage: PropTypes.func,
    /**
     * callback for onScroll event of the internal ScrollView
     */
    onScroll: PropTypes.func,
    /**
     * the carousel style
     */
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
  };

  static defaultProps = {
    initialPage: 0
  };

  constructor(props) {
    super(props);
    
    this.carousel = React.createRef();
    const defaultPageWidth = props.pageWidth || Constants.screenWidth;
    
    this.state = {
      currentPage: props.initialPage,
      currentStandingPage: props.initialPage,
      pageWidth: defaultPageWidth,
      initialOffset: {x: presenter.calcOffset(props, {currentPage: props.initialPage, pageWidth: defaultPageWidth})}
    };
  }

  componentDidMount() {
    Constants.addDimensionsEventListener(this.onOrientationChanged);
  }

  componentWillUnmount() {
    Constants.removeDimensionsEventListener(this.onOrientationChanged);
  }

  onOrientationChanged = () => {
    if (!this.props.pageWidth) {
      this.setState({pageWidth: Constants.screenWidth});
      this.goToPage(this.state.currentPage, true);
    }
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  updateOffset = (animated = false) => {
    const x = presenter.calcOffset(this.props, this.state);
    
    if (this.carousel) {
      this.carousel.current.scrollTo({x, animated});
      
      if (Constants.isAndroid) {
        // this is done to handle onMomentumScrollEnd not being called in Android:
        // https://github.com/facebook/react-native/issues/11693
        // https://github.com/facebook/react-native/issues/19246
        this.onMomentumScrollEnd();
      }
    }
  }

  goToPage(pageIndex, animated = true) {
    this.setState({currentPage: this.getCalcIndex(pageIndex)}, () => this.updateOffset(animated));
  }

  getCalcIndex(index) {
    // to handle scrollView index issue in Android's RTL layout
    if (Constants.isRTL && Constants.isAndroid) {
      const length = presenter.getChildrenLength(this.props) - 1;
      return length - index;
    }
    return index;
  }

  onContentSizeChange = () => {
    // this is to handle initial scroll position (content offset)
    if (Constants.isAndroid) {
      this.updateOffset();
    }
  }

  onMomentumScrollEnd = () => {
    // finished full page scroll
    const {currentStandingPage, currentPage} = this.state;
    const index = this.getCalcIndex(currentPage);
    this.setState({currentStandingPage: index});  
    if (currentStandingPage !== index) {
      _.invoke(this.props, 'onChangePage', index, currentStandingPage);
    }
  }

  onScroll = (event) => {
    if (!this.skippedInitialScroll) {
      this.skippedInitialScroll = true;
      return;
    }

    const {loop} = this.props;
    const {pageWidth} = this.state;
    const offsetX = event.nativeEvent.contentOffset.x;
    
    if (offsetX >= 0) {
      const newPage = presenter.calcPageIndex(offsetX, this.props, pageWidth);
      this.setState({currentPage: newPage});
    }

    if (loop && presenter.isOutOfBounds(offsetX, this.props, pageWidth)) {
      this.updateOffset();
    }
    
    _.invoke(this.props, 'onScroll', event);
  }

  renderChild = (child, key) => {
    return (
      <View style={{width: this.state.pageWidth}} key={key}>
        {child}
      </View>
    );
  }

  renderChildren() {
    const {children, loop} = this.props;
    const length = presenter.getChildrenLength(this.props);
    
    const childrenArray = React.Children.map(children, (child, index) => {
      return this.renderChild(child, `${index}`);
    });
    
    if (loop) {
      childrenArray.unshift(this.renderChild(children[length - 1], `${length - 1}-clone`));
      childrenArray.push(this.renderChild(children[0], `${0}-clone`));
    }
    
    return childrenArray;
  }

  render() {
    const {containerStyle, ...others} = this.props;
    const {initialOffset} = this.state;
    
    return (
      <ScrollView
        {...others}
        ref={this.carousel} 
        style={[containerStyle, {flexGrow: 1}]}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={this.onScroll}
        scrollEventThrottle={200}
        contentOffset={initialOffset}
        onContentSizeChange={this.onContentSizeChange}
        onMomentumScrollEnd={this.onMomentumScrollEnd}
      >
        {this.renderChildren()}
      </ScrollView>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    
  });
}
