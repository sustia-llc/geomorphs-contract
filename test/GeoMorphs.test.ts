import { ethers } from "hardhat";
import chai from "chai";
import { GeoMorphs__factory, GeoMorphs } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

const { expect } = chai;

let geomorphs: GeoMorphs;
let geomorphsFactory: GeoMorphs__factory;
let deployer: SignerWithAddress;
let other: SignerWithAddress;

const PROXY_REGISTRATION_ADDRESS = "0xf57b2c51ded3a29e6891aba85459d600256cf317";
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

describe("geomorphs", () => {

    beforeEach(async () => {
        [deployer, other] = await ethers.getSigners();
        geomorphsFactory = (await ethers.getContractFactory(
            'GeoMorphs',
            deployer
        )) as GeoMorphs__factory;

        geomorphs = (await geomorphsFactory.deploy(PROXY_REGISTRATION_ADDRESS)) as GeoMorphs;
        expect(geomorphs.address).to.properAddress;
    });

    describe("deployment", async () => {
        it('deployer is owner', async () => {
            expect(await geomorphs.owner()).to.equal(deployer.address);
        });
    });

    describe("minting", async () => {
        it('deployer can mint tokens', async () => {
            const tokenId = ethers.BigNumber.from(1);
            const tokenURI = "https://eth.iwahi.com/1df0";

            await expect(geomorphs.connect(deployer).mintTo(other.address, tokenURI))
                .to.emit(geomorphs, 'Transfer')
                .withArgs(ZERO_ADDRESS, other.address, tokenId);
            
            expect(await geomorphs.balanceOf(other.address)).to.equal(1);
            expect(await geomorphs.ownerOf(tokenId)).to.equal(other.address);

            expect(await geomorphs.tokenURI(tokenId)).to.equal(tokenURI);
        });

        it('other accounts cannot mint tokens', async () => {
            const tokenURI = "https://eth.iwahi.com/2d3a";
            await expect(geomorphs.connect(other).mintTo(other.address, tokenURI))   
                .to.be.revertedWith('Ownable: caller is not the owner');
        });
    });
});


