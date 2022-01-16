const Token = artifacts.require("./Token.sol");
const ethswap = artifacts.require("./ethswap.sol")

require('chai')
   .use(require('chai-as-promised'))
    .should()

    function tokens(n) {
    	return web3.utils.toWei(n, 'ether');
    }

contract('ethswap', ([deployer, investor]) => {
       
       let token , EthSwap
     
       before( async() =>{
       token = await Token.new() 
       EthSwap = await ethswap.new(token.address)
      await token.transfer(EthSwap.address,'1000000000000000000000000')


      })



    describe('Token deployment', async() => {
      it('contract has a name', async() => {
       let token = await Token.new()
       const name = await token.name()
	    assert.equal ( name,'DApp Token')
	
	  }) 

    })

    describe('ethswap deployment', async() => {
      it('contract has a name', async() => {
        const name = await EthSwap.name()
	    assert.equal ( name,'Ethswap Instant Exchange')
	
	  }) 

    


      it('contract has tokens', async() => {
     // let token = await Token.new() 
      //let EthSwap = await ethswap.new()
      //await token.transfer(EthSwap.address,'1000000000000000000000000')
      let balance = await token.balanceOf(EthSwap.address)
      assert.equal(balance.toString(),'1000000000000000000000000') 

       
       })
    

    })
     




       describe('buyTokens()' , async () => {
       	let result
        before(async() => {
        result = await EthSwap.buyTokens({from: investor, value: web3.utils.toWei('1', 'ether')})
         
         })  


         it('allows user to instantly purchase tokens from ethswap for a fixed price' , async() => {
         let investorBalance = await token.balanceOf(investor)
         assert.equal(investorBalance.toString(),tokens('100'))
         
         //Check EthSwap balance after purchase

         let EthSwapBalance
         EthSwapBalance = await token.balanceOf(EthSwap.address)
         assert.equal(EthSwapBalance.toString(), tokens('999900') )
         EthSwapBalance = await web3.eth.getBalance(EthSwap.address)
         assert.equal(EthSwapBalance.toString(),web3.utils.toWei('1','ether'))

         const event = result.logs[0].args
         assert.equal(event.account,investor)
         assert.equal(event.token,token.address)
         assert.equal(event.Amount.toString() , tokens('100').toString())
         assert.equal(event.rate.toString() ,'100')


         })



       })

       describe('sellTokens()' , async () => {
       	   let result
           before(async() => {
            await token.approve(EthSwap.address, tokens('100'),{from: investor})	
            result = await EthSwap.sellTokens( tokens('100') , {from: investor} )
         
           })  


         it('allows user to instantly sell Tokens to ethswap for a fixed price' , async() => {
         let investorBalance = await token.balanceOf(investor)
         assert.equal(investorBalance,tokens('0') )

         let EthSwapBalance
         EthSwapBalance = await token.balanceOf(EthSwap.address)
         assert.equal(EthSwapBalance.toString(), tokens('1000000') )
         EthSwapBalance = await web3.eth.getBalance(EthSwap.address)
         assert.equal(EthSwapBalance.toString(),web3.utils.toWei('0','ether'))

         const event = result.logs[0].args
         assert.equal(event.account,investor)
         assert.equal(event.token,token.address)
         assert.equal(event.Amount.toString() , tokens('100').toString())
         assert.equal(event.rate.toString() ,'100')

         await EthSwap.sellTokens(tokens('500'),{from: investor}).should.be.rejected;



         })



    })


})

