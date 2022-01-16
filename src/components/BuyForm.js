
import React, { Component } from 'react';
import tokenlogo from '../token-logo.png'
import ethlogo from '../eth-logo.png'
import Web3 from 'web3'
import Token from '../abis/Token.json'


class BuyForm extends Component {

 
	     
    constructor(props) {
    	
          
        super(props)
        this.state ={
          output:'0',
          Token:'',
          account:''
        }
      }
     
     
   
      
	
     
      render() {
        
    
        let value
        function tokens(n) {
         return Web3.utils.fromWei(n,'ether');
        
        }
      
       

        return (        
       
         <div id="content" > 

           
        <div>
          <label className="float-left"><b>Input</b></label>
          <span className="float-right text-muted">
            Balance: {tokens(this.props.ethBalance)}
                      
            
            </span>
          

        </div>
        <div className="input-group mb-4">

          <input
            type="text"
            onChange={(event)=>{
            console.log('Changing...')
            const etheramount=this.input.value.toString()
            this.setState({
            output:etheramount *100
            }) 
            console.log(this.state.output)
            }}
            ref ={(input)=>{this.input=input}}
         
          className="form-control form-control-lg"
          placeholder="0"
            required />
          <div className="input-group-append">
            <div className="input-group-text">
             <img src={ethlogo} height='32' alt=""/>
              &nbsp;&nbsp;&nbsp; ETH
            </div>
          </div>
        </div>
        
        <div>
          <label className="float-left"><b>Output</b></label>
           <span className="float-right text-muted">
           Balance:{this.props.TokenBalance}
          </span>
           
          
      
        </div>
        <div className="input-group mb-2">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="0"
            value={this.state.output}

            disabled
          />
          <div className="input-group-append">
            <div className="input-group-text">
             <img src={tokenlogo} height='32' alt=""/>
              &nbsp; DApp
            </div>
          </div>
        </div>
        <div className="mb-5">
          <span className="float-left text-muted">Exchange Rate</span>
          <span className="float-right text-muted">1 ETH = 100 DApp</span>

        </div>
        <button type="submit" className="btn btn-primary btn-block btn-lg"      
        onClick={(event)=>{
            event.preventDefault()
            let etheramount
            etheramount= this.input.value.toString()
            etheramount = window.web3.utils.toWei(etheramount,'ether')
            this.props.buyTokens(etheramount)
            console.log('purchasing tokens')
          }}>SWAP!</button>
      
      


      
      </div>

          )

          }

      
    }


export default BuyForm;
