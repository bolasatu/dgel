import State from "./State.js";

/**
 * Wrapper around WebGPU GPUSampler.
 *
 * Defines how a texture is sampled (filtering, addressing modes).
 */
class Sampler {
  public gpuSampler: GPUSampler;

  constructor(
    descriptor: GPUSamplerDescriptor = {
      magFilter: "linear",
      minFilter: "linear",
      mipmapFilter: "linear",
    },
  ) {
    this.gpuSampler = State.device.createSampler(descriptor);
  }
}

export default Sampler;
