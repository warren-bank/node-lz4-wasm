import LZ4Context from '../../dist/esm/lz4-block-codec-wasm.mjs'

let LZ4BlockWASM

const run_tests = async () => {
  try {
    await LZ4Context.init()
    LZ4BlockWASM = LZ4Context.LZ4BlockWASM
  }
  catch(e) {
    console.log('failed to import:', 'LZ4BlockWASM')
  }

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
