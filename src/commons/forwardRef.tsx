import React, {useRef, Ref, ForwardedRef, useImperativeHandle, useEffect} from 'react';
import {TextInput, View, Text} from 'react-native';
import hoistStatics from 'hoist-non-react-statics';

export interface ForwardRefInjectedProps<T> {
  /**
   * The forwarded ref of the containing element
   */
  forwardedRef: Ref<T>;
}

export default function forwardRef<P = {}, STATICS extends {[key: string]: true} = {}, T = any>(WrappedComponent: React.ComponentType<P & ForwardRefInjectedProps<T>>) {
  function forwardRef(props: P, ref: Ref<T>) {
    return <WrappedComponent {...props} forwardedRef={ref}/>;
  }

  const ForwardedComponent = React.forwardRef<T, P>(forwardRef);

  const FinalComponent = hoistStatics<typeof ForwardedComponent, typeof WrappedComponent, STATICS>(ForwardedComponent,
    WrappedComponent);
  FinalComponent.displayName = WrappedComponent.displayName;
  //@ts-ignore
  FinalComponent.propTypes = WrappedComponent.propTypes;
  //@ts-ignore
  FinalComponent.defaultProps = WrappedComponent.defaultProps;

  return FinalComponent;
}

type TestProps = {
  labelColor: string;
};

type TestRef = {
  hello: () => void;
  focus: () => void;
};

const Test = (props: TestProps & ForwardRefInjectedProps<TestRef>) => {
  const {labelColor, forwardedRef} = props;
  useImperativeHandle(forwardedRef, () => ({hello: () => console.log('hello'), focus: () => console.log('focus')}), []);
  return (
    <View>
      <Text style={{color: labelColor}}>Test passing ref</Text>
      <TextInput/>
    </View>
  );
};
const T = forwardRef<TestProps, {}, TestRef>(Test);

const App = () => {
  const inputRef = useRef<TestRef>(null);
  useEffect(() => {
    inputRef.current?.hello();
  }, []);
  return <T labelColor="red" ref={inputRef}/>;
};
