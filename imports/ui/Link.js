import React from 'react';
// import {Meteor} from 'meteor/meteor';

//import {browserHistory} from 'react-router';
// import {Links} from '../api/links';
import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';

import LinksListFilters from './LinksListFilters';

export default Link =()=>{
  return (
    <div>

      {/* <p>Aquie esta mi super links</p>
      <button onClick={this.onLogout.bind(this)}>Logout</button> */}
      <PrivateHeader title="Tus Links"/>
      <div className="page-content">

          <LinksListFilters/>
          <LinksList/>
          <AddLink/>


      </div>


    </div>
  );

};
