import React from "react";
import { Image as RNImage } from "react-native";
import hoistNonReactStatic from "hoist-non-react-statics";
import _ from "lodash";
import { BaseComponent } from "../../commons";
import { ThemeManager } from "../../style";
import Assets from "../../assets";
/**
 * @description: Image wrapper with extra functionality like source transform and assets support
 * @extends: Image
 * @extendslink: https://facebook.github.io/react-native/docs/image.html
 */
class Image extends BaseComponent {
    constructor(props) {
        super(props);
        this.sourceTransformer =
            props.sourceTransformer ||
                _.get(ThemeManager.components, "Image.sourceTransformer");
    }
    getImageSource() {
        const { assetName, assetGroup } = this.props;
        if (!_.isUndefined(assetName)) {
            return _.get(Assets, `${assetGroup}.${assetName}`);
        }
        if (this.sourceTransformer) {
            return this.sourceTransformer(this.props);
        }
        const { source } = this.props;
        if (_.get(source, "uri") === null || _.get(source, "uri") === "") {
            return { ...source, uri: undefined };
        }
        return source;
    }
    render() {
        const source = this.getImageSource();
        return <RNImage {...this.props} source={source}/>;
    }
}
Image.displayName = "Image";
Image.defaultProps = {
    assetGroup: "icons"
};
hoistNonReactStatic(Image, RNImage);
export default Image;
