require("@nomicfoundation/hardhat-toolbox");

const ALCHEMY_API_KEY = vars.get("ALCHEMY_API_KEY");

const SEPOLIA_PRIVATE_KEY = vars.get("SEPOLIA_PRIVATE_KEY");

const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY");


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    sepolia: {
      // url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      // accounts: [SEPOLIA_PRIVATE_KEY]

      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  },
  etherscan: {
    // apiKey: ETHERSCAN_API_KEY,
    apiKey: ETHERSCAN_API_KEY,
  },
  solidity: "0.8.20",
};
