import { create } from 'ipfs-http-client';

export const createIpfs = () => {
    // const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')
    return create({    host: 'ipfs.infura.io',    port: 5001,    protocol: 'https'}) // ,    headers: { authorization: auth}
}

export const addFileToIpfs = async (ipfs, file) => {
    if(!ipfs) return 

    const result = await ipfs.pin.add(file);
    return `https://ipfs.infura.io/ipfs/${result.path}`
}
