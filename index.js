var endBuffer = Buffer.from("\n");

function PacketWrapper() {
  /**
   * @type Buffer
   */
  this.chunk = null;
}

/**
 * @param {Buufer} chunk
 */
PacketWrapper.prototype.addChunk = function(chunk) {
  if (this.chunk) {
    this.chunk = Buffer.concat([this.chunk, chunk]);
  } else {
    this.chunk = chunk;
  }
};

/**
 * @returns {Buffer|null}
 */
PacketWrapper.prototype.read = function() {
  if (!this.chunk) return null;
  var length = this.chunk.readInt32BE();
  if (this.chunk.length < length) return null;
  var chunk = this.chunk.slice(4, length - 1);
  if (this.chunk.length === length) {
    this.chunk = null;
  } else {
    this.chunk = this.chunk.slice(length);
  }
  return chunk;
};

PacketWrapper.prototype.encode = function(buffer) {
  return PacketWrapper.encode(buffer);
};

/**
 * @param {Buufer|string} chunk
 */
PacketWrapper.encode = function(buffer) {
  if (typeof buffer === "string") buffer = Buffer.from(buffer);
  buffer = Buffer.concat([Buffer.allocUnsafe(4), buffer, endBuffer]);
  buffer.writeInt32BE(buffer.length);
  return buffer;
};

module.exports = PacketWrapper;
