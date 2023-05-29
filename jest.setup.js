import '@testing-library/jest-dom';

// TODO: solve console errors in tests due to React 18
global.console = {
  ...console,
  // uncomment to ignore a specific log level
  //   log: jest.fn(),
  //   debug: jest.fn(),
  //   info: jest.fn(),
  // warn: jest.fn(),
  error: jest.fn(),
};
