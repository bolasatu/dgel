import Pass from "./Pass.js";
import Pipeline from "./Pipeline.js";
import Buffer from "./Buffer.js";
import BindGroup from "./BindGroup.js";

import { GPUIndexFormat } from "../constants.js";

/**
 * Represents a GPU command (draw or dispatch).
 *
 * It encapsulates the pipeline state, vertex/index buffers, bind groups, and draw parameters.
 * It can also define a render or compute pass when used as a container.
 */
class Command {
  public pass?: Pass;
  public pipeline?: Pipeline;

  public vertexBuffers?: Buffer[];
  public indexBuffer?: Buffer;
  public indexFormat?: GPUIndexFormat = GPUIndexFormat.Uint32;
  public bindGroups?: BindGroup[];

  public count?: number;
  public instances?: number;

  public dispatchWorkgroups?: number | [number, number?, number?];

  constructor(options: Command) {
    Object.assign(this, options);
  }
}

export default Command;
