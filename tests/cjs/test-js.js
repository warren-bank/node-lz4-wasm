const {LZ4BlockJS} = require('../../dist/cjs/lz4-block-codec-js.cjs')

const run_tests = async () => {
  await test_01()
  await test_02()
}

const test_01 = async () => {
  console.log('LZ4BlockJS =', typeof LZ4BlockJS)
  console.log('LZ4BlockJS.prototype.encodeBlock =', typeof LZ4BlockJS.prototype.encodeBlock)
  console.log('LZ4BlockJS.prototype.decodeBlock =', typeof LZ4BlockJS.prototype.decodeBlock)
}

const test_02 = async () => {
  const lz4 = new LZ4BlockJS()

  await lz4.init()

  console.log('bytesInUse =', lz4.bytesInUse())
}

run_tests()
