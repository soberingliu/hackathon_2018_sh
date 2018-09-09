//require('truffle-test-utils').init()
var web3 = require('web3');
var crypto = require("crypto");
const createKeccakHash = require('keccak');
const secp256k1 = require('secp256k1');
var assert = require('assert')
var wanWeb3 = new web3(new web3.providers.HttpProvider('http://18.236.235.133:8545'));
var ethWeb3 = new web3(new web3.providers.HttpProvider('http://18.236.235.133:18545'));

var abiwanhtlc = [{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"xHash","type":"bytes32"},{"name":"wanAddr","type":"address"},{"name":"value","type":"uint256"}],"name":"inboundLock","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"RATIO_PRECISE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"storemanGroup","type":"address"},{"name":"value","type":"uint256"}],"name":"getOutboundFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"tokenManager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"xHash","type":"bytes32"}],"name":"inboundRevoke","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"quotaLedger","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"xHash","type":"bytes32"},{"name":"storeman","type":"address"},{"name":"ethAddr","type":"address"},{"name":"value","type":"uint256"}],"name":"outboundLock","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"tokenID","type":"address"},{"name":"xHash","type":"bytes32"}],"name":"getHTLCLeftLockedTime","outputs":[{"name":"time","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"xHash","type":"bytes32"}],"name":"outboundRevoke","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"}],"name":"mapXHashShadow","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"x","type":"bytes32"}],"name":"inboundRefund","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"DEF_LOCKED_TIME","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"setTokenManager","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"x","type":"bytes32"}],"name":"outboundRefund","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"storemanGroupAdmin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"setStoremanGroupAdmin","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lockedTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"revokeFeeRatio","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"}],"name":"mapXHashHTLCTxs","outputs":[{"name":"direction","type":"uint8"},{"name":"source","type":"address"},{"name":"destination","type":"address"},{"name":"value","type":"uint256"},{"name":"status","type":"uint8"},{"name":"lockedTime","type":"uint256"},{"name":"beginLockedTime","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"halted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"mapTokenSupported","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"DEF_MAX_TIME","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ratio","type":"uint256"}],"name":"setRevokeFeeRatio","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"tokenID","type":"address"}],"name":"addToken","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"time","type":"uint256"}],"name":"setLockedTime","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"}],"name":"mapXHashFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"setQuotaLedger","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenID","type":"address"},{"name":"xHash","type":"bytes32"}],"name":"xHashExist","outputs":[{"name":"exist","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"halt","type":"bool"}],"name":"setHalt","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"},{"indexed":true,"name":"storeman","type":"address"},{"indexed":true,"name":"wanAddr","type":"address"},{"indexed":true,"name":"xHash","type":"bytes32"},{"indexed":false,"name":"value","type":"uint256"}],"name":"InboundLockLogger","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"},{"indexed":true,"name":"wanAddr","type":"address"},{"indexed":true,"name":"storeman","type":"address"},{"indexed":true,"name":"xHash","type":"bytes32"},{"indexed":false,"name":"x","type":"bytes32"}],"name":"InboundRefundLogger","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"token","type":"address"},{"indexed":true,"name":"storeman","type":"address"},{"indexed":true,"name":"xHash","type":"bytes32"}],"name":"InboundRevokeLogger","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"},{"indexed":true,"name":"wanAddr","type":"address"},{"indexed":true,"name":"storeman","type":"address"},{"indexed":true,"name":"xHash","type":"bytes32"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"ethAddr","type":"address"},{"indexed":false,"name":"fee","type":"uint256"}],"name":"OutboundLockLogger","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"},{"indexed":true,"name":"storeman","type":"address"},{"indexed":true,"name":"wanAddr","type":"address"},{"indexed":true,"name":"xHash","type":"bytes32"},{"indexed":false,"name":"x","type":"bytes32"}],"name":"OutboundRefundLogger","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"token","type":"address"},{"indexed":true,"name":"wanAddr","type":"address"},{"indexed":true,"name":"xHash","type":"bytes32"}],"name":"OutboundRevokeLogger","type":"event"}];
var abiethhtlc = [{"constant":true,"inputs":[],"name":"RATIO_PRECISE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"xHash","type":"bytes32"}],"name":"inboundRevoke","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"value","type":"uint256"},{"name":"xHash","type":"bytes32"},{"name":"user","type":"address"}],"name":"outboundLock","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenID","type":"address"},{"name":"xHash","type":"bytes32"}],"name":"getHTLCLeftLockedTime","outputs":[{"name":"time","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"xHash","type":"bytes32"}],"name":"outboundRevoke","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"}],"name":"mapXHashShadow","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"x","type":"bytes32"}],"name":"inboundRefund","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"DEF_LOCKED_TIME","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"x","type":"bytes32"}],"name":"outboundRefund","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"value","type":"uint256"},{"name":"xHash","type":"bytes32"},{"name":"storemanGroup","type":"address"},{"name":"wanAddr","type":"address"}],"name":"inboundLock","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lockedTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"revokeFeeRatio","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"}],"name":"mapXHashHTLCTxs","outputs":[{"name":"direction","type":"uint8"},{"name":"source","type":"address"},{"name":"destination","type":"address"},{"name":"value","type":"uint256"},{"name":"status","type":"uint8"},{"name":"lockedTime","type":"uint256"},{"name":"beginLockedTime","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"halted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"mapTokenSupported","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"DEF_MAX_TIME","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ratio","type":"uint256"}],"name":"setRevokeFeeRatio","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"tokenID","type":"address"}],"name":"addToken","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"time","type":"uint256"}],"name":"setLockedTime","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenID","type":"address"},{"name":"xHash","type":"bytes32"}],"name":"xHashExist","outputs":[{"name":"exist","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"halt","type":"bool"}],"name":"setHalt","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"},{"indexed":true,"name":"user","type":"address"},{"indexed":true,"name":"storeman","type":"address"},{"indexed":true,"name":"xHash","type":"bytes32"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"wanAddr","type":"address"}],"name":"InboundLockLogger","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"},{"indexed":true,"name":"storeman","type":"address"},{"indexed":true,"name":"user","type":"address"},{"indexed":true,"name":"xHash","type":"bytes32"},{"indexed":false,"name":"x","type":"bytes32"}],"name":"InboundRefundLogger","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"token","type":"address"},{"indexed":true,"name":"user","type":"address"},{"indexed":true,"name":"xHash","type":"bytes32"}],"name":"InboundRevokeLogger","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"},{"indexed":true,"name":"storeman","type":"address"},{"indexed":true,"name":"user","type":"address"},{"indexed":true,"name":"xHash","type":"bytes32"},{"indexed":false,"name":"value","type":"uint256"}],"name":"OutboundLockLogger","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"},{"indexed":true,"name":"user","type":"address"},{"indexed":true,"name":"storeman","type":"address"},{"indexed":true,"name":"xHash","type":"bytes32"},{"indexed":false,"name":"x","type":"bytes32"}],"name":"OutboundRefundLogger","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"token","type":"address"},{"indexed":true,"name":"storeman","type":"address"},{"indexed":true,"name":"xHash","type":"bytes32"}],"name":"OutboundRevokeLogger","type":"event"}];
var HTLCWANInstanceAddress = "0x5d1dd99ebaa6ee3289d9cd3369948e4ce96736c2";
var HTLCETHInstanceAddress = "0xcdc96fea7e2a6ce584df5dc22d9211e53a5b18b1";

var abitokeneth = [{"constant": true, "inputs": [], "name": "totalSupply", "outputs": [{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {"anonymous": false, "inputs": [{"indexed": true, "name": "_from", "type": "address"}, {"indexed": true, "name": "_to", "type": "address"}, {"indexed": false, "name": "_value", "type": "uint256"}], "name": "Transfer", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "name": "_owner", "type": "address"}, {"indexed": true, "name": "_spender", "type": "address"}, {"indexed": false, "name": "_value", "type": "uint256"}], "name": "Approval", "type": "event"}, {"constant": true, "inputs": [{"name": "_owner", "type": "address"}], "name": "balanceOf", "outputs": [{"name": "balance", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": false, "inputs": [{"name": "_to", "type": "address"}, {"name": "_value", "type": "uint256"}], "name": "transfer", "outputs": [{"name": "success", "type": "bool"}], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": false, "inputs": [{"name": "_from", "type": "address"}, {"name": "_to", "type": "address"}, {"name": "_value", "type": "uint256"}], "name": "transferFrom", "outputs": [{"name": "success", "type": "bool"}], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": false, "inputs": [{"name": "_spender", "type": "address"}, {"name": "_value", "type": "uint256"}], "name": "approve", "outputs": [{"name": "success", "type": "bool"}], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": true, "inputs": [{"name": "_owner", "type": "address"}, {"name": "_spender", "type": "address"}], "name": "allowance", "outputs": [{"name": "remaining", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}];
var abitokenwan = [{"constant": true, "inputs": [], "name": "totalSupply", "outputs": [{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {"anonymous": false, "inputs": [{"indexed": true, "name": "_from", "type": "address"}, {"indexed": true, "name": "_to", "type": "address"}, {"indexed": false, "name": "_value", "type": "uint256"}], "name": "Transfer", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "name": "_owner", "type": "address"}, {"indexed": true, "name": "_spender", "type": "address"}, {"indexed": false, "name": "_value", "type": "uint256"}], "name": "Approval", "type": "event"}, {"constant": true, "inputs": [{"name": "_owner", "type": "address"}], "name": "balanceOf", "outputs": [{"name": "balance", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": false, "inputs": [{"name": "_to", "type": "address"}, {"name": "_value", "type": "uint256"}], "name": "transfer", "outputs": [{"name": "success", "type": "bool"}], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": false, "inputs": [{"name": "_from", "type": "address"}, {"name": "_to", "type": "address"}, {"name": "_value", "type": "uint256"}], "name": "transferFrom", "outputs": [{"name": "success", "type": "bool"}], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": false, "inputs": [{"name": "_spender", "type": "address"}, {"name": "_value", "type": "uint256"}], "name": "approve", "outputs": [{"name": "success", "type": "bool"}], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": true, "inputs": [{"name": "_owner", "type": "address"}, {"name": "_spender", "type": "address"}], "name": "allowance", "outputs": [{"name": "remaining", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}];
var addresstkoeneth = "0xc5bc855056d99ef4bda0a4ae937065315e2ae11a";
var addresstokenwan = "0x46e4df4b9c3044f12543adaa8ad0609d553041f9";


var storemanGroupETH = "0xc27ecd85faa4ae80bf5e28daf91b605db7be1ba8";
var storemanGroupWAN = "0x55ccc7a38f900a1e00f0a4c1e466ec36e7592024";
/*
var storemanGroupETH = ethWeb3.eth.accounts[0];
var storemanGroupWAN = wanWeb3.eth.accounts[0];
*/
var HTLCWANInstance = wanWeb3.eth.contract(abiwanhtlc).at(HTLCWANInstanceAddress);
var HTLCETHInstance = ethWeb3.eth.contract(abiethhtlc).at(HTLCETHInstanceAddress);

var wanTokenInstance = wanWeb3.eth.contract(abitokenwan).at(addresstokenwan);
var ethTokenInstance = ethWeb3.eth.contract(abitokeneth).at(addresstkoeneth);

var abiquotaLedger = [{"constant":true,"inputs":[{"name":"token","type":"address"},{"name":"storemanGroup","type":"address"}],"name":"queryStoremanGroupQuota","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"HTLCWAN","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokenManager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"storemanGroup","type":"address"},{"name":"value","type":"uint256"}],"name":"burnToken","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"storemanGroup","type":"address"},{"name":"recipient","type":"address"},{"name":"value","type":"uint256"}],"name":"mintToken","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"storemanGroup","type":"address"}],"name":"unregisterStoremanGroup","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"mapUnregistration","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"storemanGroup","type":"address"},{"name":"quota","type":"uint256"}],"name":"setStoremanGroupQuota","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"tm","type":"address"}],"name":"setTokenManager","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"mapQuota","outputs":[{"name":"_quota","type":"uint256"},{"name":"_receivable","type":"uint256"},{"name":"_payable","type":"uint256"},{"name":"_debt","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"storemanGroupAdmin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"admin","type":"address"}],"name":"setStoremanGroupAdmin","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"token","type":"address"},{"name":"storemanGroup","type":"address"}],"name":"isActiveStoremanGroup","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"storemanGroup","type":"address"},{"name":"recipient","type":"address"},{"name":"value","type":"uint256"}],"name":"unlockToken","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"halted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"htlc","type":"address"}],"name":"setHTLCWAN","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"storemanGroup","type":"address"},{"name":"initiator","type":"address"},{"name":"value","type":"uint256"}],"name":"lockToken","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"storemanGroup","type":"address"}],"name":"applyUnregistration","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"storemanGroup","type":"address"},{"name":"value","type":"uint256"}],"name":"unlockQuota","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"storemanGroup","type":"address"},{"name":"recipient","type":"address"},{"name":"value","type":"uint256"}],"name":"lockQuota","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"halt","type":"bool"}],"name":"setHalt","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
var quotaLedgerInstanceAddress = "0x4f73a4e2a6e11ea30fbca48012660eada20fe598";
var quotaLedgerInstance = wanWeb3.eth.contract(abiquotaLedger).at(quotaLedgerInstanceAddress);

var abitokenManager = [{"constant":true,"inputs":[{"name":"token","type":"address"}],"name":"isTokenRegistered","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"ratio","type":"uint256"}],"name":"setWToken2WanRatio","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"DEFAULT_BONUS_PERIOD_BLOCKS","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"quotaLedger","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"enableUserWhiteList","type":"bool"}],"name":"setSmgEnableUserWhiteList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"bonus","type":"uint256"},{"name":"isAdded","type":"bool"}],"name":"updateTotalBonus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"ratio","type":"uint256"}],"name":"setSystemBonusRatio","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"delayTime","type":"uint256"}],"name":"setWithdrawDepositDelayTime","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"DEFAULT_BONUS_RATIO_FOR_DEPOSIT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"halted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"DEFAULT_PRECISE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"mapTokenInfo","outputs":[{"name":"instance","type":"address"},{"name":"token2WanRatio","type":"uint256"},{"name":"defaultMinDeposit","type":"uint256"},{"name":"originalChainHtlc","type":"address"},{"name":"wanchainHtlc","type":"address"},{"name":"withdrawDelayTime","type":"uint256"},{"name":"useWhiteList","type":"bool"},{"name":"startBonusBlk","type":"uint256"},{"name":"bonusTotal","type":"uint256"},{"name":"bonusPeriodBlks","type":"uint256"},{"name":"bonusRatio","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"isSystemBonusPeriod","type":"bool"},{"name":"systemBonusPeriod","type":"uint256"}],"name":"setSystemEnableBonus","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"ledgerAddr","type":"address"}],"name":"setQuotaLedger","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"halt","type":"bool"}],"name":"setHalt","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"name","type":"bytes"},{"name":"symbol","type":"bytes"},{"name":"decimals","type":"uint8"},{"name":"ratio","type":"uint256"},{"name":"defaultMinDeposit","type":"uint256"},{"name":"originalChainHtlc","type":"address"},{"name":"wanchainHtlc","type":"address"},{"name":"withdrawDelayTime","type":"uint256"}],"name":"addToken","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"token","type":"address"},{"indexed":true,"name":"instance","type":"address"},{"indexed":true,"name":"ratio","type":"uint256"},{"indexed":false,"name":"defaultMinDeposit","type":"uint256"},{"indexed":false,"name":"originalChainHtlc","type":"address"},{"indexed":false,"name":"wanchainHtlc","type":"address"},{"indexed":false,"name":"withdrawDelayTime","type":"uint256"}],"name":"TokenAddedLogger","type":"event"}];
var tokenManagerAddress ="0x8192476fbe2410d09ae699863d38ea2d5db50e4b";
var tokenManagerInstance = wanWeb3.eth.contract(abitokenManager).at(tokenManagerAddress);

const storemanTxFeeRatio = 1
const regDeposit = 100
const GasPrice = 180000000000
const defaultMinDeposit1 = ethWeb3.toWei(100)
const withdrawDelayTime = (3600*72)

const tokenName1 = 'WanChain2.x Test Token'
const tokenSymbol1 = 'WCT'
const ratio1 = 200000 // 1 eth:20,it need to mul the precise 10000

const decimals = 18

const HTLCLockedTime = 60 // in seconds
const HTLCRevokeFeeRatio = 400
const initialAllocatedAmount = 1000
const _transferAmount = 0.0005


var owner = storemanGroupWAN;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function getBalance(token, user) {
    return wanWeb3.fromWei((await token.balanceOf(user)).toNumber())
}

async function getMultiBalance(wanToken,ethToken) {
    let wanBalance = (await wanTokenInstance.balanceOf(wanToken)).toNumber();
    let ethBalance = (await ethTokenInstance.balanceOf(ethToken)).toNumber();

    return [
            { addr: wanToken, balance: wanBalance, netid: 'wan'},
            { addr: ethToken, balance: ethBalance, netid: 'eth'},
    ]
}

async function approve(token, owner, spender, amount) {
    console.log("usr:",spender,",balance:", token.balanceOf(spender))
    console.log("owner:",owner)
    ret = await token.approve(spender, 0x00, {from: owner})
    //ret = await token.approve(spender, 0x1, {from: owner})
    ret = await token.approve(spender, amount, {from: owner})
    console.log("appove:",ret)
    //assert.equal((await token.allowance(owner, spender)).toNumber(), ethWeb3.toWei(amount))
}
function getHashKey(key){
    let h = createKeccakHash('keccak256');
    let kBuf = new Buffer(key.slice(2), 'hex');
    h.update(kBuf);
    let hashKey = '0x' + h.digest('hex');
    return hashKey;
}

const waitforstoreman = (n) =>{
    var start=new Date().getTime();
    while(true) if(new Date().getTime()-start>n) break;
}

const CreateKey = ()=> {
    let randomBuf;
    do{
        randomBuf = crypto.randomBytes(32);
    }while (!secp256k1.privateKeyVerify(randomBuf));
    return '0x' + randomBuf.toString('hex');
}

async function tokenTrans(sender, recipient, transferAmount, dir){
    ethWeb3.personal.unlockAccount(sender, 'wanglu', 600);
    wanWeb3.personal.unlockAccount(recipient, 'wanglu', 600);

    /*
    console.log("ethTokenInstance", ethTokenInstance)
    console.log("sender", sender)
    console.log("recipient", recipient)
    console.log("HTLCETHInstanceAddress", HTLCETHInstanceAddress)
    */
    var xx = CreateKey();
    var hash_xx = getHashKey(xx);
    console.log('input key:', xx);
    console.log('input hash key:', hash_xx);
    /*
    var xx = "0xfff4cda004a094af62658ea113ad7287d0c63d4eb13f13154f9dc0d406ba72e7";
    var hash_xx = "0x6ed08e2edc5b985370590b1a86902ebfafe4493bd574713514941d1794f46f45";
    */
//    console.log("x:",xx,",hash:",hash_xx)

    var tokenInstance
    var tokenAddr
    var htlcSrc
    var htlcDst
    var htlcSrcAddr
    var storemanGroup

    if (dir == 0){
        tokenInstance = ethTokenInstance;
        htlcSrc = HTLCETHInstance;
        htlcDst = HTLCWANInstance;
        storemanGroup = storemanGroupETH;
        htlcSrcAddr = HTLCETHInstanceAddress;
    }else{
        tokenInstance = wanTokenInstance;
        htlcSrc = HTLCWANInstance;
        htlcDst = HTLCETHInstance;
        storemanGroup = storemanGroupWAN
        htlcSrcAddr = HTLCWANInstanceAddress;
    }

    var orgHtlcAddr = HTLCETHInstanceAddress;
        tokenAddr = addresstkoeneth;
    if (dir == 0){
        await approve(tokenInstance, sender, htlcSrcAddr, transferAmount)
        console.log("11111")
        ret = await htlcSrc.inboundLock(tokenAddr, transferAmount, hash_xx, storemanGroup, recipient, {from: sender, gas: 4700000, gasPrice: "0x"+(GasPrice).toString(16)})
        console.log("22222",ret)
        //await sleep(300000)
        await waitXhash(HTLCWANInstance, addresstkoeneth, hash_xx)
        console.log('got xHash from wanchain');

        beforeTokenBalance = await getBalance(tokenInstance,storemanGroup)
        ret = await htlcDst.inboundRefund(tokenAddr, xx, {from: recipient, gas:4700000, gasPrice: "0x"+(GasPrice).toString(16)})
        console.log("33333",ret)
    }else{
        ret = await tokenInstance.approve(quotaLedgerInstanceAddress, 0x00, {from: sender, gas: 100000, gasPrice: "0x"+(GasPrice).toString(16)})
        ret = await tokenInstance.approve(quotaLedgerInstanceAddress, transferAmount, {from: sender, gas: 4700000, gasPrice: "0x"+(GasPrice).toString(16)})
        console.log("appove:",ret)
        await sleep(60 * 1000)
        ret = await htlcSrc.outboundLock(tokenAddr, hash_xx, storemanGroup, orgHtlcAddr, transferAmount,{from: sender,  value: 100, gas: 4700000, gasPrice: "0x"+(GasPrice).toString(16)})
        console.log("22222",ret)
        await sleep(120000)
        //ret = await htlcDst.outboundRefund(tokenAddr, xx, {from: storemanGroupWAN, gas: 4700000, gasPrice: "0x"+(GasPrice).toString(16)})
        ret = await htlcDst.outboundRefund(tokenAddr, xx, {from: recipient, gas: 4700000, gasPrice: "0x"+(GasPrice).toString(16)})
        console.log("33333",ret)

        return ret;
    }
}


async function xHashExit(htlcInst, token, xHash) {
    return htlcInst.xHashExist(token, xHash)
}

async function waitXhash(htlcInst, token, xHash) {
    let times = 0;
    while (true) {
        if (await xHashExit(htlcInst, token, xHash)) {
            break
        }

        console.log('wait times:', ++times);
        await sleep(3000)
    }
}


function sleep(time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, time);
    })
};

async function Transfer(toAddress, amount){
    let res = await wanTokenInstance.transfer.sendTransaction(toAddress, amount, {from:toAddress, gas:4500000});

    return res;
}

async function TransferEth(address, amount){
    let res = await ethTokenInstance.transfer.sendTransaction(address, amount, {from:address, gas:4500000});

    return res;
}
async function run(toAddress, price){

    // 买家
    let tokenTransHash = await tokenTrans("0xf47a8bb5c9ff814d39509591281ae31c0c7c2f38","0xa6f3ffea3f0132ede88a8f90dac940e1f11882dd", price, 0)

    // 卖家
    let TransferHash = await Transfer(toAddress, price);

    return {tokenTransHash: tokenTransHash, TransferHash: TransferHash};
}

async function ERC20Wan(price){

    // 买家
    let tokenTransHash = await tokenTrans("0xf47a8bb5c9ff814d39509591281ae31c0c7c2f38","0xa6f3ffea3f0132ede88a8f90dac940e1f11882dd", price, 0)

    return {tokenTransHash: tokenTransHash};
}

async function transXiaWRC20(toAddress, price) {
    let TransferHash = await Transfer(toAddress, price);

    return {TransferHash: TransferHash};
}

module.exports = {
    "ERC20Send": run,
    "getMultiBalance": getMultiBalance,
    "Transfer": Transfer,
    "transXiaWRC20": transXiaWRC20,
    "ERC20Wan": ERC20Wan,
    "TransferEth": TransferEth,
};

