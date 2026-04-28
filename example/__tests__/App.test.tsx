/**
 * @format
 */

jest.mock('react-native-gesture-handler', () => {
  const React = require('react');
  const {View} = require('react-native');
  const Mock = (props) => <View {...props} />;
  return {
    GestureHandlerRootView: Mock,
    PanGestureHandler: Mock,
    TapGestureHandler: Mock,
    NativeViewGestureHandler: Mock,
    State: {},
  };
});

jest.mock('react-native-permissions', () => ({
  check: jest.fn(() => Promise.resolve('unavailable')),
  request: jest.fn(() => Promise.resolve('unavailable')),
  PERMISSIONS: {IOS: {}, ANDROID: {}},
  RESULTS: {
    UNAVAILABLE: 'unavailable',
    DENIED: 'denied',
    LIMITED: 'limited',
    GRANTED: 'granted',
    BLOCKED: 'blocked',
  },
  openSettings: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-native-marketingcloudsdk', () => ({
  __esModule: true,
  default: new Proxy(
    {},
    {
      get: () => jest.fn(() => Promise.resolve()),
    },
  ),
  CustomEvent: {},
}));

jest.mock('react-native-root-toast', () => ({
  __esModule: true,
  default: {show: jest.fn()},
}));

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shipped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';

it('renders correctly', async () => {
  let root;
  await act(async () => {
    root = renderer.create(<App />);
  });
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
  });
  act(() => {
    root.unmount();
  });
});
