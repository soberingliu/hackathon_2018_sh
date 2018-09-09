let ContractAddrs = {
    ConvertLib:"0x3413091afa002bc6fb1719b4f2ba96385839a87b",
    SafeMath:"0x884035f8274f6cf6c00d2689c7f0db83174c57f7",
    YiTokenContribution:"0xfd405febebf47411d9b08a79406339157ca71cec"

};
let Solfile = {
	dir:"./smcontracts/yitocketh_cross/contracts/",
    ConvertLib:"ConvertLib.sol",
    ERC20Protocol:"ERC20Protocol.sol",
    Owned:"Owned.sol",
    SafeMath:"SafeMath.sol",
    StandardToken:"StandardToken.sol",
    YiToken:"YiToken.sol",
    YiTokenContribution:"YiTokenContribution.sol"


};
let AccountAddr = [
    '0x64886f67868a73e18b9f9c7cc33d333d6508767d',
    '0x091ea3aafedf11f2b0684dcf9afc9a5a05d5992c',
    '0xcaa2fae6ed21565c50c411a5f5c6b95d9ee8d6a5'
];
let GwanRpcUrl = "http://47.104.225.200:60003";
let Man = {
	Account:"0x64886f67868a73e18b9f9c7cc33d333d6508767d",
	Password:"123456"
};
exports.ContractAddrs = ContractAddrs;
exports.Solfile = Solfile;
exports.AccountAddr = AccountAddr;
exports.GwanRpcUrl= GwanRpcUrl;
exports.Man = Man;
