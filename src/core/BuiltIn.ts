import Variable from "./Variable.js";

/**
 * Represents a built-in shader variable (e.g., @builtin(position), @builtin(vertex_index)).
 */
class BuiltIn extends Variable {
  constructor(
    public name: string,
    public type: string,
    public visibility?: GPUShaderStageFlags,
    public io?: string,
  ) {
    super(name, type);
  }

  public getWGSLString(): string {
    return /* wgsl */ `@builtin(${this.name}) ${this.name}: ${this.wgslType}`;
  }
}

export default BuiltIn;
