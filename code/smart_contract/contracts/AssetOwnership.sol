pragma solidity ^0.4.11;
//import "./ERC721.sol";
//import "./Ownable.sol";

// 1 构造中要设置owner,只有owner可以指定哪个地址发token，暂不考虑跨链，只允许拥有着发token,
//   owner可以修改owner
// 2 approve 先判断是否msg.sender拥有该tokenid
// 3 transfer需要判断是否拥有tokenid
// 4 transferFrom 先判度是否拥有tokenid
// 5 目前tokenid只是一个uint256的数字，从1开始，使用动态数组存储，作为数组索引位置使用，
//   即索引为0的位置不使用，构造时给数组push 1个，总数为数组长度减1
// 6 只有两个权限：owner可指定mintAddress，mintAddress负责发行操作,普通用户只可以操作自己的token
// 开发注:m_开头的变量表示合约状态变量
//contract AssetOwnership is ERC721, Ownable{
contract AssetOwnership{
    address m_owner;
    string constant m_name = "CryPicture";
    string constant m_symbol = "CP";
    address m_mintAddress;// 创建token的地址,由owner设置

    // 所有数字资产的动态数组，索引值即为其Id
    uint256[] m_assets;
    mapping(uint256 => address) public m_assetIndexToOwner;
    mapping(uint256 => address) public m_assetIndexToApproved;
    mapping(address => uint256[]) public m_addressAssets;// 该地址所有的数字资产

    event eventMintAsset(address _own, uint256 assetId);
    event eventTransfer(address _from, address _to, uint256 tokenId);
    event eventApproval(address _owner, address _approved, uint256 tokenId);
    function AssetOwnership() public {
        m_owner = msg.sender;
      // 0 索引位置不使用,提前占位



      m_assets.push(0);
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
    function getOwnerAddress() public view returns(address){
      return m_owner;
    }
    function totalSupply() public view returns (uint256 total){
        return m_assets.length - 1;
    }

    // 整理地址对应的用户资产数组
    function delFromUserList(address _add, uint256 _tokenId) internal {
      uint256[] storage asts = m_addressAssets[_add];
      if(asts.length <= 0){
        return ;
      }
      if(asts.length == 1)
      {
        if(asts[0] == _tokenId){
          delete asts[0];
        }
        return;
      }

      uint256 idx = 0;
      bool bfind = false;
      for(idx = 0; idx < asts.length; idx++){
        if(asts[idx] == _tokenId){
          bfind = true;
          break;
        }
      }
      if(bfind){
        uint256 len = asts.length - 1;
        for( ; idx < len; idx++){
          asts[idx] = asts[idx + 1];
        }
        delete asts[asts.length];
      }
      return ;
    }

    function setMintAddress(address _mintAddr) public onlyOwner{
      require(_mintAddr != address(0));
      m_mintAddress = _mintAddr;
    }
    function getMintAddress() public view returns(address){
      return m_mintAddress;
    }
    function approve(address _to, uint256 _tokenId) external{
      require(_tokenId < m_assets.length);
      require(_tokenId > 0);
      require(_to != address(0));
      require(m_assetIndexToOwner[_tokenId] == msg.sender);
      m_assetIndexToApproved[_tokenId] = _to;
      emit eventApproval(msg.sender, _to, _tokenId);
    }

    function transfer(address _to, uint256 _tokenId) external {
      require(_tokenId < m_assets.length);
      require(_tokenId > 0);
      require(_to != address(0));
      require(m_assetIndexToOwner[_tokenId] == msg.sender);
      m_assetIndexToOwner[_tokenId] = _to;

      delFromUserList(msg.sender, _tokenId);
      m_addressAssets[_to].push(_tokenId);

      emit eventTransfer(msg.sender, _to, _tokenId);
    }
    /////////////////////////////
    function balanceOf(address _owner) public view returns (uint256 balance){
        require(_owner != address(0));
        return m_addressAssets[_owner].length;
    }
    function ownerOf(uint256 _tokenId) external view returns (address owner){
        require(_tokenId > 0);
        require(_tokenId < m_assets.length);
        return m_assetIndexToOwner[_tokenId];
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) external {
      require(_from != address(0));
      require(_to != address(0));
      require(_tokenId > 0);
      require(_tokenId < m_assets.length);
      require(m_assetIndexToApproved[_tokenId] == msg.sender);
      _transFrom(_from, _to, _tokenId);
    }
    function _transFrom(address _from, address _to, uint256 _tokenId) internal {
      require(m_assetIndexToApproved[_tokenId] == _from);
      m_assetIndexToOwner[_tokenId] = _to;

      delFromUserList(_from, _tokenId);
      m_addressAssets[_to].push(_tokenId);
      m_assetIndexToApproved[_tokenId] = address(0);
      emit eventTransfer(_from, _to, _tokenId);
    }
    ////////////////////////////
    function getAssetIDs() public view returns (uint256[] assetIds) {
        if(m_assets.length == 1){
          return new uint256[](0);
        }

        uint256[] memory result = new uint256[](m_assets.length - 1);
        for(uint i = 1;i< m_assets.length;i++){
            result[i - 1] = m_assets[i];
        }
        return result;
    }

    function getAssetByAddress(address _add) public view returns (uint256[] assetIds) {
      uint256[] storage asts = m_addressAssets[_add];
      if(asts.length == 1){
        return new uint256[](0);
      }

      uint256[] memory result = new uint256[](asts.length);
      for(uint idx = 0; idx < asts.length; idx++){
          result[idx] = asts[idx];
      }
      return result;
    }

    function mintAsset() public returns(uint256){
        require(m_mintAddress == msg.sender);
        uint256 tokenId = m_assets.length;
        m_assets.push(tokenId);

        m_assetIndexToOwner[tokenId] = m_mintAddress;
        m_addressAssets[m_mintAddress].push(tokenId);
        emit eventMintAsset(m_mintAddress, tokenId);
        return tokenId;
    }

    // 测试用函数，给几个固定地址，添加几个token，后期会删除
    function test_mintAsset(address _addr) public returns(uint256) {
      require(m_mintAddress == msg.sender);
      uint256 tokenId = m_assets.length;
      m_assets.push(tokenId);

      m_assetIndexToOwner[tokenId] = _addr;
      m_addressAssets[_addr].push(tokenId);
      emit eventMintAsset(_addr, tokenId);
      return tokenId;
    }
}
