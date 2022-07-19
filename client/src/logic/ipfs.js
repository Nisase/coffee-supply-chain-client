import { create } from 'ipfs-http-client';

export const createIpfs = () => {
  // const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')
  return create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }); // ,    headers: { authorization: auth}
};

export const addFileToIpfs = async (ipfs, file) => {
  if (!ipfs) return { url: null, error: 'IPFS error' };
  try {
    // const result = await ipfs.add(file, {timeout:100});
    const result = await ipfs.add(file);
    return { url: `https://ipfs.infura.io/ipfs/${result.path}`, error: null };
  } catch (error) {
    return { url: null, error: error.message };
  }
};
