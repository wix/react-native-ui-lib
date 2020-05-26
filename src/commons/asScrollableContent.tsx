import _ from 'lodash';
import React, {Component} from 'react';
import {ScrollView, ScrollViewProps} from 'react-native';
//@ts-ignore
import hoistStatics from 'hoist-non-react-statics';

interface ScrollableContentProps {
  scrollableContentProps?: ScrollViewProps;
  maximumContentSize?: number;
}

interface ScrollableContentState {
  maximumContentSize?: number;
  contentHeight?: number;
  scrollEnabled: boolean;
}

type PropTypes = ScrollableContentProps;

export default function asScrollableContent(WrappedComponent: React.ComponentType<any>) {
  class ScrollableContent extends Component<PropTypes, ScrollableContentState> {
    static displayName: string | undefined;

    constructor(props: PropTypes) {
      super(props);
      this.state = {
        maximumContentSize: props.maximumContentSize,
        contentHeight: undefined,
        scrollEnabled: false
      };
    }

    static isScrollEnabled = (contentHeight?: number, maximumContentSize?: number) => {
      return !_.isUndefined(contentHeight) && !_.isUndefined(maximumContentSize) && contentHeight > maximumContentSize;
    };

    static getDerivedStateFromProps(nextProps: any, prevState: any) {
      if (nextProps.maximumContentSize !== prevState.maximumContentSize) {
        const maximumContentSize = nextProps.maximumContentSize;
        return {
          maximumContentSize,
          scrollEnabled: ScrollableContent.isScrollEnabled(prevState.contentHeight, maximumContentSize)
        };
      }

      return null;
    }

    onContentSizeChange = (contentWidth: number, contentHeight: number) => {
      const {maximumContentSize} = this.state;
      _.invoke(this.props, 'scrollableContentProps.onContentSizeChange', [contentWidth, contentHeight]);
      this.setState({
        contentHeight,
        scrollEnabled: ScrollableContent.isScrollEnabled(contentHeight, maximumContentSize)
      });
    };

    render() {
      const {scrollEnabled} = this.state;
      const {scrollableContentProps = {}, ...others} = this.props;
      const {testID} = scrollableContentProps;

      return (
        <ScrollView
          testID={`${testID}.scrollable_content`}
          {...scrollableContentProps}
          onContentSizeChange={this.onContentSizeChange}
          scrollEnabled={scrollEnabled}
        >
          <WrappedComponent testID={testID} {...others}/>
        </ScrollView>
      );
    }
  }

  hoistStatics(ScrollableContent, WrappedComponent);
  ScrollableContent.displayName = WrappedComponent.displayName;

  return ScrollableContent as any;
}
