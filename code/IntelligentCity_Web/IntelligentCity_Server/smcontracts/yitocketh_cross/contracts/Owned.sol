pragma solidity ^0.4.11;


/// @dev `Owned` is a base level contract that assigns an `owner` that can be
///  later changed
contract Owned {

    /// @dev `owner` is the only address that can call a function with this
    /// modifier
    modifier onlyOwner() {  //判断是否是owner
        require(msg.sender == owner);
        _;
    }

    address public owner;

    /// @notice The Constructor assigns the message sender to be `owner`
    //function Owned() {  //构造函数，在部署时，修改owner
    constructor() public{
        owner = msg.sender;
    }

    address public newOwner;

    /// @notice `owner` can step down and assign some other address to this role
    /// @param _newOwner The address of the new owner. 0x0 can be used to create
    ///  an unowned neutral vault, however that cannot be undone
    function changeOwner(address _newOwner) public onlyOwner {  //只有owner才能够修改newOwner。
        newOwner = _newOwner;
    }


    function acceptOwnership() public {  //当调用者为newOwner时，owner变更为newOwner
        if (msg.sender == newOwner) {
            owner = newOwner;
        }
    }
}
