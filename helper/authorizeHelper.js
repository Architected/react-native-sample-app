import connectInit from '../service/connectInit';

const startAuthorize = async (codeVerifier, clientDetails) => {
  const { ipAddress, userAgent } = clientDetails;

  console.log('calling connect authorize');

  var request = {
    codeVerifier: codeVerifier,
    ipAddress: ipAddress,
    userAgent: userAgent,
  };

  const connectService = connectInit();
  const response = await connectService.authorize(request);

  return response;
};

export default startAuthorize;
