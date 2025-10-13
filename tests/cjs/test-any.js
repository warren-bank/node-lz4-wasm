const {lz4BlockCodec} = require('../../dist/cjs/lz4-block-codec-any.cjs')

const {LZ4BlockJS} = require('../../dist/cjs/lz4-block-codec-js.cjs')
const {LZ4BlockWASM} = require('../../dist/cjs/lz4-block-codec-wasm.cjs')

const run_tests = async () => {
  await test_01()
  await test_02('js')
  await test_02('wasm')
  await test_02()
}

const test_01 = async () => {
  console.log('lz4BlockCodec =', typeof lz4BlockCodec)
  console.log('lz4BlockCodec.createInstance =', typeof lz4BlockCodec.createInstance)
}

const test_02 = async (flavor) => {
  const lz4 = await lz4BlockCodec.createInstance(flavor)
  const clz = (lz4 instanceof LZ4BlockJS) ? 'LZ4BlockJS' : (
    (lz4 instanceof LZ4BlockWASM) ? 'LZ4BlockWASM' : 'null'
  )

  console.log(`lz4BlockCodec.createInstance(${flavor ? `'${flavor}'` : ''}) =`, clz)
}

run_tests()
