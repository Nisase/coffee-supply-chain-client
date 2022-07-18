import { infuraGetUserERC20 } from './erc20';
import roleData from '../data/roles.json';

const getUserInfura = async (address) => {
  try {
    const erc20 = infuraGetUserERC20();
    const userTemp = await erc20.callStatic.getUser(address);

    const roleApp = [];
    // console.log(userTemp);
    if (userTemp && userTemp.role.length > 0) {
      userTemp.role.forEach((iRol) => {
        roleData.forEach((jRol) => {
          if (jRol.key === iRol) roleApp.push(jRol);
        });
      });
    }
    // console.log(roleApp);

    return {
      name: userTemp.name,
      email: userTemp.email,
      role: roleApp,
      isActive: userTemp.isActive,
      profileHash: userTemp.profileHash === '' ? '/static/mock-images/avatars/farmer-avatar.png' : userTemp.profileHash,
      message: null,
    };
  } catch (error) {
    return { message: error };
  }
};

export default getUserInfura;
