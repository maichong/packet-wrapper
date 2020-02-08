const assert = require("assert");
const PacketWrapper = require("../index");

const buffer = Buffer.from("test buffer");
const encoded = PacketWrapper.encode(buffer);

const wrapper = new PacketWrapper();
wrapper.addChunk(encoded);
const decoded = wrapper.read();

assert(decoded);
assert(wrapper.read() === null);

wrapper.addChunk(encoded);
assert(wrapper.read().equals(buffer));

assert(encoded.length === buffer.length + 5);
assert(decoded.equals(buffer));
