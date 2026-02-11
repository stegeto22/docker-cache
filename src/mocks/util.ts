import { jest } from "@jest/globals";

import type { promisify } from "node:util";
import type {
  error,
  getInput,
  getState,
  info,
  saveState,
  setFailed,
  setOutput,
} from "@actions/core";
import type { restoreCache, saveCache } from "@actions/cache";

export const utilFactory = (): {
  promisify: Omit<typeof promisify, "custom">;
} => ({
  promisify: jest.fn<typeof promisify>(),
});

export const coreFactory = (): {
  error: typeof error;
  getInput: typeof getInput;
  getState: typeof getState;
  info: typeof info;
  saveState: typeof saveState;
  setFailed: typeof setFailed;
  setOutput: typeof setOutput;
} => ({
  error: jest.fn<typeof error>(),
  getInput: jest.fn<typeof getInput>(),
  getState: jest.fn<typeof getState>(),
  info: jest.fn<typeof info>(),
  saveState: jest.fn<typeof saveState>(),
  setFailed: jest.fn<typeof setFailed>(),
  setOutput: jest.fn<typeof setOutput>(),
});

export const cacheFactory = (): {
  restoreCache: typeof restoreCache;
  saveCache: typeof saveCache;
} => ({
  restoreCache: jest.fn<typeof restoreCache>(),
  saveCache: jest.fn<typeof saveCache>(),
});
