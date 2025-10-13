const {LZ4BlockWASM} = require('../../dist/cjs/lz4-block-codec-wasm.cjs')

const run_tests = async () => {
  await test_01()
  await test_02()
}

const test_01 = async () => {
  console.log('LZ4BlockWASM =', typeof LZ4BlockWASM)
  console.log('LZ4BlockWASM.prototype.encodeBlock =', typeof LZ4BlockWASM.prototype.encodeBlock)
  console.log('LZ4BlockWASM.prototype.decodeBlock =', typeof LZ4BlockWASM.prototype.decodeBlock)
}

const test_02 = async () => {
  const lz4 = new LZ4BlockWASM()

  await lz4.init()

  console.log('bytesInUse =', lz4.bytesInUse())
}

run_tests()
