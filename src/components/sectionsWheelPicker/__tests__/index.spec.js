import _map from "lodash/map";
import React from 'react';
import SectionsWheelPicker from "../index";
import { render } from '@testing-library/react-native';
import { SectionsWheelPickerDriver } from "../SectionsWheelPicker.driver";
import { sections, labels } from "./mockSections";
const testID = 'sectionsWheel';
const onChange = jest.fn();
const TestCase = props => {
  return <SectionsWheelPicker testID={testID} numberOfVisibleRows={4} sections={sections} {...props} />;
};
describe('SectionsWheelPicker', () => {
  beforeEach(() => {
    onChange.mockClear();
  });
  it('should present 3 sections', () => {
    const renderTree = render(<TestCase />);
    const driver = SectionsWheelPickerDriver({
      renderTree,
      testID
    });
    expect(driver.sectionsDrivers.length).toBe(3);
  });
  it('should have 3 labels', () => {
    const renderTree = render(<TestCase />);
    const driver = SectionsWheelPickerDriver({
      renderTree,
      testID
    });
    const sectionsDrivers = driver.sectionsDrivers;
    _map(sectionsDrivers, (sectionDriver, index) => {
      expect(sectionDriver.getLabel()).toBe(labels[index]);
    });
  });
});