const hre = require("hardhat");

async function main() {
  const ProductTracking = await hre.ethers.getContractFactory("ProductTracking");
  const ProductTrackingContract = await ProductTracking.deploy();

  await ProductTrackingContract.waitForDeployment();
  const ProductTrackingAddress = await ProductTrackingContract.getAddress();

  console.log("Contract deployed to:", ProductTrackingAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
