
// const hostIp='192.168.1.26'
const hostIp='127.0.0.1'
const hostPort='3300'

const host=`http://${hostIp}:${hostPort}`

export const PicBaseUrl = `${host}/images/`
export const CompanyLogoUrl = `${host}/images/wanchain_v.png`
export const AccountListUrl = `${host}/accounts/list`
export const BalanceUrl = `${host}/accounts/balance`
export const DigitAssetUrl = `${host}/accounts/digitAsset`  // Deprecated, use PersonalAssetUrl instead
export const PersonalAssetUrl = `${host}/accounts/personalAsset`
export const ShoppingMallAssetUrl = `${host}/accounts/mallAsset`

export const Erc20SendUrl = `${host}/accounts/erc20send`;
export const Erc20SendWanUrl = `${host}/accounts/erc20sendWan`;
export const Erc20SendEthUrl = `${host}/accounts/erc20sendEth`;

export const Wrc20SendUrl = `${host}/accounts/wrc20send`;
export const Wrc20SendWanUrl = `${host}/accounts/wrc20sendWan`;

export function GetAccountList() {
  return  Request(AccountListUrl)
  // return {err: new Error(), data:''}
}

/**
 *
 * @param {*} netId 区分是 eth 的还是 gwan 的
 * @param {*} address 账户地址
 */
export function GetBalance(netId, address) {
  console.log('Call get balance for address: ', address)
  if(!address) return {err: new Error('Must speicify address'), data:''}

  let bodyJson = {netId: netId, address: address}
  let opts = {
    method: 'POST',
    headers:{
      'Content-type': 'application/json'
    },
    body: JSON.stringify(bodyJson)
  };
  return  Request(BalanceUrl, opts)
}


/**
 * 获取某个用户的所有资产（有多个账户、有多个虚拟资产）
 * @param {*} accontName
 */
export function GetPersonalAsset(accontName) {
  return Request(PersonalAssetUrl + '/' + accontName)
}

/**
 * 获取商城的商品列表
 * @param {*} accontName
 */
export function GetShoppingMallAsset(accontName) {
  return Request(ShoppingMallAssetUrl + '/' + accontName)
}


// ERC20支付 线下
export function postERC20Transfer(address, price) {
    if(!address) return {err: new Error('Must speicify address'), data:''};

    let bodyJson = {address: address, price: price};
    let opts = {
        method: 'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify(bodyJson)
    };
    return  Request(Erc20SendUrl, opts)
}

// ERC20支付 线上 WAN渠道
export function postERC20TransferWAN(id, price) {

    let bodyJson = {id: id, price: price};
    let opts = {
        method: 'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify(bodyJson)
    };
    return  Request(Erc20SendWanUrl, opts)
}

//ERC20支付 线上 ETH渠道
export function postERC20TransferETH(price) {

    let bodyJson = {price: price};
    let opts = {
        method: 'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify(bodyJson)
    };
    return  Request(Erc20SendEthUrl, opts);
}

// WRC20 支付 线下
export function postWRC20Transfer(price) {

    let bodyJson = {price: price};
    let opts = {
        method: 'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify(bodyJson)
    };
    return  Request(Wrc20SendUrl, opts)
}

//  WRC20 支付 线上 WAN渠道
export function postWRC20TransferWAN(id, price) {

    let bodyJson = {id: id, price: price};
    let opts = {
        method: 'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify(bodyJson)
    };
    return  Request(Wrc20SendWanUrl, opts)
}


const Request = async (url, options) => {
    try {
        if (options && options.body) {
            console.log('HttpUtils options: ', options.body);
        }

      console.log('HttpUtils url: ', url);
      let opt = options||{};
      const response = await fetch(url, {...opt});
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      console.log("HttpUtils json: ", json);
      // this.setState({ data: json });
      return {err: null, data:json}
    } catch (error) {
      console.log("HttpUtils err: ", error);
      return {err: error, data: null}
    }
}

export default Request

