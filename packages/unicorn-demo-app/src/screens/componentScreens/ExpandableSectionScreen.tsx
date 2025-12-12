import React, {PureComponent} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Text, View, ExpandableSection, SegmentedControl, Colors, Icon} from 'react-native-ui-lib';

const chevronDown = require('../../assets/icons/chevronDown.png');
const chevronUp = require('../../assets/icons/chevronUp.png');
const infoIcon = require('../../assets/icons/info.png');
const DEFAULT = undefined;
const PARTIALLY_EXPANDED_HEIGHT = 100;
const FULLY_EXPANDED_HEIGHT = 300;

class ExpandableSectionScreen extends PureComponent {
  state = {
    expanded: false,
    minHeight: DEFAULT
  };

  onExpand = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  getChevron(expanded: boolean) {
    return expanded ? chevronUp : chevronDown;
  }

  renderReadMoreHeader = () => {
    const {expanded} = this.state;
    return (
      <View marginH-page marginT-10 row>
        <Text text80 marginL-40 marginR-5 $textPrimary>
          Read More
        </Text>
        <Icon style={styles.icon} source={this.getChevron(expanded)} tintColor={Colors.$iconPrimary}/>
      </View>
    );
  };

  renderHeader = (text: string,
    expanded: boolean,
    {disabled, showInfo}: {disabled?: boolean; showInfo?: boolean} = {}) => {
    return (
      <View marginH-page marginV-20 spread row>
        <View row>
          {showInfo ? <Icon source={infoIcon} marginR-10 tintColor={disabled ? Colors.grey40 : undefined}/> : null}
          <Text text60 marginL-4 grey40={disabled}>
            {text}
          </Text>
        </View>
        <Icon style={styles.icon} source={this.getChevron(expanded)} tintColor={disabled ? Colors.grey40 : undefined}/>
      </View>
    );
  };

  renderContent() {
    return (
      <View marginH-60>
        <Text text80>
          If you have any questions, comments, or concerns, please don&apos;t hesitate to get in touch with us. You can
          easily reach out to us through our contact form on our website.
        </Text>
        <Text text80>
          Alternatively, you can reach us via email at help@help.com, where our team is ready to assist you promptly. If
          you prefer speaking with someone directly, feel free to give us a call at 1-833-350-1066.
        </Text>
      </View>
    );
  }

  renderOptions = () => {
    return (
      <View marginH-page>
        <Text text70BO marginB-8>
          Minimum Height
        </Text>
        <Text text80 marginB-16>
          The expandable section can be either fully collapsed, partially expanded to reveal some of the items, or fully
          expanded by default.
        </Text>
        <SegmentedControl
          activeColor={Colors.$textDefaultLight}
          activeBackgroundColor={Colors.$backgroundInverted}
          segments={[{label: 'Default'}, {label: 'Partially'}, {label: 'Fully Expanded'}]}
          onChangeIndex={index => {
            switch (index) {
              case 0:
                return this.setState({minHeight: DEFAULT});
              case 1:
                return this.setState({minHeight: PARTIALLY_EXPANDED_HEIGHT});
              case 2:
                return this.setState({minHeight: FULLY_EXPANDED_HEIGHT});
            }
          }}
        />
      </View>
    );
  };

  renderExpandableSection = () => {
    const {expanded, minHeight} = this.state;
    return (
      <ExpandableSection
        top={minHeight === PARTIALLY_EXPANDED_HEIGHT}
        expanded={expanded}
        sectionHeader={
          minHeight === PARTIALLY_EXPANDED_HEIGHT
            ? this.renderReadMoreHeader()
            : this.renderHeader('How can I contact you?', expanded, {showInfo: true})
        }
        onPress={this.onExpand}
        minHeight={minHeight}
      >
        {this.renderContent()}
      </ExpandableSection>
    );
  };

  renderNextItem() {
    return this.renderHeader('Where are you located?', false, {disabled: true, showInfo: true});
  }

  render() {
    const {minHeight} = this.state;
    return (
      <ScrollView>
        <Text text40 margin-20>
          ExpandableSection
        </Text>
        {this.renderOptions()}
        {this.renderExpandableSection()}
        {minHeight !== PARTIALLY_EXPANDED_HEIGHT ? this.renderNextItem() : null}
      </ScrollView>
    );
  }
}

export default ExpandableSectionScreen;

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center'
  }
});
