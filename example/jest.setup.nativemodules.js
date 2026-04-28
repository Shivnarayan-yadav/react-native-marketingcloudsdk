const {NativeModules} = require('react-native');

NativeModules.RNSFMCSdk = {
  addListener: jest.fn(),
  removeListeners: jest.fn(),
};
