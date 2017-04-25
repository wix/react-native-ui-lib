import React, {PropTypes} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import Interactable from 'react-native-interactable';
import _ from 'lodash';
import {Constants} from '../../helpers';
import {BaseComponent} from '../../commons';

// const NUMBER_OF_PAGES = 5;
// const PAGE_WIDTH = 130;

export default class Carousel extends BaseComponent {

  static propTypes = {
    pageWidth: PropTypes.number,
  }

  static defaultProps = {
    pageWidth: Constants.screenWidth,
  }

  constructor(props) {
    super(props);
    this.deltaX = new Animated.Value(0);
  }

  onStop(event) {
    const snapPointId = event.nativeEvent.id;
    console.log(`ethan - drawer state is ${snapPointId}`);
  }

  getPagesLength() {
    return this.props.children.length;
  }

  getSnappingPoints() {
    const {pageWidth} = this.props;
    return _.times(this.getPagesLength(), (i) => {
      return {
        x: -i * pageWidth,
        id: i,
        tension: 500,
        damping: 0.6,
      };
    });
  }

  generateInputRange() {
    const {pageWidth} = this.props;
    return _.times(this.getPagesLength(), i => -i * pageWidth).reverse();
  }

  generateOutputRange(index, values) {
    const {pageWidth} = this.props;
    const inputRange = this.generateInputRange();
    return _.map(inputRange, (input) => {
      const valueIndex = Number(-index * pageWidth === input);
      return values[valueIndex];
    });
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  renderPages() {
    const {children} = this.props;
    // const inputRange = this.generateInputRange();
    return _.forEach(children, (page, pageIndex) => {
      // const titleStyle = {
      //   color: this.deltaX.interpolate({
      //     inputRange,
      //     outputRange: this.generateOutputRange(pageIndex, ['#C2C7CB', '#20303C']),
      //   }),
      //   transform: [{
      //     scale: this.deltaX.interpolate({
      //       inputRange,
      //       outputRange: this.generateOutputRange(pageIndex, [0.8, 1.2]),
      //     }),
      //   }],
      // };

      return (
        <View key={pageIndex} style={this.styles.page}>
          {page}
        </View>
      );
    });
  }

  render() {
    return (
      <View style={this.styles.container}>

        <Interactable.View
          horizontalOnly
          dragToss={0.05}
          snapPoints={this.getSnappingPoints()}
          onStop={this.onStop}
          animatedValueX={this.deltaX}
          style={this.styles.scrollStrip}
        >
          {this.renderPages()}
        </Interactable.View>
      </View>
    );
  }
}

function createStyles({pageWidth, children}) {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollStrip: {
      flexDirection: 'row',
      flex: 1,
      borderBottomWidth: 1,
      width: children.length * pageWidth,
    },
    page: {
      width: pageWidth,
      paddingLeft: 40,
      paddingTop: 20,
      alignItems: 'center',
    },
    pageTitle: {
      fontSize: 26,
      backgroundColor: 'transparent',
    },
  });
}
