
pragma solidity ^0.4.11;

import './StandardToken.sol';
import './Owned.sol';

contract TestToken is StandardToken, Owned {
  /**************************************
   **
   ** VARIABLES
   **
   **************************************/

  string public name = "2.x Test Token";
  string public symbol = "WCT";
  uint8 public decimals = 18;

  function TestToken(address user, address user2, uint amount) public {
    balances[user] = amount;
    totalSupply = totalSupply.add(amount);
    balances[user2] = amount;
    totalSupply = totalSupply.add(amount);
  }

  /// @notice If WAN coin is sent to this address, send it back.
  /// @dev If WAN coin is sent to this address, send it back.
  function () 
    public
    payable 
  {
    revert();
  }
  
}
