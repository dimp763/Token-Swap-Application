
const Token = artifacts.require("./Token.sol");
const ethswap = artifacts.require("./ethswap.sol");

module.exports = async function(deployer) {
  
  await deployer.deploy(Token);
  const token = await Token.deployed()
  
   await deployer.deploy(ethswap, token.address);
   const EthSwap = await ethswap.deployed()

   //Transfer 1 million tokens to ethswap

   await token.transfer(EthSwap.address,'1000000000000000000000000')
};
