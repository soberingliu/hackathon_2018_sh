let ContractAddrs = {
    ConvertLib:"0x3413091afa002bc6fb1719b4f2ba96385839a87b",
    SafeMath:"0x884035f8274f6cf6c00d2689c7f0db83174c57f7",
    YiTokenContribution:"0xb672d5b723b4f3cda89575b38f97420861f30f67"

};
let Solfile = {
	dir:"./smcontracts/yitoken_cross/contracts/",
    ConvertLib:"ConvertLib.sol",
    ERC20Protocol:"ERC20Protocol.sol",
    Owned:"Owned.sol",
    SafeMath:"SafeMath.sol",
    StandardToken:"StandardToken.sol",
    YiToken:"YiToken.sol",
    YiTokenContribution:"YiTokenContribution.sol"


};
let AccountAddr = [
    '0x695A8E2e185173F89C98d3E49f5ebCeCcab25244',
    '0xe59e07c82b778b422d2aa91de2d757497c609e05',
    '0x246366f82bea498f6351a1933f60b20208f1126e'
];
let GwanRpcUrl = "http://47.104.225.200:60002";
let Man = {
	Account:"0x64886f67868a73e18b9f9c7cc33d333d6508767d",
	Password:"123456"
};
exports.ContractAddrs = ContractAddrs;
exports.Solfile = Solfile;
exports.AccountAddr = AccountAddr;
exports.GwanRpcUrl= GwanRpcUrl;
exports.Man = Man;
