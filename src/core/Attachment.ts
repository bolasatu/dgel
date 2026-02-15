import { AttachmentOptions } from "../types.js";

/**
 * Represents an attachment (color or depth/stencil) for a render pass.
 *
 * It defines how the attachment is loaded (clear/load) and stored, and the clear value.
 */
class Attachment {
  public op: GPULoadOp = "clear";
  public storeOp: GPUStoreOp = "store";

  public view?: GPUTextureView;
  public resolveTarget?: GPUTextureView;

  constructor(
    public value: GPUColorDict | GPUColor | number,
    options: AttachmentOptions,
  ) {
    Object.assign(this, options);
  }
}

export default Attachment;
