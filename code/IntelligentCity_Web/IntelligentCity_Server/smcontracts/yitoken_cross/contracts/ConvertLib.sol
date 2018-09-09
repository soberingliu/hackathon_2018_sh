pragma solidity ^0.4.4;

library ConvertLib{
	function convert(uint amount,uint conversionRate) public pure returns (uint convertedAmount)  //转化比例
	{
		return amount * conversionRate;
	}
}
