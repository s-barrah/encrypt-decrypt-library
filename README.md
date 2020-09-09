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
// hello-world-6y6106gq
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
// hello-world-6y6106gq

encryption.encrypt('01234567890')
// hello-world-6y6106gq

// Encoded as string
encryption.encrypt('447777111222')
// TGSkN37JpT3Cn7xiQynavw==

// Encoded as Big Integer
encryption.encrypt('447777111222', true)
// uX8R5SzcKfk=
```

### decrypt(value: string, isBigInt: boolean)
Returns a decrypted __value__.

#### value
Type: `string` -
The token that will be decrypted.

#### isBigInt
Type: `boolean` (optional) -
The type of encrypted value if known. Provides support for Big Integer decryption.

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
encryption.decrypt('TGSkN37JpT3Cn7xiQynavw==')
// 447777111222

// Encoded as Big Integer
encryption.decrypt('uX8R5SzcKfk=', true)
// 447777111222
```

# Semantic release
Release management is automated using [semantic-release](https://www.npmjs.com/package/semantic-release).


## License
[The MIT License](./LICENSE)
