// import { Base64 } from 'crypto-es/lib/enc-base64.js';
// import { SHA256 } from 'crypto-es/lib/sha256.js';
// import uuid from 'react-native-uuid';

// const alphanumericCharacters =
//   'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');

// export class CryptoHelper {
//   constructor() {
//     this.generateCodeVerifier = this.generateCodeVerifier.bind(this);
//     this.generateChallenge = this.generateChallenge.bind(this);
//     this.generateRandomString = this.generateRandomString.bind(this);
//   }

//   generateCodeVerifier = () => {
//     return this.generateRandomString(100);
//   };

//   generateChallenge = (value) => {
//     const digest = SHA256(value);
//     return Base64.stringify(digest);
//   };

//   convertToBytes = (val) => {
//     const formattedString = val.replace('-', '');
//     const valArray = new Uint8Array(formattedString.length);
//     for (var i = 0; i < formattedString.length; i++) {
//       console.log(
//         'formattedString.charCodeAt(i):' + formattedString.charCodeAt(i)
//       );
//       valArray[i] = formattedString.charCodeAt(i);
//     }

//     return valArray;
//   };

//   generateRandomString = (requiredLength) => {
//     const characterCount = alphanumericCharacters.length;
//     let randomString = '';
//     let stringLength = 0;

//     while (stringLength < requiredLength) {
//       const newUuid = uuid.v4();
//       console.log('newUuid:' + newUuid);
//       let randomBytes = convertToBytes(newUuid);
//       let position = 0;

//       while (position < 16 && stringLength < requiredLength) {
//         randomString +=
//           alphanumericCharacters[randomBytes[position] % characterCount];
//         position++;
//         stringLength++;
//       }
//     }

//     return randomString;
//   };
// }
