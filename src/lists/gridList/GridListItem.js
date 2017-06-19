import React, {PropTypes} from 'react';
import {View, Text, Image} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {BaseComponent} from '../../commons';
import createStyles from './style';
import TouchableOpacity from '../../components/touchableOpacity';


/** THIS IS DEPRECATED */

/**
 * GridListItem component
 */
export default class GridListItem extends BaseComponent {
  static displayName = 'Grid List Item';
  static propTypes = {
    ...BaseComponent.propTypes,
    // ...Animatable.propTypes,
    index: PropTypes.number.isRequired,
    title: PropTypes.string,
    titleStyle: PropTypes.object,
    secondaryTitle: PropTypes.string,
    secondaryTitleStyle: PropTypes.object,
    subtitle: PropTypes.string,
    subtitleStyle: PropTypes.object,
    onPress: PropTypes.func,
    height: PropTypes.number,
    imageSource: PropTypes.object,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    ...BaseComponent.defaultProps,
    height: 210,
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  renderTop() {
    return (
      <View style={this.styles.topContainer}>
        {this.renderImage()}
      </View>
    );
  }

  renderBottom() {
    return (
      <View style={this.styles.bottomContainer}>
        {this.renderSecondaryTitle()}
        {this.renderTitle()}
        {this.renderSubtitle()}
      </View>
    );
  }

  renderImage() {
    const {imageSource} = this.props;
    if (imageSource) {
      return (
        <View style={this.styles.imageContainer}>
          <Image style={this.styles.image} source={imageSource}/>
        </View>
      );
    }
    return null;
  }

  renderSecondaryTitle() {
    const {secondaryTitle} = this.props;
    return (
      <Text style={this.styles.secondaryTitleText}>
        {secondaryTitle}
      </Text>
    );
  }

  renderTitle() {
    const {title} = this.props;
    return (
      <Text style={this.styles.titleText}>
        {title}
      </Text>
    );
  }

  renderSubtitle() {
    const {subtitle} = this.props;
    return (
      <Text style={this.styles.subtitleText}>
        {subtitle}
      </Text>
    );
  }

  render() {
    const {onPress, disabled} = this.props;
    const animationProps = this.extractAnimationProps();
    const Container = (onPress && !disabled) ? TouchableOpacity : View;
    return (
      <Container style={[this.styles.container, disabled && this.containerDisabled]} onPress={onPress}>
        <Animatable.View
          {...animationProps}
          style={[
            this.styles.innerContainer,
            disabled && this.styles.innerContainerDisabled,
          ]}
        >
          {this.renderTop()}
          {this.renderBottom()}
        </Animatable.View>

      </Container>
    );
  }
}
