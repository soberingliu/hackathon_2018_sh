var ConvertLib = artifacts.require('./ConvertLib.sol');
var Math = artifacts.require("./SafeMath.sol");
var YiTokenICO = artifacts.require("./YiTokenContribution.sol");
var yiPort = '0x64886f67868a73e18b9f9c7cc33d333d6508767d';

module.exports = function(deployer){
    deployer.deploy(ConvertLib).then(function(){

    return deployer.link(ConvertLib,YiTokenICO).then(function(){
		return deployer.deploy(Math).then(function(){
			return deployer.link(Math,[YiTokenICO]).then(function(){
                    return deployer.deploy(YiTokenICO,yiPort);
                });
				});
			});
		});
}
