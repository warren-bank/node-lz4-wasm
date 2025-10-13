const createInstanceWASM = async () => {
  const LZ4Context = (await import('./lz4-block-codec-wasm.mjs')).default
  await LZ4Context.init()
  const LZ4BlockWASM = LZ4Context.LZ4BlockWASM

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
  const LZ4Context = (await import('./lz4-block-codec-js.mjs')).default
  await LZ4Context.init()
  const LZ4BlockJS = LZ4Context.LZ4BlockJS

  if (LZ4BlockJS instanceof Function) {
    const instance = new LZ4BlockJS()
    await instance.init()

    return instance
  }
  else {
    return null
  }
}

/******************************************************************************/

export const createInstance = async function(flavor) {
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

export const lz4BlockCodec = {createInstance}

export default lz4BlockCodec
