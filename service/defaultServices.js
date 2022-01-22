import {
  iamServiceClient,
  fileServiceClient,
  profileServiceClient,
} from 'architected-client';
import { architectedConfig } from '../architectedConfig';
import startAuthorize from '../helper/authorizeHelper';
import { CryptoHelper } from 'architected-crypto-helper-rn';

const cryptoHelper = new CryptoHelper();

const iamClient = iamServiceClient;
iamClient.init(architectedConfig, cryptoHelper, startAuthorize);

const fileClient = fileServiceClient;
fileClient.init(architectedConfig);

const profileClient = profileServiceClient;
profileClient.init(architectedConfig);

export { iamClient, fileClient, profileClient };
