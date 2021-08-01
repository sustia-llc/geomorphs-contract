# GeoMorphs for OpenSea

Adapted for hardhat from https://github.com/ProjectOpenSea/opensea-creatures Uses Arweave to store contract and image metadata.

## Quick start

```sh
git clone https://github.com/dynamiculture/geomorphs-contract
cd geomorphs-contract
npm i
# list hardhat tasks:
npx hardhat
```
## Install hardhat-shorthand
```sh
npm i -g hardhat-shorthand
hardhat-completion install
# hh == npx hardhat
```
## Create Infura and Etherscan Accounts
Create free accounts on:
* https://infura.io
* https://etherscan.io

Create .env (listed in .gitignore). Do **not** check in .env to public repo:
```sh
cp .env.sample .env
```
enter the following values into .env:
* INFURA_API_KEY=
* ETHERSCAN_API_KEY=

## Deploy and test locally

Clean, compile and test:
```sh
hh clean
TS_NODE_TRANSPILE_ONLY=1 hh compile
hh compile
hh test
hh coverage
```
## Local deployment and mint
```sh
hh node
```
In a new terminal, go to the repository's root folder and run this to
deploy your contract:

```sh
hh deploy --network localhost
```

update LOCALHOST_CONTRACT_ADDRESS .env with address of newly deployed contract. 

```sh
hh mint-token --network localhost --metadata-uri ar://8_NZWr4K9d6N8k4TDbMzLAkW6cNQnSQMLeoShc8komM
```

## Set up Metadata and Image for Contract
```sh
npx arweave key-save <json file>

npx arweave deploy assets/geomorphs.jpg
```

After Arweave deployment, update value for "image" with the resulting Arweave URL in geomorphs-contract.json. Deploy geomorphs-contract.json:
```sh
npx arweave deploy assets/geomorphs-contract.json
```

Update "contractURI" in contracts/GeoMorphs.sol

## Set up Metadata and Images for First Minted Work
Upload image as a 480x480 animated gif:
```sh
ffmpeg -i geomorphs-1.mp4 -vf scale=480:-1 geomorphs-1.gif
npx arweave deploy assets/geomorphs-1.gif
```

After Arweave deployment, update "image" with the resulting Arweave URL (ar://<hash>) in geomorphs-1.json.

Upload animation_url as a 1024x1024 mp4 with vcodec H.264, pixel format YUV 4:2:0, and CRF 25. Arweave image or video should be less than 10MB:
```sh
npx arweave deploy assets/geomorphs-1.mp4
```

After Arweave deployment, update "animation_url" with the resulting Arweave URL (ar://<hash>) in geomorphs-1.json. Deploy geomorphs-1.json:
```sh
npx arweave deploy assets/geomorphs-1.json
```

Note new Arweave path (ar://<hash>) to token metadata file for minting

## Deploy to Rinkeby
Get ether on Rinkeby:
https://faucet.rinkeby.io/

Supply the private key of the contract owner in .env:
* RINKEBY_PRIVATE_KEY=

Deploy contract to Rinkeby:
```sh
hh deploy --network rinkeby
```
Note the deployed contract's address and update value in .env:
* RINKEBY_CONTRACT_ADDRESS=

### Verify on Rinkeby
Run the following command, by providing the new contract address. The last value is a constructor argument, OpenSea's proxy address on Rinkeby:
```sh
hh verify --network rinkeby --contract contracts/GeoMorphs.sol:GeoMorphs <contract-address> 0xf57b2c51ded3a29e6891aba85459d600256cf317
```
### Check code and abi on Rinkeby
Visit the following URL, by providing the new contract address:
https://rinkeby.etherscan.io/address/_contract-address_

### Mint to Rinkeby
```sh
hh mint-token --network rinkeby --metadata-uri ar://8_NZWr4K9d6N8k4TDbMzLAkW6cNQnSQMLeoShc8komM
```

### Check contract on OpenSea
Go to https://testnets.opensea.io/ connect wallet using the Rinkeby network. Choose "My Collections" and "Import an existing smart contract". Enter the Rinkeby Contract Address.

## Deploy to mainnet
```sh
hh deploy --network mainnet
```

note the depoloyed contract's address and update value in .env:
* MAINNET_CONTRACT_ADDRESS=

### Verify on mainnet
Run the following command, by providing the new contract address. The last value is a constructor argument, OpenSea's proxy address on mainnet:
```sh
hh verify --network mainnet --contract contracts/GeoMorphs.sol:GeoMorphs <contract-address> 0xa5409ec958c83c3f309868babaca7c86dcb077c1
```
### Check code and abi on mainnet
Visit the following URL, by providing the new contract address:
https://etherscan.io/address/_contract-address__#code

### Mint to mainnet
```sh
hh mint-token --network mainnet --metadata-uri ar://8_NZWr4K9d6N8k4TDbMzLAkW6cNQnSQMLeoShc8komM
```

### Check contract on OpenSea
Go to https://opensea.io/ and connect wallet using the mainnet network. Choose "My Collections" and "Import an existing smart contract". Enter the mainnet Contract Address.




