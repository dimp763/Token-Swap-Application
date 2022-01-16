
pragma solidity ^0.5.0;

import "./Token.sol" ;

contract ethswap {
  string public name = 'Ethswap Instant Exchange' ;
   Token public token ;
   uint public rate = 100;
   
    event TokensPurchased(
        address account,
        address token,
        uint Amount,
        uint rate


    	);

    event TokensSold(
        address account,
        address token,
        uint Amount,
        uint rate


    	);

   constructor(Token _token) public {
    
      token = _token;

   }

   function buyTokens() public payable {
   uint tokenAmount = msg.value * rate ;
   //Amount of Ethereum * redemption rate
   //ethswap has enough tokens in order for the transfer to be executed
   require(token.balanceOf(address(this)) >= tokenAmount);
   token.transfer(msg.sender,tokenAmount);

   //emit an event
   emit TokensPurchased(msg.sender, address(token),tokenAmount,rate);
   }

   function SellTokens(uint _amount) public {
    //user can't sell more tokens than they have
    require(token.balanceOf(msg.sender) >= _amount) ;

       uint etherAmount = _amount / rate ;
      //require that ethswap has enough ether
     require (address(this).balance >= etherAmount); 

      //Perform sale
      token.transferFrom(msg.sender, address(this), _amount);
      msg.sender.transfer(etherAmount);

   
    emit TokensSold(msg.sender,address(token),_amount,rate);
   } 

   
    



}

