import React, { Component } from 'react';
import Web3 from 'web3'
import BuyForm from './BuyForm'
import SellForm from './SellForm'


class Main extends Component {
    
    constructor(props) {
        super(props)
        this.state ={
          currentForm:'buy',
          
          
        }
      }

	
    render() {
      //  let value
      //  function tokens(n) {
      //   return Web3.utils.fromWei(n,'ether');
        let content
         if (this.state.currentForm=== 'buy') 
        {content =  <BuyForm
           
           ethBalance={this.props.ethBalance}
           TokenBalance={this.props.TokenBalance}
           buyTokens={this.props.buyTokens}
           /> } 
          else 
        {content = <SellForm
           ethBalance={this.props.ethBalance}
           TokenBalance={this.props.TokenBalance}
           SellTokens={this.props.SellTokens}


          /> };
       
      return (        
           
      <div id ="content" className="mt-3"> 

          <div className="d-flex justify-content-between mb-3">
          <button 
          className="btn btn-light"
          onClick={(event)=> {
            this.setState({currentForm:'buy'})
           }}
           >
             Buy
           </button>
           <span className="text-muted">&lt; &nbsp; &gt;</span>
           <button className="btn btn-light"
            
           onClick={(event)=> {
            this.setState({currentForm:'Sell'})
           }}

           >
             Sell
            </button>
           </div>  
             
             {content}
       </div>
          
          )
    }

}          

export default Main;
