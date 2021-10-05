import * as Network from 'expo-network';
import Constants from 'expo-constants';

export const getClientDetails = async () => {
  const ipAddress = await Network.getIpAddressAsync();
  const userAgent = await Constants.getWebViewUserAgentAsync();

  return {
    ipAddress: ipAddress,
    userAgent: userAgent,
  };
};
