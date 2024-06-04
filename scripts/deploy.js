// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  
  const MyNFT = await hre.ethers.getContractFactory("MyNFT");
  const FractionalMarketplace = await hre.ethers.getContractFactory("FractionalMarketplace");

  const nft = await MyNFT.deploy("0x2d65496c79F6a2331a6a451C2Db629391d002dcB");
  const marketplace = await FractionalMarketplace.deploy("0x2d65496c79F6a2331a6a451C2Db629391d002dcB");

  await nft.deployed();
  await marketplace.deployed();

  console.log("MyNft address is:", nft.address);
  console.log("Marketplace address is :", marketplace.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
