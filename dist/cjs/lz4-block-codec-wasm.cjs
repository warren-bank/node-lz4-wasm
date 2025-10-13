const fs   = require('node:fs')
const path = require('node:path')

const context = {}

const getContext = () => {
  const old_self      = globalThis.self
  const old_document  = globalThis.document
  globalThis.self     = context
  globalThis.document = {currentScript: {src: ''}}

  require('../web/lz4-block-codec-wasm.js')

  globalThis.self     = old_self
  globalThis.document = old_document
}

const patchContext = () => {
  const {LZ4BlockWASM} = context
  const old_init = LZ4BlockWASM.prototype.init

  LZ4BlockWASM.prototype.init = async function() {
    if (this.lz4wasmInstance === undefined) {
      if (
        typeof WebAssembly !== 'object' ||
        typeof WebAssembly.instantiate !== 'function'
      ) {
        this.lz4wasmInstance = null
      }
      else {
        const wasmBuffer = fs.readFileSync(path.resolve(__dirname, '../web/lz4-block-codec.wasm'))
        const wasmModule = await WebAssembly.instantiate(wasmBuffer)

        this.lz4wasmInstance = wasmModule.instance
      }
    }

    return old_init.apply(this)
  }
}

/******************************************************************************/

getContext()
patchContext()

module.exports = context
