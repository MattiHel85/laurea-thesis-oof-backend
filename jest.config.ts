import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',  
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};

export default config;