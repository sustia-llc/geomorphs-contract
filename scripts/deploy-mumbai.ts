import { ethers } from "hardhat";
import { GeoMorphs__factory, GeoMorphs } from "../typechain";
// run:
// hh run --network matic scripts/deploy-mumbai.ts
// https://explorer-mumbai.maticvigil.com/address/<contract address>
const MUMBAI_PRIVATE_KEY = process.env.MUMBAI_PRIVATE_KEY || '';

const URL = 'https://rpc-mumbai.maticvigil.com';
console.log(`url: ${URL}`);

let geomorphs: GeoMorphs;
let geomorphsFactory: GeoMorphs__factory;

const PROXY_REGISTRATION_ADDRESS = '0xf57b2c51ded3a29e6891aba85459d600256cf317';

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(URL);
  const deployer = new ethers.Wallet(MUMBAI_PRIVATE_KEY, provider);
  const address = await deployer.getAddress();
  console.log(`deployer address: ${address}`);

  geomorphsFactory = (await ethers.getContractFactory(
    'GeoMorphs',
    deployer
  )) as GeoMorphs__factory;

  geomorphs = (await geomorphsFactory.deploy(PROXY_REGISTRATION_ADDRESS)) as GeoMorphs;
  console.log("deployed to:", geomorphs.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
