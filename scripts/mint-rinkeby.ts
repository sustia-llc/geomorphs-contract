import dotenv from 'dotenv';
import { ContractTransaction, ethers } from "ethers";
import { GeoMorphs } from "../typechain";

// hh run --network rinkeby scripts/mint-rinkeby.ts
// https://rinkeby.etherscan.io/address/<contract address>

const abi = [
  'function mintTo(address _to, string _metadata ) public',
]

async function main() {
  dotenv.config();
  const INFURA_API_KEY = process.env.INFURA_API_KEY || '';
  const RINKEBY_PRIVATE_KEY = process.env.RINKEBY_PRIVATE_KEY || '';
  const URL = `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`;
  console.log(`url: ${URL}`);

  const provider = new ethers.providers.JsonRpcProvider(URL);
  const deployer = new ethers.Wallet(RINKEBY_PRIVATE_KEY, provider);
  const deployerAddress = await deployer.getAddress();
  console.log(`deployer address: ${deployerAddress}`);

  const contractAddress = process.env.RINKEBY_CONTRACT_ADDRESS || '';
  console.log(`contractAddress: ${contractAddress}`);  
  const mintToAddress = process.env.MINT_TO_ADDRESS || '';
  console.log(`mintToAddress: ${mintToAddress}`);  

  const contract: GeoMorphs = new ethers.Contract(contractAddress, abi, deployer) as GeoMorphs;

  const mintTokenURI = 'https://arweave.net/-DkL_O5TDgA-edjW2oakcpjk_387IQ1ruqd7dzrhs_Q';

  const receipt: ContractTransaction = await contract.connect(deployer)
    .mintTo(mintToAddress, mintTokenURI, { gasLimit: 3000000 });

  // receipt should include tokenURI with tokenID
  // here is where you would supply metadata to the above address
  // possibly with a REST post that would create json at that address
  // that would contain a link to the mp4, etc.
  console.log('minted:', receipt);
  process.exit(0)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });