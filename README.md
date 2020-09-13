# encrypt-decrypt-library

Multi-level Encryption Library for encrypting strings and big integers into unique tokens, safe for use in URL paths and queries.

## Install
```bash
// Via NPM
$ npm install --save encrypt-decrypt-library

// Via Yarn
$ yarn add encrypt-decrypt-library
```


## Usage

```javascript
import Encryption from "encrypt-decrypt-library";

const config = {
   algorithm: process.env.ALGORITHM,
   encryptionKey: process.env.ENCRYPTION_KEY,
   salt: process.env.SALT,
} 
const encryption = new Encryption(config);

encryption.encrypt('Hello world')
// 3XtsFcHjmBgVfSvhRMmp+A==
```

## Documentation
The library requires the following configuration options:
- algorithm
Type: `string` -
The algorithm to be used by the library

### encrypt(value: string, isBigInt: boolean)
Returns an encrypted __value__.

#### value
Type: `string` -
The value that will be encrypted.

#### isBigInt
Type: `boolean` (optional) -
The type of value. Provides support for Big Integer encryption.

#### Example
```javascript
import Encryption from "encrypt-decrypt-library";

const config = {
   algorithm: process.env.ALGORITHM,
   encryptionKey: process.env.ENCRYPTION_KEY,
   salt: process.env.SALT,
} 
const encryption = new Encryption(config);

encryption.encrypt('Hello world')
// 3XtsFcHjmBgVfSvhRMmp+A==

// Encrypted as a string
encryption.encrypt('1234567890')
// xCyGnx2ZzcrV3SVFz79u1A==

// Encrypted as an unsigned 64-bit Integer
encryption.encrypt(123, true)
// NF1r855MimY=
```

### decrypt(value: string, isBigInt: boolean)
Returns a decrypted __value__.

#### value
Type: `string` -
The token that will be decrypted.

#### isBigInt
Type: `boolean` (optional) -
The type of encrypted value if known. Provides support for decrypting small and big integers.

#### Example
```javascript
import Encryption from "encrypt-decrypt-library";

const config = {
   algorithm: process.env.ALGORITHM,
   encryptionKey: process.env.ENCRYPTION_KEY,
   salt: process.env.SALT,
} 
const encryption = new Encryption(config);

// Encoded as string
encryption.decrypt('gmmBh17Q4QA=')
// 123

// Encoded as Big Integer
encryption.decrypt('NF1r855MimY=', true)
// 123 
```

# Semantic release
Release management is automated using [semantic-release](https://www.npmjs.com/package/semantic-release).


## License
[The MIT License](./LICENSE)
