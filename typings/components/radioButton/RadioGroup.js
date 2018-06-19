// TODO: update usage of React Context API to latest (https://reactjs.org/docs/context.html)
import React from "react";
import _ from "lodash";
import { BaseComponent } from "../../commons";
import View from "../view";
/**
 * Wrap a group of Radio Buttons to automatically control their selection
 */
class RadioGroup extends BaseComponent {
    constructor(props) {
        super(props);
        this.onValueChange = value => {
            this.setState({ value });
            _.invoke(this.props, "onValueChange", value);
        };
        this.state = {};
        this.state = {
            value: props.value
        };
    }
    getChildContext() {
        const { value } = this.state;
        return { value, onValueChange: this.onValueChange };
    }
    render() {
        return <View {...this.props}>{this.props.children}</View>;
    }
}
RadioGroup.displayName = "RadioGroup";
RadioGroup.childContextTypes = {
    value: PropTypes.string,
    onValueChange: PropTypes.func
};
export default RadioGroup;
