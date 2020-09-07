import crypto from 'crypto';

interface IConfig {
    algorithm: string;
    encryptionKey: string;
    salt: string;
}

export default class Encryption {

    private algorithm: string;
    private key: Buffer;
    private salt: string;

    constructor(config: IConfig) {
        this.algorithm = config.algorithm;
        this.salt = config.salt;
        const ENCRYPTION_KEY = config.encryptionKey ? Buffer.from(config.encryptionKey).toString('hex') : '';
        this.key = Buffer.from(ENCRYPTION_KEY, "hex");
    }

    /**
     * Function to encrypt a string into a url slug
     * @param value string
     * @param isBigInt boolean
     * @return string | null
     */
    encrypt = (value?: string, isBigInt: boolean = false): string => {

        if (!value) {
            throw Error('A value is required!');
        }
        // initialize IV as null as not required by algorithm
        const iv = null;

        // Initialize Cipher
        const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);

        // Return Buffer as a binary encoded string
        let buffer = Buffer.from(value, 'utf8').toString("binary");

        if (isBigInt) {
            // Set byte auto padding to false
            cipher.setAutoPadding(false);

            // allocate Buffer instance 8 bytes
            const buf = Buffer.allocUnsafe(8);

            // Write value to buf instance at the specified offset as big-endian.
            buf.writeBigUInt64BE(BigInt(value));
            buffer = buf.toString("binary");
        }

        // Get encrypted string from cipher
        const firstPart = cipher.update(buffer, "binary", "base64");
        const finalPart = cipher.final("base64")

        // concat and return both parts
        return `${firstPart}${finalPart}`;
    }

    /**
     * Function to decrypt a url token
     * @param value string
     * @param isBigInt boolean
     * @returns string | null
     */
    decrypt = (value?: string, isBigInt: boolean = false): string => {
        if (!value) {
            throw Error('A token is required!');
        }
        // initialize IV as null as it is not required by algorithm
        const iv = null;
        // Initialize Decipher
        const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
        if (isBigInt) {
            // Set byte auto padding to false
            decipher.setAutoPadding(false);
        }
        // encodes encrypted value from base64 to hex
        const buffer = Buffer.from(value, "base64").toString("hex");

        // Get decrypted string from cipher
        // @ts-ignore
        const firstPart = decipher.update(buffer, 'hex', 'base64');
        const finalPart = decipher.final('base64') || '';

        // concat both parts
        const decrypted = `${firstPart}${finalPart}`;

        // Encode decrypted value as a 64-bit Buffer
        const buf = Buffer.from(decrypted, "base64");

        if (isBigInt) {
            // Reads an unsigned, big-endian 64-bit integer from buf at the specified offset
            // and returns as a string
            return buf.readBigUInt64BE(0).toString();
        }
        // convert decrypted value from base64 to utf-8 string
        return buf.toString('utf8');
    }

    /**
     * Function to validate token
     * @param value String
     * @return Boolean
     */
    validateByteLength(value: string) {
        if (value) {
            const byteLength = Buffer.byteLength(value, "base64");
            return byteLength % 8 === 0;
        }
    }


}
