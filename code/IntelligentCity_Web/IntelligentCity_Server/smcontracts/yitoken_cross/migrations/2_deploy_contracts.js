var ConvertLib = artifacts.require('./ConvertLib.sol');
var Math = artifacts.require("./SafeMath.sol");
//var YiToken = artifacts.require("./YiToken.sol");
var YiTokenICO = artifacts.require("./YiTokenContribution.sol");
var yiPort = '0xe59e07c82b778b422d2aa91de2d757497c609e05';

module.exports = function(deployer){
    deployer.deploy(ConvertLib).then(function(){

    return deployer.link(ConvertLib,YiTokenICO).then(function(){
		return deployer.deploy(Math).then(function(){
			return deployer.link(Math,[YiTokenICO]).then(function(){
				//return deployer.deploy(YiToken).then(function(){
                    return deployer.deploy(YiTokenICO,yiPort);
			//		});
				});
			});
		});
	});
}
