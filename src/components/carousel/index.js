import React, {PropTypes} from 'react';
import {ScrollView, StyleSheet, InteractionManager} from 'react-native';
import _ from 'lodash';
import {BaseComponent} from '../../commons';
import View from '../view';
import {Typography, ThemeManager, BorderRadiuses, Colors} from '../../style';
import {Constants} from '../../helpers';
import * as presenter from './CarouselPresenter';

/**
 * Carousel for scrolling pages horizontally
 */
export default class Carousel extends BaseComponent {
  static displayName = 'Carousel';
  static propTypes = {
    initialPage: PropTypes.number,
    pageWidth: PropTypes.number,
    onChangePage: PropTypes.func,
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
  };

  static defaultProps = {
    initialPage: 0,
    pageWidth: Constants.screenWidth,
  }

  constructor(props) {
    super(props);
    this.state = {
      currentPage: props.initialPage,
    };

    this.onScroll = this.onScroll.bind(this);
    this.updateOffset = this.updateOffset.bind(this);
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  onScroll(event) {
    const offsetX = event.nativeEvent.contentOffset.x;
    if (offsetX >= 0) {
      const {currentPage} = this.state;
      const newPage = presenter.calcPageIndex(offsetX, this.props);

      this.setState({
        currentPage: newPage,
      }, () => {
        if (currentPage !== newPage) {
          _.invoke(this.props, 'onChangePage', newPage, currentPage);
        }


      });

      if (presenter.isOutOfBounds(offsetX, this.props)) {
        this.updateOffset(newPage);
      }
    }
  }

  updateOffset() {
    const x = presenter.calcOffset(this.props, this.state);
    this.carousel.scrollTo({x, animated: false});
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
    const {children} = this.props;
    const length = presenter.getChildrenLength(this.props);

    return [
      this.cloneChild(children[length - 1]),
      ...children,
      this.cloneChild(children[0]),
    ];
  }

  render() {
    const {containerStyle, pageWidth} = this.props;
    return (
      <View flex style={containerStyle}>
        <ScrollView
          ref={(scrollView) => { this.carousel = scrollView; }}
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
}

function createStyles() {
  return StyleSheet.create({
    // container: {
    //   flex: 1,
    // },
  });
}
