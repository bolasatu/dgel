import { ContextState } from "../types.js";

/**
 * Global state for the engine.
 * Stores the WebGPU device, and external compiler instances (glslang, twgsl).
 */
const State: ContextState = {
  device: null,
  glslang: null,
  twgsl: null,
  debug: false,
  error: false,
};

export default State;
