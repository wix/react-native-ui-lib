import React, {useState, useCallback, useRef} from 'react';
import {FlatListProps, ScrollViewProps, LayoutChangeEvent} from 'react-native';
import forwardRef, {ForwardRefInjectedProps} from './forwardRef';
import hoistStatics from 'hoist-non-react-statics';

type ScrollEnablerProps = {
  onContentSizeChange: (contentWidth: number, contentHeight: number) => void;
  onLayout: (event: LayoutChangeEvent) => void;
  scrollEnabled: boolean;
};

declare type SupportedViewsProps = FlatListProps<any> | ScrollViewProps;

export type WithScrollEnablerProps = {
  scrollEnablerProps: ScrollEnablerProps;
  ref?: any;
};

type PropTypes = ForwardRefInjectedProps & SupportedViewsProps;

function withScrollEnabler<PROPS, STATICS = {}>(WrappedComponent: React.ComponentType<PROPS & WithScrollEnablerProps>): React.ComponentType<PROPS> & STATICS {
  const ScrollEnabler: React.FunctionComponent<PROPS & PropTypes> = (props: PROPS & PropTypes) => {
    const [scrollEnabled, setScrollEnabled] = useState(true);
    const contentSize = useRef(0);
    const layoutSize = useRef(0);

    const checkScroll = useCallback(() => {
      const isScrollEnabled = Math.floor(contentSize.current) > layoutSize.current;
      if (isScrollEnabled !== scrollEnabled) {
        setScrollEnabled(isScrollEnabled);
      }
    }, [scrollEnabled]);

    const onContentSizeChange = useCallback((contentWidth: number, contentHeight: number) => {
      const size = props.horizontal ? contentWidth : contentHeight;
      if (size !== contentSize.current) {
        contentSize.current = size;
        if (layoutSize.current > 0) {
          checkScroll();
        }
      }
    },
    [props.horizontal, checkScroll]);

    const onLayout = useCallback((event: LayoutChangeEvent) => {
      const {
        nativeEvent: {
          layout: {width, height}
        }
      } = event;
      const size = props.horizontal ? width : height;
      if (size !== layoutSize.current) {
        layoutSize.current = size;
        if (contentSize.current > 0) {
          checkScroll();
        }
      }
    },
    [props.horizontal, checkScroll]);

    return (
      <WrappedComponent
        {...props}
        scrollEnablerProps={{onLayout, scrollEnabled, onContentSizeChange}}
        ref={props.forwardedRef}
      />
    );
  };

  hoistStatics(ScrollEnabler, WrappedComponent);
  ScrollEnabler.displayName = WrappedComponent.displayName;
  //@ts-ignore
  ScrollEnabler.propTypes = WrappedComponent.propTypes;
  //@ts-ignore
  ScrollEnabler.defaultProps = WrappedComponent.defaultProps;
  return forwardRef(ScrollEnabler) as any;
}

export default withScrollEnabler;
