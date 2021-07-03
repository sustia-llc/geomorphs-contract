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
hh compile
hh test
hh coverage
```
## Local deployment
```sh
hh node
```
In a new terminal, go to the repository's root folder and run this to
deploy your contract:

```sh
hh run --network localhost scripts/deploy-localhost.ts
```

## Set up Metadata and Image for Contract
```sh
npx arweave key-save <json file>

npx arweave deploy assets/geomorphs.jpg
```

After Arweave deployment, update value for "image" in geomorphs-contract.json. Deploy geomorphs-contract.json:
```sh
npx arweave deploy data/geomorphs-contract.json
```

Update "contractURI" in contracts/GeoMorphs.sol

## Set up Metadata and Images for First Minted Work
Arweave image or video should be less than 10MB:
```sh
npx arweave deploy assets/geomorphs-1.mp4
```

After Arweave deployment, update value for "image" in geomorphs-1.json. Deploy geomorphs-1.json:
```sh
npx arweave deploy data/geomorphs-1.json
```

Update mintTokenURI in scripts/mint-rinkeby.ts, scripts/mint-mainnet.ts, and scripts/mint-mumbai.ts with Arweave path to token metadata file

## Deploy to Rinkeby
Get ether on Rinkeby:
https://faucet.rinkeby.io/

Supply the private key of the contract owner in .env:
* RINKEBY_PRIVATE_KEY=

Deploy contract to Rinkeby:
```sh
hh run --network rinkeby scripts/deploy-rinkeby.ts
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
hh run --network rinkeby scripts/mint-rinkeby.ts
```

### Check contract on OpenSea
Go to https://testnets.opensea.io/ connect wallet using the Rinkeby network. Choose "My Collections" and "Import an existing smart contract". Enter the Rinkeby Contract Address.

## Deploy to mainnet
```sh
hh run --network mainnet scripts/deploy-mainnet.ts
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
hh run --network mainnet scripts/mint-mainnet.ts
```

### Check contract on OpenSea
Go to https://opensea.io/ and connect wallet using the mainnet network. Choose "My Collections" and "Import an existing smart contract". Enter the mainnet Contract Address.




