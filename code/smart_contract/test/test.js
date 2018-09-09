const AssetOwnership = artifacts.require('./AssetOwnership.sol')
const TestToken = artifacts.require("./TestToken.sol")
const MintSale = artifacts.require("./MintSale.sol")
require('truffle-test-utils').init()
// var BigNumber = require('bignumber.js');
// const createKeccakHash = require('keccak');
// const crypto = require('crypto');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const web3 = global.web3;
const price = 10;
const token721id = 1;

contract('ERC721', ([acc1, owner]) => {


    before(`init`, async () => {
        console.log('acc1:', acc1, ', owner:', owner)
    });


    it(`[T2001]`, async () => {

        AssetOwnershipInstance = await AssetOwnership.new({from:owner})
        console.log('AssetOwnershipInstance:', AssetOwnershipInstance.address)
        //TestTokenInstance = await TestToken.new(acc1, acc2, web3.toWei(1000),  {from:owner})
        TestTokenInstance = web3.eth.contract(TestToken.abi).at('0x46e4df4b9c3044f12543adaa8ad0609d553041f9')
        console.log('TestTokenInstance:', TestTokenInstance.address)
        MintSaleInstance = await MintSale.new(AssetOwnershipInstance.address, {from:owner})
        console.log('mintSaleInstance:', MintSaleInstance.address)

        console.log('')
        console.log('-------------------------------------------')
        console.log('')

        console.log('var AssetOwnershipAbi = web3.eth.contract(' + JSON.stringify(AssetOwnershipInstance.abi) + ');')
        console.log('vat AssetOwnershipInstance = AssetOwnershipAbi.at("', AssetOwnershipInstance.address, '");')

        console.log('var TestTokenAbi = web3.eth.contract(' + JSON.stringify(TestTokenInstance.abi) + ');')
        console.log('vat TestTokenInstance = TestTokenAbi.at("', TestTokenInstance.address, '");')

        console.log('var MintSaleAbi = web3.eth.contract(' + JSON.stringify(MintSaleInstance.abi) + ');')
        console.log('vat MintSaleInstance = MintSaleAbi.at("', MintSaleInstance.address, '");')

        console.log('')
        console.log('-------------------------------------------')
        console.log('')


        await AssetOwnershipInstance.setMintAddress(MintSaleInstance.address, {from:owner})
        console.log('1')
        await MintSaleInstance.setERC721Address(AssetOwnershipInstance.address, {from:owner})
        console.log('2')
        await MintSaleInstance.setERC20Address(TestTokenInstance.address, {from:owner})
        console.log('3')


        MintSaleInstance.mintAsset(price, {from:owner})
        MintSaleInstance.mintAsset(price, {from:owner})
        MintSaleInstance.mintAsset(price, {from:owner})
        await MintSaleInstance.mintAsset(price, {from:owner})
        console.log('token721id:', token721id)

        let userTokenBalaneBefore = await TestTokenInstance.balanceOf(acc1)
        console.log("before user token balance of:", userTokenBalaneBefore)

        let mintBefore = await TestTokenInstance.balanceOf(MintSaleInstance.address)
        console.log("before mintBefore token balance of:", mintBefore)

        let ownerBefore = await AssetOwnershipInstance.ownerOf(token721id)
        console.log('before 721 owner:', ownerBefore)

        await TestTokenInstance.approve(MintSaleInstance.address, price, {from:acc1, gas:300000})
        await MintSaleInstance.buyERC721(token721id, price, {from:acc1, gas:300000})

        let userTokenBalaneAfter = await TestTokenInstance.balanceOf(acc1)
        console.log("after user token balance of:", userTokenBalaneAfter)

        let mintaf = await TestTokenInstance.balanceOf(MintSaleInstance.address)
        console.log("after mintBefore token balance of:", mintaf)

        let ownerAfter = await AssetOwnershipInstance.ownerOf(token721id)
        console.log('after 721 owner:', ownerAfter)


    });
})