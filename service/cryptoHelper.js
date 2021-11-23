import * as Crypto from 'expo-crypto';
import { CryptoEncoding } from 'expo-crypto';
import * as Random from 'expo-random';

const alphanumericCharacters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');

export default class CryptoHelper {
  constructor() {
    this.generateCodeVerifier = this.generateCodeVerifier.bind(this);
    this.generateChallenge = this.generateChallenge.bind(this);
    this.generateRandomString = this.generateRandomString.bind(this);
  }

  generateCodeVerifier = async () => {
    console.log('CryptoHelper:generateCodeVerifier:start:');
    const code = await this.generateRandomString(100);
    console.log('CryptoHelper:generateCodeVerifier:finish:' + code);
    return code;
  };

  generateChallenge = async (value) => {
    console.log('CryptoHelper:generateChallenge:start:');
    const cryptoDigestOptions = { encoding: CryptoEncoding.BASE64 };
    const digest = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      value,
      cryptoDigestOptions
    );
    return digest;
  };

  generateRandomString = async (length) => {
    console.log('CryptoHelper:generateRandomString:start:');
    // Generating entropy is faster than complex math operations, so we use the simplest way
    const characterCount = alphanumericCharacters.length;
    const maxValidSelector =
      Math.floor(0x10000 / characterCount) * characterCount - 1; // Using values above this will ruin distribution when using modular division
    const entropyLength = 2 * Math.ceil(1.1 * length); // Generating a bit more than required so chances we need more than one pass will be really low
    let string = '';
    let stringLength = 0;

    while (stringLength < length) {
      // In case we had many bad values, which may happen for character sets of size above 0x8000 but close to it
      const entropy = await Random.getRandomBytesAsync(entropyLength); // eslint-disable-line no-await-in-loop
      let entropyPosition = 0;

      while (entropyPosition < entropyLength && stringLength < length) {
        const entropyValue = entropy[entropyPosition];
        entropyPosition += 2;
        if (entropyValue > maxValidSelector) {
          // Skip values which will ruin distribution when using modular division
          continue;
        }

        string += alphanumericCharacters[entropyValue % characterCount];
        stringLength++;
      }
    }

    return string;
  };
}
