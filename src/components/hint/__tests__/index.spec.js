import React from 'react';
import { Hint } from 'react-native-ui-lib';
import { Colors } from "../../../style";
import { render } from "../../../uilib-test-renderer";
import { HintDriver } from "../Hint.driver.new";
import View from "../../view";
const HINT_TEST_ID = 'Hint';
const TARGET_FRAME_LEFT = {
  x: 25,
  y: 370,
  height: 60,
  width: 100
};
const TARGET_FRAME_CENTER = {
  x: 100,
  y: 200,
  height: 60,
  width: 100
};
const TARGET_FRAME_RIGHT = {
  x: 240,
  y: 150,
  height: 60,
  width: 100
};
const TestCase = ({
  addPagePaddings = true,
  withModal = false,
  ...props
}) => {
  return <View flex centerV padding-s5={addPagePaddings}>
      <Hint key={'hint'} message={'Hint message to hint things'} targetFrame={TARGET_FRAME_CENTER} onBackgroundPress={withModal ? () => {} : undefined} testID={HINT_TEST_ID} {...props} />
    </View>;
};
describe('Hint Screen component test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Test Hint visibility', async () => {
    const renderTree = render(<TestCase visible addPagePaddings={false} />);
    const driver = HintDriver({
      renderTree,
      testID: HINT_TEST_ID
    });
    expect(driver.exists()).toBeTruthy();
  });
  it('Color hint bubble with the default color', async () => {
    const expectedColor = Colors.$backgroundPrimaryHeavy;
    const renderTree = render(<TestCase visible />);
    const driver = HintDriver({
      renderTree,
      testID: HINT_TEST_ID
    });
    const hintBubble = await driver.getHintBubble();
    expect(hintBubble.getStyle(true).backgroundColor).toBe(expectedColor);
  });
  it('Should color hint bubble with provided color prop', async () => {
    const renderTree = render(<TestCase visible color={Colors.white} />);
    const driver = HintDriver({
      renderTree,
      testID: HINT_TEST_ID
    });
    const hintBubble = await driver.getHintBubble();
    expect(hintBubble.getStyle(true).backgroundColor).toBe(Colors.white);
  });
  it('Should modal be not visible when hint is not visible', async () => {
    const renderTree = render(<TestCase visible={false} withModal />);
    const driver = HintDriver({
      renderTree,
      testID: HINT_TEST_ID
    });
    expect(driver.getModal().isVisible()).toBe(false);
  });

  // TODO: This scenario tests doesn't pass, need to fix it using act
  it.skip('Should modal be visible when showHint is true', async () => {
    const renderTree = render(<TestCase visible withModal />);
    const driver = HintDriver({
      renderTree,
      testID: HINT_TEST_ID
    });
    expect(driver.getModal().isVisible()).toBe(true);
  });
  describe('Different positions and scenarios', () => {
    const targetFrameAlignments = {
      left: TARGET_FRAME_LEFT,
      center: TARGET_FRAME_CENTER,
      right: TARGET_FRAME_RIGHT
    };
    describe.each(['left', 'center', 'right'])('%s position', alignment => {
      const targetFrame = targetFrameAlignments[alignment];
      it(`should position correctly for a target positioned on ${alignment}`, () => {
        const renderTree = render(<TestCase visible targetFrame={targetFrame} />);
        expect(renderTree.toJSON()).toMatchSnapshot();
      });
      it(`should position correctly for a target positioned on ${alignment} - with sideTip`, () => {
        const renderTree = render(<TestCase visible targetFrame={targetFrame} useSideTip />);
        expect(renderTree.toJSON()).toMatchSnapshot();
      });

      // TODO: This scenario doesn't pass as well because it rendered in a modal
      it.skip(`should position correctly for a target positioned on ${alignment} - with a modal`, () => {
        const renderTree = render(<TestCase visible targetFrame={targetFrame} withModal />);
        expect(renderTree.toJSON()).toMatchSnapshot();
      });
    });
  });
});