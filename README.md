[![CircleCI](https://circleci.com/gh/s-barrah/encrypt-decrypt-library.svg?style=svg)](https://app.circleci.com/pipelines/github/s-barrah/encrypt-decrypt-library)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![semantic-release](https://badge.fury.io/js/encrypt-decrypt-library.svg)](https://www.npmjs.com/package/encrypt-decrypt-library)

# encrypt-decrypt-library

Simple Encryption Library for encrypting strings and integers into unique tokens, safe for use in URL paths and queries. Supports 64bit signed and unsigned big endians.

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
// xxxxxxx
```

## Documentation
The library requires the following configuration options:
- **algorithm**: `String` - The algorithm type to be used by the library

- **encryptionKey**: `String` - The encryption key to be used by the library

- **salt**: `String` - The salt to be used by the library

### encrypt(value: string, isInt: boolean)
Returns an encrypted __value__.

#### value
Type: `string` -
The value that will be encrypted.

#### isInt
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

// Encrypted as a string
encryption.encrypt('Hello world')

// Encrypted as a string
encryption.encrypt('1234567890')

// Encrypted as an unsigned 64-bit Integer
encryption.encrypt(123, true)
```

### decrypt(value: string, isInt: boolean)
Returns a decrypted __value__.

#### value
Type: `string` -
The token that will be decrypted.

#### isInt
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
// xxx

// Encoded as an integer
encryption.decrypt('NF1r855MimY=', true)
// xxx 
```

# Semantic release
Release management is automated using [semantic-release](https://www.npmjs.com/package/semantic-release).


## License
[The MIT License](./LICENSE)
