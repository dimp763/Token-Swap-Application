import React, { Component } from 'react';
import Web3 from 'web3'
import ethswap from '../abis/ethswap.json'
import Token from '../abis/Token.json'
import Navbar from './Navbar'
import Main from './Main'



import './App.css';

class App extends Component {

    async componentWillMount() {
    await this.loadWeb3()
    console.log(window.web3)
    await this.loadBlockchainData()
    }
 
     async loadBlockchainData() {
         const web3 = window.web3

         const accounts = await web3.eth.getAccounts()
         this.setState({ account: accounts[0]})
         console.log(this.state.account)
         
         const ethBalance = await web3.eth.getBalance(this.state.account)
         this.setState({ethBalance})
         console.log(this.state.ethBalance)
        
         
         //Load Token
         const abiToken = Token.abi
         const networkID = await web3.eth.net.getId()
         const TokenData = Token.networks[networkID]
        
          if (TokenData)  {
          
          const Token = new web3.eth.Contract(abiToken,TokenData.address) 
          this.setState({Token}) 
           let TokenBalance = await Token.methods.balanceOf(this.state.account).call()
           this.setState( {TokenBalance: Web3.utils.fromWei(TokenBalance.toString(),'ether')})
           console.log(this.state.TokenBalance)
           console.log(this.state.Token.Address)
            } 
          else {
          window.alert ('Token contract not deployed to detected network')

         }
          
          //Load ethswap
          const abiethswap = ethswap.abi
          const ethswapData = ethswap.networks[networkID]
        
          if (ethswapData)  {
          
          const ethswap = new web3.eth.Contract(abiethswap,ethswapData.address) 
          this.setState({ethswap}) 
            } 
          else {
          window.alert ('Token contract not deployed to detected network')

          // this.setState({loading:false})
         }

      }
      

     async loadWeb3() {
    
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        
            // Request account access if needed
            await window.ethereum.enable();
            // Acccounts now exposed
    }        
     else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
     }
     else {
       window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
     }
        
       this.setState({loading:false})
   }
    
     buyTokens = (etheramount) => {
      this.setState({loading:true})
      this.state.ethswap.methods.buyTokens().send({ value: etheramount, from:this.state.account}).
      on('transactionHash',(hash)=>{this.setState({loading:false})

      })
    
    }
      
      SellTokens = (tokenAmount) => {
      this.setState({loading:true})
      this.state.Token.methods.approve(this.state.ethswap._address, tokenAmount).send({  from:this.state.account })
      this.state.ethswap.methods.sellTokens(tokenAmount).send({  from:this.state.account}).
      on('transactionHash',(hash)=>{this.setState({loading:false})
      
      })
    
    }
    
    


      constructor(props) {
        super(props)
        this.state ={
          account: '',
          ethBalance:'0',
          Token:{},
          ethswap:{},
          TokenBalance:'',
          loading: true
          
        }
      
       

      }
      
     
       
      render() {
        let content
       //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
       //return (this.state.loading ? content = <p id='loader' className='text-center'>Loading..</p> :content = <Navbar/>) 
      
      if (this.state.loading) 
        {content = <p id='loader' className='text-center'>Loading..</p>} 
      else 
        {content = <Main ethBalance={this.state.ethBalance} 
         TokenBalance={this.state.TokenBalance}
         buyTokens={this.buyTokens}
         SellTokens={this.SellTokens}
         />};
       

        return(
           
    <div className="container-fluid mt-5">
         <Navbar account={this.state.account}/>
        <div className="row">
       
            <main role="main" className="col-lg-4 ml-auto mr-auto" style={{maxwidth: '-600px'}}>
         
            <div className="content mr-auto ml-auto ">
                <a
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                >
                 

            
               </a>
               {content}
               
              </div>
            </main>
          </div>
         </div>
      

          )

      }
    }


export default App;
