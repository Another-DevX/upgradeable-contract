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
      optimisticEthereum: 'UGB21JYI7XRY68M6IBNNYHPJYTSX2V5ATX',
      celo: 'MEYHE76AYDGJDBFABE35MSC7Y9D3MJXEYI',
      polygon:'WI451TFRWSB2KNTU3SUMRGKBT2AH8K4VHN'

    },
    customChains: [
      {
        network: 'alfajores',
        chainId: 44787,
        urls: {
          apiURL: 'https://api-alfajores.celoscan.io/api',
          browserURL: 'https://alfajores.celoscan.io',
        },
      },
      {
        network: 'celo',
        chainId: 42220,
        urls: {
          apiURL: 'https://api.celoscan.io/api',
          browserURL: 'https://celoscan.io/',
        },
      },
    ],
  },
  networks: {
    sepolia: {
      url: 'https://sepolia.infura.io/v3/d0358b4197454c98ade7e1222e6df34a',
      chainId: 11155111,
    },
    celo: {
      url: 'https://celo-mainnet.infura.io/v3/e8505eb48d474b21af536d38758157f2',
      chainId: 42220,
    },
    optimism: {
      url: 'https://optimism-mainnet.infura.io/v3/e8505eb48d474b21af536d38758157f2',
      chainId: 10,
    },
    polygon: {
      url: 'https://polygon-mainnet.infura.io/v3/e8505eb48d474b21af536d38758157f2',
      chainId: 137,
    },
  },
};

export default config;
