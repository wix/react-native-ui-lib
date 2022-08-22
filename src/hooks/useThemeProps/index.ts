import {useContext, createContext} from 'react';
import * as Modifiers from '../../commons/modifiers';
import {ThemeManager} from 'style';

const EmptyContext = createContext({});

const useThemeProps = (props: any, componentName: string) => {
  const themeContext = ThemeManager.getThemeContext();
  const context = useContext(themeContext ?? EmptyContext);
  return Modifiers.getThemeProps(props, context, componentName);
};

export default useThemeProps;
