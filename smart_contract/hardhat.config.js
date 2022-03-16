require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/Mgd5aFu-JnjOSvBIUCwMiUfoAayzjtmw',
      accounts: ['0x2f318C334780961FB129D2a6c30D0763d9a5C970'], // account funding contract deploy
    },
  },
};