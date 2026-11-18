import React from 'react';
import {Text, View} from 'react-native';
import {act, cleanup, render} from '@testing-library/react-native';
import asBaseComponent from '../asBaseComponent';
import {Scheme} from '../../style';

const SchemeLabel = () => <Text>{Scheme.getSchemeType()}</Text>;
const WrappedLabel = asBaseComponent(SchemeLabel, {ignoreModifiers: true, ignoreTheme: true});

describe('asBaseComponent color scheme', () => {
  afterEach(() => {
    cleanup();
    Scheme.setScheme('light');
  });

  it.each([
    ['light', 'dark'],
    ['dark', 'light']
  ] as const)('updates a component mounted in %s when switching to %s', (initialScheme, nextScheme) => {
    // The HOC module has already been imported before the app changes its scheme.
    Scheme.setScheme(initialScheme);
    const {getByText, queryByText} = render(<WrappedLabel/>);
    expect(getByText(initialScheme)).toBeTruthy();

    act(() => Scheme.setScheme(nextScheme));

    expect(getByText(nextScheme)).toBeTruthy();
    expect(queryByText(initialScheme)).toBeNull();
  });

  it('updates existing and newly mounted instances when returning to the original scheme', () => {
    Scheme.setScheme('light');
    const {getAllByText, rerender} = render(<View><WrappedLabel key="first"/></View>);
    act(() => Scheme.setScheme('dark'));
    rerender(<View>
      <WrappedLabel key="first"/>
      <WrappedLabel key="second"/>
    </View>);
    expect(getAllByText('dark')).toHaveLength(2);

    act(() => Scheme.setScheme('light'));
    expect(getAllByText('light')).toHaveLength(2);

    act(() => Scheme.setScheme('dark'));
    expect(getAllByText('dark')).toHaveLength(2);
  });
});
