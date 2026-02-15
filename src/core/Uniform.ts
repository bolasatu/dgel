import Variable from "./Variable.js";

/**
 * Represents a uniform variable inside a uniform buffer or storage buffer.
 */
class Uniform extends Variable {
  constructor(
    public name: string,
    public type: string,
    public visibility?: GPUShaderStageFlags,
    public arrayCount?: number,
  ) {
    super(name, type);
  }
}

export default Uniform;
