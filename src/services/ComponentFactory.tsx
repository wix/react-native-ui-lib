import React, {ComponentType} from 'react';
import Button, {ButtonProps} from '../components/button';

type Components = 'Button';
type ComponentsTypesMap = {Button: ButtonProps};
const ComponentsMap = new Map<Components, React.ElementType>();
ComponentsMap.set('Button', Button);

// eslint-disable-next-line max-len
export function createComponent<c extends Components, Props extends ComponentsTypesMap[c]>(component: Components): ComponentType<Props> {
  const ModifiedComponent = (props: Props) => {
    const Component = ComponentsMap.get(component);
    if (Component) {
      return <Component {...props}/>;
    }
  };

  return ModifiedComponent;
}
