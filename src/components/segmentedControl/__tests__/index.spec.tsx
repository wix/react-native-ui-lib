import React from 'react';
import {render} from '@testing-library/react-native';
import SegmentedControl, {type SegmentedControlProps} from '../index';

const testSegmentes = [{label: 'Segmented 1'}, {label: 'Segmented 2'}, {label: 'Segmented 3'}, {label: 'Segmented 4'}];

const TestCase = (props: Partial<SegmentedControlProps>) => {
  return <SegmentedControl segments={testSegmentes} {...props}/>;
};

describe('SegmentedControl', () => {
  it('should render', () => {
    const renderTree = render(<TestCase/>);
    expect(renderTree).toBeTruthy();
  });
  it('should render with a label', () => {
    const renderTree = render(<TestCase label="Test Label"/>);
    expect(renderTree.queryByText('Test Label')).toBeTruthy();
  });
});
