pragma solidity ^0.4.22;
import "./SafeMath.sol";
import "./Owned.sol";
import "./YiToken.sol";

contract YiTokenContribution is Owned{
    using SafeMath for uint;
    uint public constant YI_TOTAL_SUPPLY = 3000 ether;
    address public yiport;

//   address[5] public constant addressAccounts; = [0x64886f67868a73e18b9f9c7cc33d333d6508767d, 0x091ea3aafedf11f2b0684dcf9afc9a5a05d5992c, 0xcaa2fae6ed21565c50c411a5f5c6b95d9ee8d6a5, 0xc6366f422639048db0baa048771877ac5cd05837, 0x21e2e42bfdadf8963c097fcd8aae29aa06e18397];
    address public constant address1=0x695a8e2e185173f89c98d3e49f5ebceccab25244;
    address public constant address2=0xe59e07c82b778b422d2aa91de2d757497c609e05;
    address public constant address3=0x246366f82bea498f6351a1933f60b20208f1126e;



    YiToken public yiToken;
    constructor(address _yiport) public {
        yiport = _yiport;
        //yiToken = YiToken(_addYItoken);
       // for(uint i=0; i< 5;i++){
       //     yiToken.mintToken(addressAccounts[i],200);
       // }
        //yiToken.setMinter(this);
        yiToken = new YiToken(this);
        yiToken.mintToken(address1,1000);
        yiToken.mintToken(address2,1000);
        yiToken.mintToken(address3,1000);

    }
    function getTokenAddress() public view returns (address){
        return address(yiToken);
    }

    function() public{
        revert();

    }



}
