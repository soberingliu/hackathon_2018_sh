
const fs = require("fs");
let solc = require('solc');
let Web3 = require('web3');

//***********************************
let g_map_721token = new Map();
function init_mem_obj() {
	let prj_obj = JSON.parse(fs.readFileSync(__dirname + "/assets.json"));
	for (let i = 0; i < prj_obj.objlist.length; ++i) {
		let obj = prj_obj.objlist[i];
		g_map_721token.set(obj.ID, obj);
		//console.log("init_mem_obj:", obj);
	}
}
init_mem_obj();
///console.log("g_map_721token:", g_map_721token);

//***********************************************************************
// 合约地址:ERC721合约地址,MintSale合约地址,ERC20合约地址
let contractAddress = {
	// ERC721
	AssetOwnership: "0x243633ee429675f0a6a313dd3fa3266d6f8a64ea",
	// mintSale
	MintSale: "0x1860c0b122eb09ea7d15dfb83f0e96e4f67e6d43",
	// WRC20
	TestToken: "0x46e4df4b9c3044f12543adaa8ad0609d553041f9"
};

let Solfile = {
	dir: __dirname + "/contracts/",
	AssetOwnership: "AssetOwnership.sol",
	MintSale: "mintSale.sol",
	TestToken: "TestToken.sol",
	StandardToken: "StandardToken.sol",
	SafeMath: "SafeMath.sol",
	ERC20Protocol: "ERC20Protocol.sol",
	Owned:"Owned.sol"
};

// ERC721
console.log("file_path:", Solfile["dir"] + Solfile['ERC20Protocol']);
let ERC20Protocol_input = fs.readFileSync(Solfile["dir"] + Solfile['ERC20Protocol']);
let MintSale_input = fs.readFileSync(Solfile["dir"] + Solfile['MintSale']);
let AssetOwnership_input = fs.readFileSync(Solfile["dir"] + Solfile['AssetOwnership']);
let TestToken_input = fs.readFileSync(Solfile["dir"] + Solfile['TestToken']);
let StandardToken_input = fs.readFileSync(Solfile["dir"] + Solfile['StandardToken']);
let SafeMath_input = fs.readFileSync(Solfile["dir"] + Solfile['SafeMath']);
let Owned_input = fs.readFileSync(Solfile["dir"] + Solfile['Owned']);
let input = {};
input["ERC20Protocol.sol"] = ERC20Protocol_input.toString();
input["SafeMath.sol"] = SafeMath_input.toString();
input["StandardToken.sol"] = StandardToken_input.toString();
input["Owned.sol"] = Owned_input.toString();
input["TestToken.sol"] = TestToken_input.toString();
input["AssetOwnership.sol"] = AssetOwnership_input.toString();
input["mintSale.sol"] = MintSale_input.toString();


// let g_all_abi = {};// = JSON.parse(fs.readFileSync(__dirname + "/all_abi.json"));
//console.log("compile solidity********************");
//let output = solc.compile({ sources: input }, 1);
// console.log("output:*************************************************************************************\n", output);
// console.log("output:*************************************************************************************\n");
let g_all_abi = JSON.parse(fs.readFileSync(__dirname + "/all_abi.json"));

//
// 正确设置各合约地址后才能打开如下代码的注释：
let Wan_info = {
URL: "http://18.236.235.133:8545"
//	Account: "0x721a418dd0f41d03789d64f79c8a403b6c092d1b",
//	Password: "wanglu"
};

let Chain_info = Wan_info;

// 连接链，取各合约基本信息
console.log("connect chain");
let web3 = new Web3(new Web3.providers.HttpProvider(Chain_info.URL));
console.log("connect chain end");
// ERC721合约
//console.log("output:\n", output);
// let ERC721_abi = output.contracts["AssetOwnership.sol:AssetOwnership"].interface;
// g_all_abi["ERC721_abi"] = ERC721_abi;
let ERC721_abi = g_all_abi["ERC721_abi"];
const ERC721_Contract = web3.eth.contract(JSON.parse(ERC721_abi));
console.log("ERC721_ContractInst ");
let ERC721_ContractInst = ERC721_Contract.at(contractAddress["AssetOwnership"]);

// ERC20 合约
//let ERC20_abi = output.contracts["TestToken.sol:TestToken"].interface;
//g_all_abi["ERC20_abi"] = ERC20_abi;
let ERC20_abi = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "bytes" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "quotaLedger", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "account", "type": "address" }, { "name": "value", "type": "uint256" }], "name": "mint", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "acceptOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "bytes" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "account", "type": "address" }, { "name": "value", "type": "uint256" }], "name": "burn", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_newOwner", "type": "address" }], "name": "changeOwner", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "newOwner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "remaining", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [{ "name": "qlAddr", "type": "address" }, { "name": "tokenName", "type": "bytes" }, { "name": "tokenSymbol", "type": "bytes" }, { "name": "tokenDecimal", "type": "uint8" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "account", "type": "address" }, { "indexed": true, "name": "value", "type": "uint256" }, { "indexed": true, "name": "totalSupply", "type": "uint256" }], "name": "TokenMintedLogger", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "account", "type": "address" }, { "indexed": true, "name": "value", "type": "uint256" }, { "indexed": true, "name": "totalSupply", "type": "uint256" }], "name": "TokenBurntLogger", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": true, "name": "value", "type": "uint256" }], "name": "TokenLockedLogger", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "manager", "type": "address" }, { "indexed": true, "name": "name", "type": "bytes" }, { "indexed": true, "name": "symbol", "type": "bytes" }, { "indexed": false, "name": "decimals", "type": "uint8" }], "name": "TokenManagerLogger", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_to", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_owner", "type": "address" }, { "indexed": true, "name": "_spender", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" }], "name": "Approval", "type": "event" }];
// let ERC20_abi = g_all_abi["ERC20_abi"];
const ERC20_Contract = web3.eth.contract(ERC20_abi);
console.log("ERC20_ContractInst ");
let ERC20_ContractInst = ERC20_Contract.at(contractAddress["TestToken"]);
//console.log("ERC20_ContractInst\n", ERC20_ContractInst);

// 负责铸721token以及用ERC20交易ERC721的合约
//let MintSale_abi = output.contracts["mintSale.sol:MintSale"].interface;
//g_all_abi["MintSale_abi"] = MintSale_abi;
let MintSale_abi = g_all_abi["MintSale_abi"];
const MintSale_Contract = web3.eth.contract(JSON.parse(MintSale_abi));
console.log("MintSale_ContractInst ");
let MintSale_ContractInst = MintSale_Contract.at(contractAddress["MintSale"]);
console.log("init finished");
//fs.writeFileSync(__dirname + "/all_abi.json", JSON.stringify(g_all_abi));


// 用户买721下单，调用此函数前应以用户的身份unlockAccount
// 并调用ERC20合约的approval给mintSale授权可转指定token数量
// 必须使用普通用户地址，不能自己买自己卖的物品
function Order_buy721(user, pwd, _tokenId721, _token20Amount,callback) {
	web3.personal.unlockAccount(user, pwd);
	// 调用ERC20 Approval授权铸币合约地址可以转账
	console.log("contractAddress['MintSale']:", contractAddress["MintSale"], ";tokenId721:", _tokenId721);
	console.log("user:", user, "pwd:", pwd, "_token20Amount:", _token20Amount);
	ERC20_ContractInst.approve.sendTransaction(contractAddress["MintSale"], _token20Amount, { from: user, gas: 4700000 }, function (err, result) {
		if (err) {
			console.log(err);
			callback(false);
			return;
		}
		console.log("ERC20 approve:",result);
		// 调用时{from:Chain_info.Account, gas:300000}改为具体用户
		MintSale_ContractInst.buyERC721.sendTransaction(_tokenId721, _token20Amount, { from: user, gas: 4700000 }, function (err, result) {
			if (err) {
				console.log(err);
				callback(false);
			}
			console.log("buyERC721:", result);
			console.log('result: ', result);
			callback(result);
		});
	});
}

function read_ERC20Balance() {
	let ulist = ["0x393e86756d8d4cf38493ce6881eb3a8f2966bb27",
		"0xb755dc08ee919f9d80ecac014ad0a7e1d0b3b231",
		"0x39bf12a5fd948ec3714a7cc2ebcdd1b08ce85274",
		"0x127c8b9077416ed58424774f89b673f3af798019",
		"0xa6f3ffea3f0132ede88a8f90dac940e1f11882dd",
		"0x9ba5fe5c7e1961c264c44bb8f64d4bb6778d9aa3",
		"0xac406182b8ffb29240faa1fb3c8ae9abda91c74d",
		"0x55ccc7a38f900a1e00f0a4c1e466ec36e7592024",
		"0x0978547046640fe0bfd6a68e396c4443bfcb5566"];
	for (let idx = 0; idx < ulist.length; ++idx) {
		let balance = ERC20_ContractInst.balanceOf(ulist[idx]);
		console.log("idx:", idx, "user:", ulist[idx], "balance:", balance.toNumber());
	}
}
function read_ERC721Owner() {
	for (let idx = 0; idx < 12; ++idx) {
		let addr = ERC721_ContractInst.ownerOf(idx+1);
		console.log("ID:", idx + 1, "owner address:", addr);
	}
}

// 读取所有挂单商品信息
function readAllOrder(user, pwd) {
	//web3.personal.unlockAccount(user, pwd);
	let ary = MintSale_ContractInst.getAllSaleInfo();
	// console.log("readAllOrder:", ary);
	let bool_ary = ary[0];
	let id_ary = ary[1];
	let price_ary = ary[2];
	//console.log("bool_ary:", bool_ary);
	//console.log("id_ary:", id_ary);
	//console.log("price_ary:", price_ary);
	let res_ary = new Array();
	for (i = 0; i < bool_ary.length; ++i) {
		console.log("ID:", id_ary[i].toNumber(), "price:", price_ary[i].toNumber());
		if (g_map_721token.has(id_ary[i].toNumber())){
			let obj = g_map_721token.get(id_ary[i].toNumber());
			obj["price"] = price_ary[i].toNumber();
			// obj["address"] = id_ary[i];
			res_ary.push(obj);
		//	console.log("readAllOrder:", obj);
		}
	}
	//console.log("res_ary:", res_ary);
	return res_ary;
}

// 读取指定用户自己所有ERC721
function readOwnerAsset(user, pwd) {
	// web3.personal.unlockAccount(user, pwd);
	let id_ary = ERC721_ContractInst.getAssetByAddress(user);
	let res_ary = new Array();
	for (i = 0; i < id_ary.length; ++i) {
		if (g_map_721token.has(id_ary[i].toNumber())) {
			let obj = g_map_721token.get(id_ary[i].toNumber());
			res_ary.push(obj);
			//console("readOwnerAsset:", obj);
		}
	}
	//console.log("res_ary:", res_ary);
	return res_ary;
}

//************************************************************************************************

function read_jsonFile(json_file_path) {
	let prj_obj = JSON.parse(fs.readFileSync(json_file_path));
	return prj_obj["objlist"];
}

let g_objList = read_jsonFile(__dirname + "/assets.json");


//****************************
// 导出接口
module.exports = {
	// "mintAsset": mintAsset,
	"Order_buy721": Order_buy721,
	//"Order_Drop": Order_Drop,
	"readAllOrder": readAllOrder,
	"readOwnerAsset": readOwnerAsset
	//"readAll721": readAll721
}

let ERC20_approval = ERC20_ContractInst["Approval"]({}, { fromBlock: 1, toBlock: 'latest' });
// ERC20_approval.watch(function (error, result) {
// 	if (!error) {
// 		//console.log(result.args.OpeEncode, result.args.ObjectId,result.args.RootHash);
// 		// event Approval(address indexed _owner, address indexed _spender, uint _value);
// 		var _owner = result.args._owner;
// 		var _spender = result.args._spender;
// 		var _value = result.args._value.toNumber();
// 		console.log("ERC20_approval owner:", _owner, ";_spender:", _spender, ";value:", _value);
//
// 	} else {
// 		console.log(error);
// 	}
// });
// event Transfer(address indexed _from, address indexed _to, uint _value);
let ERC20_Transfer = ERC20_ContractInst["Transfer"]({}, { fromBlock: 1, toBlock: 'latest' });
// ERC20_Transfer.watch(function (error, result) {
// 	if (!error) {
// 		//console.log(result.args.OpeEncode, result.args.ObjectId,result.args.RootHash);
// 		// event Transfer(address indexed _from, address indexed _to, uint _value);
// 		var _from = result.args._from;
// 		var _to = result.args._to;
// 		var _value = result.args._value.toNumber();
// 		console.log("ERC20_Transfer _from:", _from, ";_to:", _to, ";value:", _value);
//
// 	} else {
// 		console.log(error);
// 	}
// });

//console.log("WRC20 account and balance");
//read_ERC20Balance();
//console.log("WRC721 token and owner addrress");
//read_ERC721Owner();

//let res = readAllOrder('0xb755dc08ee919f9d80ecac014ad0a7e1d0b3b231', 'wanglu');
//console.log("readAllOrder:", res);
//res = readOwnerAsset('0x393e86756d8d4cf38493ce6881eb3a8f2966bb27', 'wanglu');
//console.log("readOwnerAsset1:", res);
//res = readOwnerAsset('0x1e6b41fecadaab775cc81d8cb21fcec488a1a540', 'wanglu');
//console.log("readOwnerAsset2:", res);
// 测试买
//Order_buy721('0x393e86756d8d4cf38493ce6881eb3a8f2966bb27', 'wanglu', 1, 100, function(is_ok, result){
//	console.log("is_ok:", is_ok);
//});
// 测试买
//Order_buy721('0x0978547046640fe0bfd6a68e396c4443bfcb5566', 'wanglu', 1, 1, function(is_ok, result){
//	console.log("is_ok:", is_ok);
//	res = readOwnerAsset('0x0978547046640fe0bfd6a68e396c4443bfcb5566', 'wanglu');
//	console.log("readOwnerAsset3:", res);
//});

console.log("finish");


//***********************************************************************************************************************
// 已手动配置，无需调用
// 20/721/铸币合约,都部署后，前期准备工作
// 必须以合约owner身份登录,此函数应该只运行一次，以后不再修改
//function init(user_addr, pwd,callback) {
//	web3.personal.unlockAccount(user_addr, pwd);
//	ERC721_ContractInst.setMintAddress.sendTransaction(contractAddress["MintSale"], { from: Chain_info.Account, gas: 300000 }, function (error, result) {
//		if (error) {
//			console.log(error);
//			callback(false);
//			return;
//		}
//		console.log("ERC721_ContractInst.setMintAddress:", result);
//		// 2 给MintSale合约设置AssetOwnership合约地址
//		MintSale_ContractInst.setERC721Address.sendTransaction(contractAddress["AssetOwnership"], { from: Chain_info.Account, gas: 300000 }, function (error, result) {
//			if (error) {
//				console.log(error);
//				callback(false);
//				return;
//			}
//			console.log("MintSale_ContractInst.setERC721Address:", result);
//			// 3 给MintSale合约设置ERC20合约地址
//			MintSale_ContractInst.setERC20Address.sendTransaction(contractAddress["TestToken"], { from: account, gas: 300000 }, function (error, result) {
//				if (error) {
//					console.log(error);
//					callback(false);
//					return;
//				}
//				console.log("MintSale_ContractInst.setERC20Address:", result);
//				callback(true);
//			});
//		});
//	});
//}

//// 运营商铸币,调用铸币合约的mintSale
//// 智能有mintSale的铸币用户地址调用
//// 0x721a418dd0f41d03789d64f79c8a403b6c092d1b
//// 密码wanglu
//function mintAsset(user, pwd, _price, callback) {
//	// 用铸币账户登录
//	web3.personal.unlockAccount(user, pwd);
//	// 传入数字资产的价格，返回一个链上唯一标识id，业务系统需要存储id值，并为其附加一定的属性信息
//	// 产生数字资产后，属于铸币地址账户，自动进入卖队列，以铸币时的价格销售，进入卖队列
//	MintSale_ContractInst.mintAsset.sendTransaction(_price, { from: user, gas: 300000 }, function (err, result) {
//		if (err) {
//			console.log(err);
//			callback(false);
//			return false;
//		}
//		// 返回result为tokenId，uint256
//		console.log("mintAsset:", result);
//		callback(true, result);
//	});
//}
// 用户卖721下单，以指定价格卖指定的721
// 调用函数前需要以用户身份unlockAccount，
// 并调用ERC721合约的approval给mintSale授权可以转指定的721token
// 这个目前不需要调用，对外的说明是只支持从商城买，不支持二手交易
//function Order_sell721(user, pwd, _tokenId721, _token20Amount,callback) {
//	web3.personal.unlockAccount(user, pwd);
//	// 调用ERC721 Approval授权铸币合约地址可以转721
//	ERC721_ContractInst.approval.sendTransaction(contractAddress["MintSale"], _tokenId721, function (err, result) {
//		if (err) {
//			console.log(err);
//			callback(false);
//			return;
//		}
//		console.log(result);
//		MintSale_ContractInst.sellERC721.sendTransaction(_tokenId721, _token20Amount, { from: Chain_info.Account, gas: 300000 }, function (err, result) {
//			if (err) {
//				console.log(err);
//				callback(false);
//				return false;
//			}
//			console.log(result);
//			callback(true);
//		});
//	});
//}


//// 用户撤单
//// 调用函数前需要以用户身份unlockAccount，再调用此函数
//function Order_Drop(user, pwd, _tokenId721, callback) {
//	web3.personal.unlockAccount(user, pwd);
//	MintSale_ContractInst.dropOrder.sendTransaction(_tokenId721, { from: user, gas: 300000 }, function (err, result) {
//		if (err) {
//			console.log(err);
//			callback(false);
//			return false;
//		}
//		console.log(result);
//		callback(true);
//	});
//}

//// 读取所有ERC721信息
//function readAll721(user, pwd) {
//	web3.personal.unlockAccount(user, pwd);
//	let ary = ERC721_ContractInst.getAssetIDs();
//	let bool_ary = ary[0];
//	let id_ary = ary[1];
//	let price_ary = ary[2];
//	let res_ary = new Array();
//	for (i = 0; i < 3; ++i) {
//		let obj = g_map_721token[id_ary[0]];
//		res_ary.push(obj);
//		console("readAll721:", obj);
//	}
//	console.log("res_ary:", res_ary);
//	return res_ary;
//}

// WRC20 转账



