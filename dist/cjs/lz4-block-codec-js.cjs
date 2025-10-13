const context = {}

const getContext = () => {
  const old_self  = globalThis.self
  globalThis.self = context

  require('../web/lz4-block-codec-js.js')

  globalThis.self = old_self
}

const patchContext = () => {
  //const {LZ4BlockJS} = context
}

/******************************************************************************/

getContext()
patchContext()

module.exports = context
