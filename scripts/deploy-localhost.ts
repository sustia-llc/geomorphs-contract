import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { GeoMorphs__factory, GeoMorphs } from "../typechain";

let geomorphs: GeoMorphs;
let geomorphsFactory: GeoMorphs__factory;
let deployer: SignerWithAddress;

const RINKEBY_PRIVATE_KEY = process.env.MAINNET_PRIVATE_KEY || '';

const PROXY_REGISTRATION_ADDRESS = '0xa5409ec958c83c3f309868babaca7c86dcb077c1';

async function main() {
  [deployer] = await ethers.getSigners();
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
