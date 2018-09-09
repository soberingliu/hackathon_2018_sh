pragma solidity ^0.4.11;
import "./StandardToken.sol";
import "./SafeMath.sol";

contract YiToken is StandardToken{
    using SafeMath for uint;
    event EventMint(address receipent, uint amount,uint sum);
    event EventDestory(address _addr, uint amount);
    event EventTransferCross(address _fromAddr, address _toAddr, uint amount);

    string public constant name = "YiCoin";
    string public constant symbol = "YI";
    uint public constant decimals = 18;

    uint public constant MAX_TOTAL_TOKEN_AMOUNT = 3000 ether;
    address public minter;

    //mapping(address=>uint) public balances;
    mapping(address=>address) public accountmap;//wanchain => eth

    modifier onlyMinter{
        assert(msg.sender == minter);
        _;
    }
    modifier maxYiTokenAmountNotReached(uint amount){
        assert(totalSupply.add(amount) <= MAX_TOTAL_TOKEN_AMOUNT);
        _;
    }
 /*  function setMinter(address _minter) public {
        minter = _minter;
    }*/
    constructor(address _minter) public {
        minter = _minter;

    }
    function mintToken(address receipent, uint amount)
           external
           //onlyMinter
            //maxYiTokenAmountNotReached(amount)
            returns(bool){
        balances[receipent]=balances[receipent].add(amount);
        totalSupply = totalSupply.add(amount);
        emit EventMint(receipent,amount,balances[receipent]);
        return true;
    }
    function destoryToken(address _addr, uint amount) public {
        require(balances[_addr] > amount);
        balances[_addr] = balances[_addr].sub(amount);
        totalSupply = totalSupply.sub(amount);
        emit EventDestory(_addr,amount);
    }
    function transferCross(address _fromAddr, address _toAddr, uint amount) public{
        require(balances[_fromAddr] > amount);
        emit EventTransferCross(_fromAddr, _toAddr, amount);
    }
    function addAccountMap(address _wanAddr, address _ethAddr) public {
        accountmap[_wanAddr] = _ethAddr;
    }




}