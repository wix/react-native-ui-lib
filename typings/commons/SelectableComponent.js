import React from "react";
import { View, StyleSheet, Image } from "react-native";
import _ from "lodash";
import BaseComponent from "./BaseComponent";
import { Colors, BorderRadiuses } from "../style";
import Assets from "../assets";
const INDICATOR_TYPES = {
    CIRCLE: "circle",
    CLEAN: "clean"
};
// todo: add nice animation
export default class SelectableComponent extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            selected: props.selected
        };
        this.onSelect = this.onSelect.bind(this);
    }
    componentWillReceiveProps(newProps) {
        if (newProps.selected !== this.state.selected) {
            this.setState({
                selected: newProps.selected
            });
        }
    }
    generateStyles() {
        this.styles = createStyles(this.props);
    }
    getIndicatorContainerStyle() {
        const { selectableIndicatorType, selectableIndicatorColor } = this.props;
        const { selected } = this.state;
        const style = [this.styles.container];
        if (selectableIndicatorType === INDICATOR_TYPES.CIRCLE) {
            style.push(this.styles.circleContainer);
            style.push(selected && { backgroundColor: selectableIndicatorColor });
        }
        return style;
    }
    getIndicatorIconStyle() {
        const { selectableIndicatorType, selectableIndicatorColor } = this.props;
        const style = [this.styles.checkIcon];
        if (selectableIndicatorType === INDICATOR_TYPES.CIRCLE) {
            style.push(this.styles.checkIconInCircle);
        }
        else {
            style.push({ tintColor: selectableIndicatorColor });
        }
        return style;
    }
    renderSelectableIndicator() {
        const { selectable } = this.props;
        const { selected } = this.state;
        if (selectable) {
            return (<View style={this.getIndicatorContainerStyle()}>
          {selected && (<Image style={this.getIndicatorIconStyle()} source={Assets.icons.check}/>)}
        </View>);
        }
    }
    onSelect() {
        this.setState({
            selected: !this.state.selected
        });
        _.invoke(this.props, "onPress");
    }
}
SelectableComponent.defaultProps = {
    selectableIndicatorSize: 36,
    selectableIndicatorType: INDICATOR_TYPES.CIRCLE,
    selectableIndicatorColor: Colors.blue30
};
SelectableComponent.indicatorTypes = INDICATOR_TYPES;
function createStyles({ selectableIndicatorSize }) {
    return StyleSheet.create({
        container: {
            width: selectableIndicatorSize,
            height: selectableIndicatorSize,
            justifyContent: "center",
            borderRadius: BorderRadiuses.br100
        },
        circleContainer: {
            borderWidth: 1,
            borderColor: Colors.blue30
        },
        checkIcon: {
            alignSelf: "center",
            resizeMode: "contain"
        },
        checkIconInCircle: {
            width: selectableIndicatorSize / 2,
            tintColor: Colors.white
        }
    });
}
