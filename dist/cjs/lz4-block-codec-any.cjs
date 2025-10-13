const createInstanceWASM = async () => {
  const {LZ4BlockWASM} = require('./lz4-block-codec-wasm.cjs')

  if (LZ4BlockWASM instanceof Function) {
    const instance = new LZ4BlockWASM()
    await instance.init()

    return instance
  }
  else {
    return null
  }
}

const createInstanceJS = async () => {
  const {LZ4BlockJS} = require('./lz4-block-codec-js.cjs')

  if (LZ4BlockJS instanceof Function) {
    const instance = new LZ4BlockJS()
    await instance.init()

    return instance
  }
  else {
    return null
  }
}

const createInstance = async function(flavor) {
  switch(flavor) {
    case 'wasm':
      return createInstanceWASM()
    case 'js':
      return createInstanceJS()
    default:
      {
        const instance = await createInstanceWASM()
        return !!instance
          ? instance
          : createInstanceJS()
      }
  }
}

/******************************************************************************/

module.exports = {
  lz4BlockCodec: {createInstance}
}
