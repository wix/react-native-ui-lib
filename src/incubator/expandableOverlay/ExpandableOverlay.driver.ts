import React from 'react';
import {DialogDriver, ModalDriver, useComponentDriver, usePressableDriver, ComponentProps} from '../../../testkit';
import {ExpandableOverlayProps} from '.';

type usingDialog = 'dialog' | 'modal';


const ExpandableOverlayDriver = <T extends usingDialog>(props: ComponentProps) => {
  const {renderTree, testID} = props;

  const driver = usePressableDriver<ExpandableOverlayProps>(useComponentDriver<ExpandableOverlayProps>({renderTree, testID}));

  const isUsingDialog = driver.getProps().useDialog;

  const overlayDriver = (isUsingDialog ? DialogDriver : ModalDriver)({renderTree, testID: `${testID}.overlay`});

  const getOverlay = () => {
    return overlayDriver;
  };

  return {...driver, getOverlay};
};

export default ExpandableOverlayDriver;
