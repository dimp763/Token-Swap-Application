
import React, { Component } from 'react';

import { useState } from 'react';
//this.props = {account:accounts[0]}




class Navbar extends Component {

  render() {

      return (
         
     

       <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
           className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
           
           >
           
            EthSwap 
          </a>
        <ul className="navbar-nav px-2">
          <li className="nav-item text-wrap d-none d-sm-none d-md-block">
            <small className="text-secondary">
              <small id="account">{this.props.account}</small>
            </small>
          </li>
        </ul>
   
         
        </nav>           
      
         
    );
  }

}
export default Navbar;
