import React from 'react';
import {measurePerformance} from 'reassure';
import {View} from '../../index';

describe('Playground testing', () => {
  const TestCase = () => {
    return <View/>;
  };

  it('view', async () => {
    const measurement = await measurePerformance(<TestCase/>);
    expect(measurement.meanDuration).toBeLessThan(10);
  });
});
