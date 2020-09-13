import chai from 'chai';

import Encryption from "../src/encryption";

const expect = chai.expect;

describe('Encryption', () => {
    const config = {
        algorithm: process.env.ALGORITHM,
        encryptionKey: process.env.ENCRYPTION_KEY,
        salt: process.env.SALT,
    }

    describe('Ensuring encrypting and decrypting of string and number', () => {

        it('should encrypt and decrypt the string correctly', () => {
            const testString = 'The world goes round and round';
            const encryptionLibrary = new Encryption(config);
            const encrypted = encryptionLibrary.encrypt(testString);
            const decrypted = encryptionLibrary.decrypt(encrypted);
            expect(encrypted.length > 0).to.eql(true);
            expect(testString).to.eql(decrypted);
        });

        it('should encrypt and decrypt the number as a big integer correctly', () => {
            const testNumber = 1234567890;
            const encryptionLibrary = new Encryption(config);
            const encrypted = encryptionLibrary.encrypt(testNumber, true);
            const decrypted = encryptionLibrary.decrypt(encrypted, true);
            expect(encrypted.length > 0).to.eql(true);
            expect(String(testNumber)).to.eql(decrypted);
        });

        it('should encrypt and decrypt the number as an unsigned 64-bit integer correctly', () => {
            const testNumber = 123;
            const encryptionLibrary = new Encryption(config);
            const encrypted = encryptionLibrary.encrypt(testNumber, true);
            const decrypted = encryptionLibrary.decrypt(encrypted, true);
            expect(encrypted.length > 0).to.eql(true);
            expect(String(testNumber)).to.eql(decrypted);
        });

        it('should encrypt and decrypt the number as a string correctly', () => {
            const testNumber = '123';
            const encryptionLibrary = new Encryption(config);
            const encrypted = encryptionLibrary.encrypt(testNumber) || '';
            const decrypted = encryptionLibrary.decrypt(encrypted);
            expect(encrypted.length > 0).to.eql(true);
            expect(testNumber).to.eql(decrypted);
        });
    });

    describe('Ensure decrypting of unsigned big endian token into a valid number', () => {
        it('should decrypt the encoded slug to a Big Integer correctly', () => {
            const decrypted = new Encryption(config).decrypt('NF1r855MimY=', true);
            expect(decrypted.length > 0).to.eql(true);
            expect(decrypted).to.eql('123');
        });
    });

    describe('Ensure decrypting of string token into a valid string', () => {
        it('should decrypt the encoded slug to a valid string correctly', () => {
            const decrypted = new Encryption(config).decrypt('3XtsFcHjmBgVfSvhRMmp+A==') || '';
            expect(decrypted.length > 0).to.eql(true);
            expect(decrypted).to.eql('Hello world');
        });
    });


    describe('Ensure decrypting of an 8-byte Big integer token into a valid number', () => {
        it('should decrypt the encoded slug to a Big Integer correctly', () => {
            const decrypted = new Encryption(config).decrypt('n4a98Hps93o=', true);
            expect(decrypted.length > 0).to.eql(true);
            expect(decrypted).to.eql('12345678901234567890');
        });
    });

    describe('Ensure validation of encrypt or decrypt methods ', () => {
        it('should return an error message if encrypt has no value', () => {
            expect(() => new Encryption(config).encrypt()).to.throw('A value is required!');
        });

        it('should return an error message if decrypt has no value', () => {
            expect(() => new Encryption(config).decrypt()).to.throw('A token is required!');
        });
    });

    describe('Ensure validation of library with no configuration', () => {
        it('should fail to encrypt the string correctly and return an error message', () => {
            expect(() => new Encryption({}).encrypt('The world goes round and round')).to.throw('Configuration Error!');
        });
        it('should fail to decrypt the string correctly and return an error message', () => {
            expect(() => new Encryption({}).decrypt('n4a98Hps93o=', true)).to.throw('Configuration Error!');
        });
    });

});
