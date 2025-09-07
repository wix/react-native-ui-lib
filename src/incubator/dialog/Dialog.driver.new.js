import { ModalDriver } from "../../testkit";
export const DialogDriver = props => {
  const {
    renderTree,
    testID
  } = props;
  const modalDriver = ModalDriver({
    renderTree,
    testID: `${testID}.modal`
  });
  const exists = () => {
    return modalDriver.exists();
  };
  const isVisible = () => {
    return modalDriver.isVisible();
  };
  const pressOnBackground = () => {
    modalDriver.pressOnBackground();
  };
  return {
    isVisible,
    pressOnBackground,
    exists
  };
};