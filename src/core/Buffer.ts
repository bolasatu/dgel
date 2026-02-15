import State from "./State.js";
import { GPUBufferUsage } from "../constants.js";

/**
 * Wrapper around WebGPU GPUBuffer.
 *
 * Provides helper methods to create vertex, index, and uniform buffers,
 * and to update buffer data efficiently.
 */
class Buffer {
  public gpuBuffer: GPUBuffer;

  /**
   * Creates a GPUBuffer with the specified usage and data.
   *
   * @param usage - The usage flags for the buffer.
   * @param data - The initial data to populate the buffer with (optional).
   * @param size - The size of the buffer in bytes (optional, defaults to data length).
   * @returns The created Buffer instance.
   */
  public create(
    usage: GPUBufferUsageFlags,
    data: ArrayBufferView | null,
    size?: number,
  ): Buffer {
    this.gpuBuffer = State.device.createBuffer({
      size: size || data.byteLength,
      usage,
    });
    if (data) this.setSubData(0, data);

    return this;
  }

  /**
   * Creates a vertex buffer initialized with the given data.
   *
   * @param data - The vertex data.
   * @returns The created Buffer instance.
   */
  public vertexBuffer(data: ArrayBufferView): Buffer {
    return this.create(GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST, data);
  }

  /**
   * Creates an index buffer initialized with the given data.
   *
   * @param data - The index data.
   * @returns The created Buffer instance.
   */
  public indexBuffer(data: ArrayBufferView): Buffer {
    return this.create(GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST, data);
  }

  /**
   * Creates a uniform buffer of the specified size.
   *
   * @param size - The size of the uniform buffer in bytes.
   * @returns The created Buffer instance.
   */
  public uniformBuffer(size: number): Buffer {
    return this.create(
      GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      null,
      size,
    );
  }

  // https://github.com/gpuweb/gpuweb/blob/main/design/BufferOperations.md
  /**
   * Updates a range of the buffer with new data.
   * It handles the creation of a temporary staging buffer for the transfer.
   *
   * @param offset - The offset in the buffer to start writing.
   * @param data - The data to write.
   */
  public setSubData(offset: number, data: ArrayBufferView): void {
    const srcArrayBuffer = data.buffer;
    const byteCount = srcArrayBuffer.byteLength;
    const srcBuffer = State.device.createBuffer({
      mappedAtCreation: true,
      size: byteCount,
      usage: GPUBufferUsage.COPY_SRC,
    });
    const arrayBuffer = srcBuffer.getMappedRange();

    new Uint8Array(arrayBuffer).set(new Uint8Array(srcArrayBuffer)); // memcpy
    srcBuffer.unmap();

    this.copyToBuffer(srcBuffer, offset, byteCount);

    srcBuffer.destroy();
  }

  /**
   * Copies data from a source buffer to this buffer.
   *
   * @param srcBuffer - The source GPUBuffer.
   * @param offset - The offset in this buffer to write to.
   * @param byteCount - The number of bytes to copy.
   */
  public copyToBuffer(
    srcBuffer: GPUBuffer,
    offset: number,
    byteCount: number,
  ): void {
    const commandEncoder = State.device.createCommandEncoder();
    commandEncoder.copyBufferToBuffer(
      srcBuffer,
      0,
      this.gpuBuffer,
      offset,
      byteCount,
    );
    State.device.queue.submit([commandEncoder.finish()]);
  }

  public copyToTexture(
    bytesPerRow: number,
    rowsPerImage: number,
    destination: GPUImageCopyTexture,
    extent: GPUExtent3D,
  ): void {
    const commandEncoder = State.device.createCommandEncoder();
    commandEncoder.copyBufferToTexture(
      {
        buffer: this.gpuBuffer,
        bytesPerRow,
        rowsPerImage,
      },
      destination,
      extent,
    );
    State.device.queue.submit([commandEncoder.finish()]);
  }

  public destroy(): void {
    this.gpuBuffer.destroy();
  }
}

export default Buffer;
