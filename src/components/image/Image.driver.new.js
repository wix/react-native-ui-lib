import { useComponentDriver } from "../../testkit/new/Component.driver";
export const ImageDriver = props => {
  const driver = useComponentDriver(props);
  return driver;
};