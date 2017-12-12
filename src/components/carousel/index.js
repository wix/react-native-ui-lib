import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet} from 'react-native';
import _ from 'lodash';
import {BaseComponent} from '../../commons';
import View from '../view';
import {Constants} from '../../helpers';
import * as presenter from './CarouselPresenter';

/**
 * @description: Carousel for scrolling pages horizontally
 */
export default class Carousel extends BaseComponent {
  static displayName = 'Carousel';
  static propTypes = {
    /**
     * this first page to start with
     */
    initialPage: PropTypes.number,
    /**
     * the page width (all pages should have the same page)
     */
    pageWidth: PropTypes.number,
    /**
     * callback for when page has changed
     */
    onChangePage: PropTypes.func,
    /**
     * callback for onScroll event of the internall ScrollView
     */
    onScroll: PropTypes.func,
    /**
     * the carousel style
     */
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
  };

  static defaultProps = {
    initialPage: 0,
    pageWidth: Constants.screenWidth,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPage: props.initialPage,
      currentStandingPage: props.initialPage,
    };

    this.onScroll = this.onScroll.bind(this);
    this.updateOffset = this.updateOffset.bind(this);
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  onScroll(event) {
    const {loop} = this.props;
    const offsetX = event.nativeEvent.contentOffset.x;
    if (offsetX >= 0) {
      const {currentStandingPage} = this.state;
      const newPage = presenter.calcPageIndex(offsetX, this.props);

      this.setState({currentPage: newPage});

      // finished full page scroll
      if (offsetX % this.props.pageWidth === 0) {
        this.setState({currentStandingPage: newPage});
        if (currentStandingPage !== newPage) {
          _.invoke(this.props, 'onChangePage', newPage, currentStandingPage);
        }
      }
          }

      if (loop && presenter.isOutOfBounds(offsetX, this.props)) {
        this.updateOffset();
      }

    _.invoke(this.props, 'onScroll', event);
  }

  updateOffset(animated = false) {
    const x = presenter.calcOffset(this.props, this.state);
    this.carousel.scrollTo({x, animated});
  }

  componentDidMount() {
    setTimeout(() => {
      this.updateOffset();
    }, Constants.isIOS ? 0 : 50);
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
    const {containerStyle} = this.props;
    return (
      <View flex style={containerStyle}>
        <ScrollView
          ref={(scrollView) => {
            this.carousel = scrollView;
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={this.onScroll}
          scrollEventThrottle={200}
        >
          {this.renderChildren()}
        </ScrollView>
      </View>
    );
  }

  goToPage(pageIndex, animated = true) {
    this.setState(
      {
        currentPage: pageIndex,
      },
      () => this.updateOffset(animated),
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    // container: {
    //   flex: 1,
    // },
  });
}
