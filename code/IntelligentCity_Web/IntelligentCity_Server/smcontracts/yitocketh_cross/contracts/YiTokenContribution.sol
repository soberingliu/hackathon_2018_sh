pragma solidity ^0.4.22;
import "./SafeMath.sol";
import "./Owned.sol";
import "./YiToken.sol";

contract YiTokenContribution is Owned,YiToken {
    using SafeMath for uint;
    uint public constant YI_TOTAL_SUPPLY = 1000 ether;
    address public yiport;

//   address[5] public constant addressAccounts; = [0x64886f67868a73e18b9f9c7cc33d333d6508767d, 0x091ea3aafedf11f2b0684dcf9afc9a5a05d5992c, 0xcaa2fae6ed21565c50c411a5f5c6b95d9ee8d6a5, 0xc6366f422639048db0baa048771877ac5cd05837, 0x21e2e42bfdadf8963c097fcd8aae29aa06e18397];
    address public constant address1=0x64886f67868a73e18b9f9c7cc33d333d6508767d;
    address public constant address2=0x091ea3aafedf11f2b0684dcf9afc9a5a05d5992c;
    address public constant address3=0xcaa2fae6ed21565c50c411a5f5c6b95d9ee8d6a5;
    address public constant address4=0xc6366f422639048db0baa048771877ac5cd05837;
    address public constant address5=0x21e2e42bfdadf8963c097fcd8aae29aa06e18397;


    //YiToken public yiToken;
    constructor(address _yiport) YiToken(this) public {
        yiport = _yiport;
        //yiToken = YiToken(_yitoken);
       // for(uint i=0; i< 5;i++){
       //     yiToken.mintToken(addressAccounts[i],200);
       // }
        mintToken(address1,200);
        mintToken(address2,200);
        mintToken(address3,200);
        mintToken(address4,200);
        mintToken(address5,200);
    }
    function() public{
        revert();

    }



}
