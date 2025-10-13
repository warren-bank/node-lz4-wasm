const context = {}

const getContext = async () => {
  const old_self  = globalThis.self
  globalThis.self = context

  await import('../web/lz4-block-codec-js.js')

  globalThis.self = old_self
}

const patchContext = () => {
  //const {LZ4BlockJS} = context
}

/******************************************************************************/

context.init = async () => {
  await getContext()
  patchContext()
}

export default context
