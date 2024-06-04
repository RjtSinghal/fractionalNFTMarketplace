Fractional NFT MarketPlace

setup:

1. npx hardhat init

2. npm i @openzeppelin/contracts

3. npx hardhat compile

4. Update you keys in hardhat.ongig.json and then run the below command

To deploy smart contracts: 
npx hardhat run scripts/deploy.js --network sepolia

5. Verify your smart contracts

To verify smart contracts: 
npx hardhat verify --network <network> <contract address> <constructor parameters>