import { connectServiceClient } from 'architected-client';
import { architectedConfig } from '../architectedConfig';
import { CryptoHelper } from 'architected-crypto-helper-rn';

const cryptoHelper = new CryptoHelper();
const connectClient = connectServiceClient;
connectClient.init(architectedConfig, cryptoHelper);

const startAuthorize = async (codeVerifier, clientDetails) => {
  const { ipAddress, userAgent } = clientDetails;
  console.log('calling connect authorize');

  var request = {
    codeVerifier: codeVerifier,
    ipAddress: ipAddress,
    userAgent: userAgent,
  };
  const response = await connectClient.authorize(request);
  return response;
};

export default startAuthorize;
