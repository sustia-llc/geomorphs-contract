import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

import { task } from "hardhat/config";
import { HardhatUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-waffle";
import "hardhat-gas-reporter";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-typechain";
import "solidity-coverage";

import "./tasks/accounts";
import "./tasks/deployment/deploy";
import "./tasks/operations/mint-token";

const INFURA_API_KEY = process.env.INFURA_API_KEY || "";
const MAINNET_PRIVATE_KEY =
    process.env.MAINNET_PRIVATE_KEY ||
    "";
const RINKEBY_PRIVATE_KEY =
    process.env.RINKEBY_PRIVATE_KEY ||
    "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    solidity: {
        compilers: [{ version: "0.8.6", settings: {} }],
    },
    networks: {
        hardhat: {
            initialBaseFeePerGas: 0, //https://github.com/sc-forks/solidity-coverage/issues/652
        },
        localhost: {},
        mainnet: {
            url: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
            accounts: [MAINNET_PRIVATE_KEY],
        },
        rinkeby: {
            url: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`,
            accounts: [RINKEBY_PRIVATE_KEY],
        },
        coverage: {
            url: "http://127.0.0.1:8555", // Coverage launches its own ganache-cli client
        },
    },
    etherscan: {
        // Your API key for Etherscan
        // Obtain one at https://etherscan.io/
        apiKey: ETHERSCAN_API_KEY,
    },
};

export default config;