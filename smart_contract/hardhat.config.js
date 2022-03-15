// https://eth-ropsten.alchemyapi.io/v2/Mgd5aFu-JnjOSvBIUCwMiUfoAayzjtmw

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/Mgd5aFu-JnjOSvBIUCwMiUfoAayzjtmw',
      accounts: ['406b43f0b8c5af74205aa14303b32e6b5900aa9689aaa1b4a3e172fa9b8ca4b9'],
    },
  },
};