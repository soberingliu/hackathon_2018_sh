pragma solidity ^0.4.11;
//import "./ERC20Protocol.sol";
//import "./ERC721.sol";
//import "./Ownable.sol";
//import "./YiToken.sol";
import "./TestToken.sol";
import "./AssetOwnership.sol";

// mingSale
// 1 负责上线/销售 ERC721
// 2 买卖队列：只允许一个买卖信息， 如果有人卖，此时来人买，不成交则失败，不会挂单；先买后卖同理
// 3 owner设置铸币账户，只有铸币地址可以调用ERC721的铸币函数
// 4

contract MintSale {
    address public m_owner;
    struct saleInfo {
        uint256 tokenId;// id为0，表示没有买卖挂单，不为0再参考bsale值
        address owner;// 卖: 721 token实际拥有者的地址
                      // 买: 下单买，被冻结20token的地址
        bool bSale;// true卖,false买
        uint256 price;// 买卖价
        // string name;
    }
    address m_mintAddress;// 创建token的地址,由owner设置
    uint256[] m_saleTokenIds;// 存储当前的买卖挂单，不以tokeId做索引值使用，节省内存，但不便查找，主要用于遍历和列出总数
    mapping(uint256 => saleInfo) m_IndexToSaleInfo;// 存储当前的买卖挂单信息,主要用于快速查找
    TestToken m_ERC20Address;// ERC20 token合约地址
    AssetOwnership m_ERC721Address;
    uint256 m_totalSupply;// 721 token总数

    // 铸币/上线(目前自动),买卖下单,买卖成交
    // event eventMintAsset(address _own, uint256 assetId);
    // event eventTransfer(address _from, address _to, uint256 tokenId);
    // event eventApproval(address _owner, address _approved, uint256 tokenId);

    // 挂单通知
    // uint256 tokenId;
    // bool bSale;// true卖,false买
    // uint256 price;// 买卖价
    event eventOnSale(bool _bSale, uint256 _tokenId, uint256 _price);

    // 成交通知
    // bSale : true以卖价成交，false以买价成交
    // tokenId : 721 token
    // price : 成交价
    event eventTurnover(bool _bSale, uint256 _tokenId, uint256 _price);

    // 撤单通知
    // bSale true卖,false以
    // tokenId ERC721
    // price ERC20
    event eventDropOrder(bool _bSale, uint256 _tokenId, uint256 _price);

    // constructor() Ownable( msg.sender ) public {
    function MintSale(address _erc721Address) public {
      m_owner = msg.sender;
      m_mintAddress = msg.sender;
      m_ERC721Address = AssetOwnership(_erc721Address);
    }
    modifier onlyOwner() {
      require(msg.sender == m_owner);
      _;
    }
    function transferOwnership(address newOwner) public onlyOwner {
      if (newOwner != address(0)) {
        m_owner = newOwner;
      }
    }
    function getOwner() public view returns(address) {
      return m_owner;
    }
    function setMintAddress(address _mintAddr) public onlyOwner{
      require(_mintAddr != address(0));
      m_mintAddress = _mintAddr;
    }
    function getMintAddress() public view returns (address){
      return m_mintAddress;
    }
    // 用ERC20购买ERC721相关
    // 设置ERC20合约地址,只有mintAddress可以设置
    function setERC20Address(address _ERC20Address) public {
      require(msg.sender == m_mintAddress);
      require(_ERC20Address != address(0));
      m_ERC20Address = TestToken(_ERC20Address);
    }
    function getERC20Address() public view returns (address){
      return m_ERC20Address;
    }
    // 设置ERC721合约地址,只有mintAddress可以设置
    function setERC721Address(address _ERC721Address) public {
      require(msg.sender == m_mintAddress);
      require(m_ERC721Address != address(0));
      m_ERC721Address = AssetOwnership(_ERC721Address);
    }
    function getERC721Address() public view returns(address) {
      return m_ERC721Address;
    }
    // 整理买卖队列，清除已成交tokenId
    function delFromSaleList(uint256 _tokenId) internal {
      if(m_saleTokenIds.length <= 0){
        return ;
      }
      if(m_saleTokenIds.length == 1)
      {
        if(m_saleTokenIds[0] == _tokenId){
          delete m_saleTokenIds;
        }
        return;
      }

      uint256 idx = 0;
      bool bfind = false;
      for(idx = 0; idx < m_saleTokenIds.length; idx++){
        if(m_saleTokenIds[idx] == _tokenId){
          bfind = true;
          break;
        }
      }
      if(bfind){
        uint256 len = m_saleTokenIds.length - 1;
        for( ; idx < len; idx++){
          m_saleTokenIds[idx] = m_saleTokenIds[idx + 1];
        }
        delete m_saleTokenIds[len];
      }
      return ;
    }

    // 查询单个tokenId的买卖挂单信息
    // bool true有挂单,false无挂单,无挂单则后面的参数无意义
    // bool true卖，false买
    // uint256 卖价/买价
    function getSaleInfoByTokenId(uint256 _tokenId) public view returns (bool ,bool ,uint256 ) {
      require(_tokenId > 0 && _tokenId <= m_totalSupply);
      saleInfo storage si = m_IndexToSaleInfo[_tokenId];
      return (si.tokenId > 0, si.bSale, si.price);
    }

    // 查询当前所有的买卖挂单信息
    // 参数:
    // bool[] 买卖方向:true卖,false买
    // uint256[] 721tokenId
    // uint256[] 买卖价
    // 三个数组长度一致
    function getAllSaleInfo() public view returns (bool[], uint256[], uint256[]) {
      if(m_saleTokenIds.length == 0){
        return (new bool[](0), new uint256[](0), new uint256[](0));
      }
      bool[] memory bSales = new bool[](m_saleTokenIds.length);
      uint256[] memory tokenIds = new uint256[](m_saleTokenIds.length);
      uint256[] memory prices = new uint256[](m_saleTokenIds.length);
      for(uint256 idx = 0; idx < m_saleTokenIds.length; ++idx){
        bSales[idx] = m_IndexToSaleInfo[m_saleTokenIds[idx]].bSale;
        tokenIds[idx] = m_IndexToSaleInfo[m_saleTokenIds[idx]].tokenId;
        prices[idx] = m_IndexToSaleInfo[m_saleTokenIds[idx]].price;
      }
      return (bSales, tokenIds, prices);
    }

    //
    function mintAsset(uint256 _price) public returns(uint256){
        require(m_mintAddress == msg.sender);
        uint256 tokenId = m_ERC721Address.mintAsset();
        m_totalSupply = tokenId;
        // 当前直接进入运营商售卖队列
        saleInfo memory si;
        si.tokenId = tokenId;
        si.bSale = true;
        si.price = _price;
        si.owner = address(this);

        // 更新挂单信息
        m_saleTokenIds.push(tokenId);
        m_IndexToSaleInfo[tokenId] = si;

        // 发送挂单变化信息
        emit eventOnSale(true, tokenId, _price);
        return tokenId;
    }

    event eventPot(uint256 indexed pot);
    event eventInit(uint256 indexed _tokenId721, uint256 indexed _ERC20TokenAmount);

    // 用户approve给合约赋权后，再调用此函数
    function buyERC721(uint256 _tokenId721, uint256 _ERC20TokenAmount) public returns (bool ){
      // ERC721 tokenId 存在
      require(_tokenId721 > 0 && _tokenId721 <= m_totalSupply);
      require(_ERC20TokenAmount > 0);

      emit eventInit(_tokenId721, _ERC20TokenAmount);

      // 调用ERC20合约冻结20币
      m_ERC20Address.transferFrom(msg.sender, address(this), _ERC20TokenAmount);

      saleInfo storage si = m_IndexToSaleInfo[_tokenId721];
      if(si.tokenId == 0){// 没有卖挂单,则添加买挂单
        si.tokenId = _tokenId721;
        si.bSale = false;// 买
        si.price = _ERC20TokenAmount;
        si.owner = msg.sender;
        m_saleTokenIds.push(_tokenId721);
        emit eventOnSale(false, _tokenId721, _ERC20TokenAmount);
        return true;
      }
      else{// 判断能否成交
        // 判断当前挂单
        if(si.bSale){// 卖挂单
          require(msg.sender != si.owner);// 买卖不能是同一地址
          if(_ERC20TokenAmount >= si.price){// 可以成交,以先挂单的价格成交

            // 给买家转721token
            m_ERC721Address.transfer(msg.sender,_tokenId721);
            // 给卖家转20token，按买价成交
            m_ERC20Address.transfer(si.owner,_ERC20TokenAmount);
            // 更新买卖队列,从买卖队列中删除
            delFromSaleList(_tokenId721);
            delete m_IndexToSaleInfo[_tokenId721];
//              emit eventPot(1);
//              return true;
            emit eventTurnover(true, _tokenId721, _ERC20TokenAmount);// 以买价成交
          }
          else {// 不能成交，则失败,通过require回滚
            require(_ERC20TokenAmount >= si.price);
            return false;
          }
        }
        else{// 当前有买挂单，判断价格是否大于已有挂单
          if(_ERC20TokenAmount > si.price){// 更新已有挂单
            // 给原挂单地址解冻ERC20 token，退回ERC20 token
            m_ERC20Address.transfer(si.owner, si.price);
            si.price = _ERC20TokenAmount;
            si.owner = msg.sender;
            emit eventOnSale(false, _tokenId721, _ERC20TokenAmount);
          }
          else{// 价格低于已有买价，失败,通过require回滚
            require(_ERC20TokenAmount > si.price);
            return false;
          }
        }
      }

      return true;
    }

    // 用户approve给合约赋权后，再调用此函数
    function sellERC721(uint256 _tokenId721, uint256 _ERC20TokenAmount) public returns (bool ){
      // ERC721 tokenId 存在
      require(_tokenId721 > 0 && _tokenId721 <= m_totalSupply);
      require(_ERC20TokenAmount > 0);

      // 调用ERC721合约冻结721
      m_ERC721Address.transferFrom(msg.sender, address(this), _tokenId721);

      // 查找买卖队列
      saleInfo storage si = m_IndexToSaleInfo[_tokenId721];
      if(si.tokenId == 0){// 没有挂单,则添加卖挂单
        si.tokenId = _tokenId721;
        si.bSale = true;// 卖
        si.price = _ERC20TokenAmount;
        si.owner = msg.sender;
        m_saleTokenIds.push(_tokenId721);
        emit eventOnSale(true, _tokenId721, _ERC20TokenAmount);
        return true;
      }
      else{// 判断能否成交
        if(si.bSale){// 已有卖挂单,则说明是该账户自己更新挂单,无需判断，直接更新即可
          require(si.owner == msg.sender);
          si.price = _ERC20TokenAmount;
          emit eventOnSale(true, _tokenId721, _ERC20TokenAmount);
          return true;
        }
        else {// 已有买挂单,判断能否成交
          if(_ERC20TokenAmount <= si.price){// 可以成交,按买家的价钱成交
            // 给买家转721token
            m_ERC721Address.transfer(si.owner, _tokenId721);
            // 给卖家转20token
            m_ERC20Address.transfer(msg.sender, si.price);
            // 更新买卖队列
            delFromSaleList(_tokenId721);
            delete m_IndexToSaleInfo[_tokenId721];
            emit eventTurnover(false, _tokenId721, si.price);// 以买价成交
          }
          else{// 不能成交，则下单失败,通过require回滚
            require(_ERC20TokenAmount <= si.price);
          }
        }
      }

      return true;
    }

    // 撤单函数
    function dropOrder(uint256 _tokenId721) public  {
      // ERC721 tokenId 存在
      require(_tokenId721 > 0 && _tokenId721 <= m_totalSupply);

      // 查找买卖队列
      saleInfo storage si = m_IndexToSaleInfo[_tokenId721];
      if(si.tokenId == 0){// 没有挂单,则添加卖挂单
        return ;
      }
      require(msg.sender == si.owner);

      if(si.bSale){ // 卖挂单,解冻721
        m_ERC721Address.transfer(msg.sender, _tokenId721);
      }
      else { // 买,解冻ERC20
        m_ERC20Address.transfer(msg.sender, si.price);
      }

      emit eventDropOrder(si.bSale, si.tokenId, si.price);
    }
}
