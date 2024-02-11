import React, {ComponentType} from 'react';
import Button, {ButtonProps} from '../components/button';

export type SupportedComponents = 'Button';
type ComponentsTypesMap = {Button: ButtonProps};
const ComponentsMap = new Map<SupportedComponents, React.ElementType>();
ComponentsMap.set('Button', Button);

// eslint-disable-next-line max-len
export function createComponent<c extends SupportedComponents, Props extends ComponentsTypesMap[c]>(component: c): ComponentType<Props> {
  const ModifiedComponent = (props: Props) => {
    const Component = ComponentsMap.get(component);
    if (Component) {
      return <Component {...props}/>;
    }
  };

  return ModifiedComponent;
}
