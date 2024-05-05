import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@openzeppelin/hardhat-upgrades';
import { vars } from 'hardhat/config';

require('dotenv').config();

const ETHERSCAN_API_KEY = vars.get('ETHERSCAN_API_KEY');
const config: HardhatUserConfig = {
  // solidity: '0.8.20',
  solidity: {
    version: '0.8.20',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  defender: {
    apiKey: process.env.DEFENDER_KEY as string,
    apiSecret: process.env.DEFENDER_SECRET as string,
    useDefenderDeploy: true,
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
    },
  },
  networks: {
    sepolia: {
      url: 'https://sepolia.infura.io/v3/d0358b4197454c98ade7e1222e6df34a',
      chainId: 11155111,
      // timeout: 9999999,
      // gas: 1240000000,
      // gasPrice: 111000000000,
    },
  },
};

export default config;
