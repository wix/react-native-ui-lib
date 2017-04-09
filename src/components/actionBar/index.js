import React, {PropTypes} from 'react';
import {StyleSheet} from 'react-native';
import _ from 'lodash';
import {BaseComponent} from '../../commons';
import View from '../view';
import Button from '../button';
import {Colors, Shadows} from '../../style';


/**
 * Action Bar
 */
export default class ActionBar extends BaseComponent {
  static displayName = 'ActionBar';
  static propTypes = {
    /**
     * action bar height
     */
    height: PropTypes.number,
    /**
     * action bar background color
     */
    backgroundColor: PropTypes.string,
    /**
     * actions for the action bar
     */
    actions: PropTypes.arrayOf(PropTypes.shape(Button.propTypes)),
    /**
     * should action be equally centered
     */
    centered: PropTypes.bool,
    /**
     * style the action bar
     */
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
  };

  static defaultProps = {
    height: 48,
    backgroundColor: Colors.white,
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  getAlignment(actionIndex) {
    const {actions, centered} = this.props;
    const first = actionIndex === 0;
    const last = actionIndex === actions.length - 1;
    return {
      left: centered ? false : first,
      center: centered || (!first && !last) || (first && last),
      right: centered ? false : last,
    };
  }

  render() {
    const {actions, centered, style, ...others} = this.props;

    return (
      <View row centerV paddingH-20={!centered} style={[this.styles.container, style]} {...others}>
        {_.map(actions, (action, i) => (
          <View
            key={i}
            flex
            {...this.getAlignment(i)}
          >
            <Button link size="medium" blue30 {...action}/>
          </View>
        ))}
      </View>
    );
  }
}

function createStyles({height, backgroundColor}) {
  return StyleSheet.create({
    container: {
      height,
      backgroundColor,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      ...Shadows.white40.top,
    },
  });
}
