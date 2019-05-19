import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet} from 'react-native';
import {Constants} from '../../helpers';
import {BaseComponent} from '../../commons';
import * as presenter from './CarouselPresenter';


/**
 * @description: Carousel for scrolling pages horizontally
 * @gif: https://media.giphy.com/media/l0HU7f8gjpRlMRhKw/giphy.gif, https://media.giphy.com/media/3oFzmcjX9OhpyckhcQ/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CarouselScreen.js
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
    initialPage: 0,
    pageWidth: Constants.screenWidth
  };

  constructor(props) {
    super(props);
    
    this.state = {
      currentPage: props.initialPage,
      currentStandingPage: props.initialPage,
      initialOffset: {x: presenter.calcOffset(props, {currentPage: props.initialPage})}
    };
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  get pageWidth() {
    return Math.floor(this.props.pageWidth);
  }

  updateOffset = (animated = false) => {
    const x = presenter.calcOffset(this.props, this.state);
    
    if (this.carousel) {
      this.carousel.scrollTo({x, animated});
      if (Constants.isAndroid) {
        // this is done to handle onMomentumScrollEnd not being called in Android:
        // https://github.com/facebook/react-native/issues/11693
        // https://github.com/facebook/react-native/issues/19246
        const {currentStandingPage, currentPage} = this.state;
        if (currentStandingPage !== currentPage) {
          _.invoke(this.props, 'onChangePage', currentPage, currentStandingPage);
        }
      }
    }
  }

  goToPage(pageIndex, animated = true) {
    this.setState({currentPage: pageIndex}, () => this.updateOffset(animated));
  }

  onContentSizeChange = () => {
    if (Constants.isAndroid) {
      this.updateOffset();
    }
  }

  // finished full page scroll
  onMomentumScrollEnd = () => {
    const {currentStandingPage, currentPage} = this.state;
    this.setState({currentStandingPage: currentPage});  
    if (currentStandingPage !== currentPage) {
      _.invoke(this.props, 'onChangePage', currentPage, currentStandingPage);
    }
  }

  onScroll = (event) => {
    if (!this.skippedInitialScroll) {
      this.skippedInitialScroll = true;
      return;
    }

    const {loop} = this.props;
    const offsetX = presenter.getDirectionOffset(event.nativeEvent.contentOffset.x, this.props);
    
    if (offsetX >= 0) {
      const newPage = presenter.calcPageIndex(offsetX, this.props);

      this.setState({currentPage: newPage});
    }

    if (loop && presenter.isOutOfBounds(offsetX, this.props)) {
      this.updateOffset();
    }
    
    _.invoke(this.props, 'onScroll', event);
  }

  cloneChild(child) {
    if (!child.key) {
      return child;
    }
    
    return React.cloneElement(child, {
      key: `${child.key}-clone`,
    });
  }

  renderChildren() {
    const {children, loop} = this.props;
    const length = presenter.getChildrenLength(this.props);
    const childrenArray = React.Children.toArray(children);
    
    if (loop) {
      childrenArray.unshift(this.cloneChild(children[length - 1]));
      childrenArray.push(this.cloneChild(children[0]));
    }
    return childrenArray;
  }

  render() {
    const {containerStyle, ...others} = this.props;
    const {initialOffset} = this.state;
    
    return (
      <ScrollView
        {...others}
        ref={(r) => { this.carousel = r; }} 
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
