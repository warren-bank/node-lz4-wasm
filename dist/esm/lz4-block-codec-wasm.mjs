import fs   from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const context = {}

const getContext = async () => {
  const old_self      = globalThis.self
  const old_document  = globalThis.document
  globalThis.self     = context
  globalThis.document = {currentScript: {src: ''}}

  await import('../web/lz4-block-codec-wasm.js')

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
        const __filename = fileURLToPath(import.meta.url)
        const __dirname  = path.dirname(__filename)

        const wasmBuffer = fs.readFileSync(path.resolve(__dirname, '../web/lz4-block-codec.wasm'))
        const wasmModule = await WebAssembly.instantiate(wasmBuffer)

        this.lz4wasmInstance = wasmModule.instance
      }
    }

    return old_init.apply(this)
  }
}

/******************************************************************************/

context.init = async () => {
  await getContext()
  patchContext()
}

export default context
