import LZ4Context from '../../dist/esm/lz4-block-codec-js.mjs'

let LZ4BlockJS

const run_tests = async () => {
  try {
    await LZ4Context.init()
    LZ4BlockJS = LZ4Context.LZ4BlockJS
  }
  catch(e) {
    console.log('failed to import:', 'LZ4BlockJS')
  }

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
