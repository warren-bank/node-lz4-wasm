import {lz4BlockCodec} from '../../dist/esm/lz4-block-codec-any.mjs'

let LZ4BlockJS
let LZ4BlockWASM

const init = async () => {
  let LZ4Context

  LZ4Context = (await import('../../dist/esm/lz4-block-codec-js.mjs')).default
  await LZ4Context.init()
  LZ4BlockJS = LZ4Context.LZ4BlockJS

  LZ4Context = (await import('../../dist/esm/lz4-block-codec-wasm.mjs')).default
  await LZ4Context.init()
  LZ4BlockWASM = LZ4Context.LZ4BlockWASM
}

const run_tests = async () => {
  await init()

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
