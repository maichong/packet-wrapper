declare class PacketWrapper {
  static encode(buffer: Buffer): Buffer;
  encode(buffer: Buffer): Buffer;
  addChunk(chunk: Buffer): void;
  read(): Buffer | null;
}

export = PacketWrapper;
