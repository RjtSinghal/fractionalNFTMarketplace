require("@nomicfoundation/hardhat-toolbox");

const ALCHEMY_API_KEY = "FmGDI4UcMBANwWCqwhSao4bikTeERzO1";

const SEPOLIA_PRIVATE_KEY = "6da53b01716bd6b34e6f4c11500c898760a4f2528604e0419c45f8e884652296";

const ETHERSCAN_API_KEY = "17MN6P8B8ASINI8E33EG18AC2FEAZ46KMJ";


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  solidity: "0.8.20",
};
