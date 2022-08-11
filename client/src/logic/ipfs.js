import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';

const projectId = process.env.REACT_APP_IPFS_PROJECT_ID;
const projectSecret = process.env.REACT_APP_IPFS_KEY;
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString('base64')}`;

export const createIpfs = () => {
  // const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')
  return create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth,
    },
  }); // ,    headers: { authorization: auth}
};

export const addFileToIpfs = async (ipfs, file) => {
  if (!ipfs) return { url: null, error: 'IPFS error' };
  try {
    // const result = await ipfs.add(file, {timeout:100});
    const result = await ipfs.add(file);
    // return { url: `https://ipfs.infura.io/ipfs/${result.path}`, error: null };
    return { url: `https://coffeetrack.infura-ipfs.io/ipfs/${result.path}`, error: null };
  } catch (error) {
    return { url: null, error: error.message };
  }
};
