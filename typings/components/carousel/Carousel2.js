import React from "react";
import { StyleSheet, View, Animated } from "react-native";
import Interactable from "react-native-interactable";
import _ from "lodash";
import { Constants } from "../../helpers";
import { BaseComponent } from "../../commons";
import * as presenter from "./CarouselPresenter";
export default class Carousel2 extends BaseComponent {
    constructor(props) {
        super(props);
        this.deltaX = new Animated.Value(0);
        this.onStop = this.onStop.bind(this);
        this.state = {
            currentPage: props.initialPage
        };
    }
    componentWillMount() {
        this.updateCarouselPosition();
    }
    onStop(event) {
        const offset = event.nativeEvent.x;
        const newPage = presenter.calcPageIndex(-offset, this.props);
        const { currentPage } = this.state;
        this.setState({
            currentPage: newPage
        }, () => {
            if (currentPage !== newPage) {
                _.invoke(this.props, "onChangePage", newPage, currentPage);
            }
        });
        if (presenter.isOutOfBounds(-offset, this.props)) {
            this.updateCarouselPosition();
        }
    }
    updateCarouselPosition() {
        const position = {
            x: -presenter.calcOffset(this.props, this.state),
            y: 0
        };
        this.setState({ position });
        if (!this.carousel) {
            return;
        }
        this.carousel.snapTo({ index: 1 });
    }
    getSnappingPoints() {
        const { pageWidth, loop } = this.props;
        let length = presenter.getChildrenLength(this.props);
        if (loop) {
            length += 2;
        }
        const snappingPoints = _.times(length, i => {
            return {
                x: -i * pageWidth,
                id: i,
                tension: 500,
                damping: 0.6
            };
        });
        return snappingPoints;
    }
    // generateInputRange() {
    //   const {pageWidth} = this.props;
    //   return _.times(this.getPagesLength(), i => -i * pageWidth).reverse();
    // }
    // generateOutputRange(index, values) {
    //   const {pageWidth} = this.props;
    //   const inputRange = this.generateInputRange();
    //   return _.map(inputRange, (input) => {
    //     const valueIndex = Number(-index * pageWidth === input);
    //     return values[valueIndex];
    //   });
    // }
    generateStyles() {
        this.styles = createStyles(this.props);
    }
    cloneChild(child) {
        if (!child.key) {
            return child;
        }
        return React.cloneElement(child, {
            key: `${child.key}-clone`
        });
    }
    renderPages() {
        const { loop } = this.props;
        let { children } = this.props;
        const length = presenter.getChildrenLength(this.props);
        if (loop) {
            children = [
                this.cloneChild(children[length - 1]),
                ...children,
                this.cloneChild(children[0])
            ];
        }
        return children;
        // const inputRange = this.generateInputRange();
        // return _.forEach(children, (page) => {
        // const titleStyle = {
        //   color: this.deltaX.interpolate({
        //     inputRange,
        //     outputRange: this.generateOutputRange(pageIndex, [Colors.dark60, Colors.dark10]),
        //   }),
        //   transform: [{
        //     scale: this.deltaX.interpolate({
        //       inputRange,
        //       outputRange: this.generateOutputRange(pageIndex, [0.8, 1.2]),
        //     }),
        //   }],
        // };
        //   return (
        //     {page}
        //   );
        // });
    }
    render() {
        const carouselWidth = presenter.calcCarouselWidth(this.props);
        const { position } = this.state;
        return (<View style={this.styles.container}>
        <Interactable.View ref={carousel => {
            this.carousel = carousel;
        }} horizontalOnly dragToss={0.05} snapPoints={this.getSnappingPoints()} onStop={this.onStop} animatedValueX={this.deltaX} initialPosition={position} style={[this.styles.scrollStrip, { width: carouselWidth }]}>
          {this.renderPages()}
        </Interactable.View>
      </View>);
    }
}
Carousel2.displayName = "IGNORE";
Carousel2.defaultProps = {
    pageWidth: Constants.screenWidth,
    initialPage: 0
};
function createStyles() {
    return StyleSheet.create({
        container: {
            flex: 1
        },
        scrollStrip: {
            flexDirection: "row",
            flex: 1,
            borderBottomWidth: 1
        }
    });
}
