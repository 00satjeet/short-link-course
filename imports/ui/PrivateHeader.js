import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';

const PrivateHeader =(props)=>{
  // onLogout(){
  //   Accounts.logout();
  // }
  return(
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">{props.title}</h1>
        <button className="button button--link-text" onClick={() => Accounts.logout()}>Logout</button>
      </div>

    </div>
  );

}

{/* <button onClick={this.onLogout.bind(this)}>Logout</button> */}

PrivateHeader.propTypes={
  title:React.PropTypes.string.isRequired,


};

export default PrivateHeader;
