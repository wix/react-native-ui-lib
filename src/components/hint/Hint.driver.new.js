import { useComponentDriver } from "../../testkit/new/Component.driver";
import { ModalDriver } from "../modal/Modal.driver.new";
import { ViewDriver } from "../view/View.driver.new";
export const HintDriver = props => {
  const driver = useComponentDriver(props);
  const hintBubbleDriver = ViewDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.message`
  });
  const modalDriver = ModalDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.message`
  });
  return {
    ...driver,
    getHintBubble: () => hintBubbleDriver,
    getModal: () => modalDriver
  };
};