import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  testPathIgnorePatterns: ['/node_modules/', '/config/', '/dist/'],
};

export default config;
