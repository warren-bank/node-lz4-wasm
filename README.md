### [lz4-wasm](https://github.com/warren-bank/node-lz4-wasm)

LZ4 block format encoder/decoder: a WebAssembly implementation with fallback to a pure JavaScript implementation.

LZ4 block format is implemented, as per the [official documentation](https://github.com/lz4/lz4/blob/dev/doc/lz4_Block_format.md).

LZ4 frame format is not implemented at this time.

#### Credits

[Raymond Hill](https://github.com/gorhill) wrote [lz4-wasm](https://github.com/gorhill/lz4-wasm) to run in a web browser.

This release includes an [unmodified copy](./dist/web/) of [his library](https://github.com/gorhill/lz4-wasm/tree/8995cdef7b3adc4a4d2fc4fc86b84a86789ff858/dist), and adds both [CommonJS](./dist/cjs/) and [ESM](./dist/esm/) wrappers.. so the library can be loaded as a module in either JS ecosystem.

#### Installation

npm:
```bash
  npm install --global "@warren-bank/lz4-wasm"
```

#### Usage

CommonJS:
```js
  const {lz4BlockCodec} = require('@warren-bank/lz4-wasm')
```

ESM:
```js
  import {lz4BlockCodec} from '@warren-bank/lz4-wasm'
```

common:
```js
  // Exact values 'wasm' and 'js' have no fallback.
  // Any other value 1st attempts 'wasm', then uses 'js' as fallback.
  const flavors = [null, 'wasm', 'js']

  const lz4 = await lz4BlockCodec.createInstance(flavors[0])

  if (lz4)
    console.log('bytesInUse =', lz4.bytesInUse())
  else
    console.log('error loading..')
```

Refer to the [tests](./tests/) for more complete examples of usage.

#### Benchmarks

The original repo provides a [test &amp; benchmark page](https://gorhill.github.io/lz4-wasm/test/index.html) that uses javascript implementations of other compression libraries, solely for the purpose of comparison.

#### Legal

* copyright: [Raymond Hill](https://github.com/gorhill)
* license: [BSD-2-Clause](https://github.com/gorhill/lz4-wasm/raw/8995cdef7b3adc4a4d2fc4fc86b84a86789ff858/LICENSE)
