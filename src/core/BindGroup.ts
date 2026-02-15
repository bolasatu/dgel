import State from "./State.js";
import { BindGroupOptions } from "../types.js";

/**
 * Represents a set of resources bound to the pipeline.
 *
 * It connects the actual GPU resources (buffers, textures, samplers) to the layout defined in BindGroupLayout.
 */
class BindGroup {
  public gpuBindGroup: GPUBindGroup;

  constructor(options: BindGroupOptions) {
    this.gpuBindGroup = State.device.createBindGroup({
      layout: options.layout,
      entries: options.resources.map((resource, i) => ({
        binding: i,
        resource,
      })),
    });
  }
}

export default BindGroup;
