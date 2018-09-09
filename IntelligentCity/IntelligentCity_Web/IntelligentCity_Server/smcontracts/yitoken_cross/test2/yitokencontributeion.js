let env = require('./env.js');
let fs = require('fs');
let solc = require('solc');
let Web3 = require('web3');
let web3 = new Web3(new Web3.providers.HttpProvider(env.GwanRpcUrl));

let events = require('events');
let yitokenEmitter = new events.EventEmitter();


let convertLibFile = env.Solfile["dir"] + env.Solfile["ConvertLib"];
let safeMathFile = env.Solfile["dir"] + env.Solfile["SafeMath"];
let ownedFile = env.Solfile["dir"] + env.Solfile["Owned"];
let eRC20ProtocolFile = env.Solfile["dir"] + env.Solfile["ERC20Protocol"];
let standardTokenFile = env.Solfile["dir"] + env.Solfile["StandardToken"];
let yiTokenFile = env.Solfile["dir"] + env.Solfile["YiToken"];
let yiTokenContributionFile = env.Solfile["dir"] + env.Solfile["YiTokenContribution"];

let convertLibInput = fs.readFileSync(convertLibFile);
let safeMathInput = fs.readFileSync(safeMathFile);
let ownedInput = fs.readFileSync(ownedFile);
let eRC20ProtocolInput = fs.readFileSync(eRC20ProtocolFile);
let standardTokenInput = fs.readFileSync(standardTokenFile);
let yiTokenInput = fs.readFileSync(yiTokenFile);
let yiTokenContributionInput = fs.readFileSync(yiTokenContributionFile);

let input = {};

input["ConvertLib.sol"] = convertLibInput.toString();
input["SafeMath.sol"]= safeMathInput.toString();
input["Owned.sol"] = ownedInput.toString();
input["ERC20Protocol.sol"] = eRC20ProtocolInput.toString();
input["StandardToken.sol"] = standardTokenInput.toString();
input["YiToken.sol"] = yiTokenInput.toString();
input["YiTokenContribution.sol"] = yiTokenContributionInput.toString();

let output = solc.compile({sources:input},1);
//console.log(output);

let yiTokenContributionAbi = output.contracts["YiTokenContribution.sol:YiTokenContribution"].interface;
//console.log(yiTokenContributionAbi);

let yiTokenAbi = output.contracts["YiToken.sol:YiToken"].interface;
console.log(yiTokenAbi);

let yiTokenContribution = web3.eth.contract(JSON.parse(yiTokenContributionAbi));

let yiTokenContributionAddr = env.ContractAddrs["YiTokenContribution"];
//console.log(yiTokenContributionAddr)
let yiTokenContributionInst = yiTokenContribution.at(yiTokenContributionAddr);

//let yiTokenAddr = yiTokenContributionInst.getTokenAddress.call();
let yiTokenAddr = yiTokenContributionInst.yiToken();

console.log(yiTokenAddr);

//let yiTokenAddr = env.ContractAddrs["YiTokenContribution"];
console.log("-------------------------------");
let yiToken = web3.eth.contract(JSON.parse(yiTokenAbi));
//let yiTokenInst = yiToken.at("yiTokenContributionAddr");
let yiTokenInst = yiToken.at(yiTokenAddr);

/*

let eventyiToken = yiTokenInst["EventMint"]({},{fromBlock:1, toBlock:'lastest'});
eventyiToken.watch(function(error, result){
if(error){
	console.log(error);
}else {
    //console.log(result);
    console.log(result.args.receipent);
    console.log(result.args.amount.toNumber());
    console.log(result.args.sum.toNumber());
	let res = yiTokenInst.balanceOf(result.args.receipent);
	console.log(res.toNumber());
	let res1 = yiTokenInst.balanceOf(env.AccountAddr[1]);
	console.log(res1.toNumber());
	let res2 = yiTokenInst.balanceOf(env.AccountAddr[2]);
	console.log(res2.toNumber());
	}
});
*/

function GetBalance(address){
    return yiTokenInst.balanceOf(address).toNumber();
}
function Transfer(toAddress, amount,callback){
    yiTokenInst.transfer.sendTransaction(toAddress, amount, {from:toAddress, gas:4500000},function(error, result){
        if(error){
           // console.log(error);
            callback(error, result);
        }else{
            callback(error, result);

        }
    });
}
//transferCross
function TransferCross(_fromAddr,_toAddr,amount,callback){
    yiTokenInst.transferCross.sendTransaction(_fromAddr, _toAddr,amount,{from:_fromAddr,gas:4500000},function(err,result){
        if(err){
            //console.log(err);
            callback(err,result);
        }else{
            //console.log("wanyiTokenInst : "+result);
            callback(err,result);
        }
    });

}

exports.GetBalance = GetBalance;
exports.Transfer = Transfer;
exports.TransferCross = TransferCross;
