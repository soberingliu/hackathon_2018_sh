const router = require('koa-router')();
let asset_info = require('../js/asset_info');
let transToken = require('../js/transToken');

router.prefix('/accounts');

router.get('/', function (ctx, next) {
  ctx.body = 'this is a account response!'
});

router.get('/bar', function (ctx, next) {
  var ret = ethToken.GetBalance('0x64886f67868a73e18b9f9c7cc33d333d6508767d')
  console.log('EthToken getBalance: ', ret)
  ctx.body = {balance: ret}
});

router.get('/list', getAccountList);
router.get('/balance', getBalance);
router.post('/balance', postBalance);
router.get('/digitAsset/:addr', getDigitAsset);
router.get('/personalAsset/:accountName', getPersonalAsset);
router.get('/mallAsset/:accountName', getMallAsset);

// ERC20支付 线下
router.post('/erc20send', postERC20Send);

// ERC20支付 线上 WAN渠道
router.post('/erc20sendWan', postERC20SendWan);

// ERC20支付 线上 ETH渠道
router.post('/erc20sendEth', postERC20SendEth);

// WRC20 支付 线下
router.post('/wrc20send', postWRC20Send);

//  WRC20 支付 线上 WAN渠道
router.post('/wrc20sendWan', postWRC20SendWan);


// =======
let debug;

// debug = true;
debug = false;

async function getMallAsset(ctx, next) {
    // wan address
    let result = await asset_info.readAllOrder('0x695a8e2e185173f89c98d3e49f5ebceccab25244', 'wanglu');

    let resq;
    if (debug) {
        //test
        let test = [];
        for (let i=0; i <result.length; i++) {
            if (i !== 0) {
                test.push(result[i])
            }
        }

        resq = test;
    } else {
        resq = result;
    }


    ctx.body = resq;
}

async function getPersonalAsset(ctx, next) {

    let token = await transToken.getMultiBalance('0xa6f3ffea3f0132ede88a8f90dac940e1f11882dd', '0xf47a8bb5c9ff814d39509591281ae31c0c7c2f38');

    // test
    let result;
    let resqToken = [];
    if (debug) {
        for (let i=0; i <token.length; i++) {
            if (i === 0) {
                token[i]['balance'] = token[i]['balance'] - 100;
            }

            resqToken.push(token[i])
        }

        let resultShop = await asset_info.readAllOrder('0x695a8e2e185173f89c98d3e49f5ebceccab25244', 'wanglu');
        result = [resultShop[0]];
    } else {
        resqToken = token;
        result = await asset_info.readOwnerAsset('0xa6f3ffea3f0132ede88a8f90dac940e1f11882dd', 'wanglu');
    }

    const personalAssetResult = {
        'token': resqToken,
        'digitAsset' : result
    };

    ctx.body = personalAssetResult
}

// ERC20支付 线下
async function postERC20Send(ctx, next) {
    let address = ctx.request.body.address;
    let price = ctx.request.body.price;
    console.log('postERC20Send', address, price);

    let result;
    if (debug) {
        setTimeout(() => {
            result = {};
        }, 5000);

    } else {
        result = await transToken.ERC20Send(address, price);
    }

    ctx.body = result;
}

// ERC20支付 线上 WAN渠道
async function postERC20SendWan(ctx, next) {
    let price = ctx.request.body.price;

    let id = ctx.request.body.id;

    let result1, result2;
    if (debug) {
        setTimeout(() => {
            result1 = result2 = 0;
        }, 5000);
    } else {
        result1 = await transToken.ERC20Wan(price);
        let user = '0xa6f3ffea3f0132ede88a8f90dac940e1f11882dd';
        let passwd = 'wanglu';

        result2 = await asset_info.Order_buy721(user, passwd, id, price);
    }

    console.log('postERC20SendWan', result1, result2);

    ctx.body = {hash1: result1, hash2: result2};
}

// ERC20支付 线上 ETH渠道
async function postERC20SendEth(ctx, next) {
    let price = ctx.request.body.price;
    //eth address
    let address = '0xf47a8bb5c9ff814d39509591281ae31c0c7c2f38';

    let result;
    if (debug) {
        setTimeout(() => {
            result = {};
        }, 5000);
    } else {
        result = await transToken.TransferEth(address, price);
    }

    console.log('postERC20SendEth', result);

    ctx.body = result;
}

// WRC20 支付 线下
async function postWRC20Send(ctx, next) {
    let price = ctx.request.body.price;

    let result;
    let address='0xa6f3ffea3f0132ede88a8f90dac940e1f11882dd';

    if (debug) {
        setTimeout(() => {
            result = {};
        }, 5000);
    } else {
        result = await transToken.transXiaWRC20(address, price);
    }

    console.log('postWRC20Send', result);
    ctx.body = result;
}

//WRC20 支付 线上 WAN
async function postWRC20SendWan(ctx, next) {
    let id = ctx.request.body.id;
    let price = ctx.request.body.price;

    let user = '0xa6f3ffea3f0132ede88a8f90dac940e1f11882dd';
    let passwd = 'wanglu';

    let result;

    if (debug) {
        setTimeout(() => {
            result = {};
        }, 5000);
    } else {
        result = await asset_info.Order_buy721(user, passwd, id, price);
    }

    console.log('postWRC20SendWan', result);
    ctx.body = result;
}


function getDigitAsset(ctx, next) {
  ctx.body= digitAsset
}

//
function getAccountList(ctx, next) {
  ctx.body = accounts
}

function getBalance(ctx, next) {
  ctx.body = accounts['wan']
}

function postBalance(ctx, next) {

  let netId = ctx.request.body.netId
  let addr = ctx.request.body.address
  let balance = null
  if(netId && addr) {
    if(netId == 'eth'){
      // balance = ethToken.GetBalance(addr)
    }else if (netId == 'wan'){
      // balance = wanToken.GetBalance(addr)
    }else {
      console.log("invalide parameters!")
    }
    balance = balances[netId][addr]
    if(balance) {
      ctx.body = {balance: balance}
    }
  }else {
    console.log("invalide parameters!")
  }
}


const accounts={
  'wan': ["0x695a8e2e185173f89c98d3e49f5ebceccab25244"],
  'eth': ["0x64886f67868a73e18b9f9c7cc33d333d6508767d"]
};

const balances={
  'wan': {
    '0x695a8e2e185173f89c98d3e49f5ebceccab25244': 0x1000000000,
  },
  'eth' : {
    '0x64886f67868a73e18b9f9c7cc33d333d6508767d': 0x1000000000F,
  }

};



const digitAsset=[
  'building.png',
  'building2.png',
  'building3.jpg',
  'department-store.jpg',
  'department-store2.jpg',
  'home1.jpg',
  'home2.jpg',
  'home3.jpg',
  'hospital.jpg',
  'school.jpg',
]



module.exports = router;
