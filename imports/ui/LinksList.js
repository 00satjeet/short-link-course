import React from 'react';
import {Tracker} from 'meteor/tracker';
import {Meteor} from 'meteor/meteor';
import {Links} from '../api/links';
import LinksListItem from './LinksListItem';

import {Session} from 'meteor/session';

import FlipMove from 'react-flip-move';




export default class LinksList extends React.Component{
  constructor(props){
    super(props);
    this.state={
      links: []

    };
  }
  componentDidMount(){
    this.linksTraker=Tracker.autorun(()=>{
      Meteor.subscribe('links');
      const misLinks=Links.find({
        visible:Session.get('showVisible')
      }).fetch();
      this.setState({links:misLinks});
      console.log('los links que tengo son', misLinks);
    });
  }
  componentWillUnmount(){
    console.log('desmontando los links');

    this.linksTraker.stop();
  }
  renderLinksListItems(){
    if(this.state.links.length===0){
      return(
        <div className="item">
          <p className="item__status-message"> No se encontraron Links</p>
        </div>

      );
    }
    return this.state.links.map((link)=>{
      const shortURL=Meteor.absoluteUrl(link._id);

      return <LinksListItem key={link._id} shortUrl={shortURL} {...link} />;
        // return <p key={link._id}> {link.url}</p>
      });

  }

  render(){
    return(
      <div>
            
          <FlipMove maintainContainerHeight={true}>
              {this.renderLinksListItems()}
          </FlipMove>

      </div>

    );
  }
}
