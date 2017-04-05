import {Meteor} from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import Signup from '../ui/Signup';
import Login from '../ui/Login';

import Link from '../ui/Link';
import NotFound from '../ui/NotFound';

import {Router,Route, browserHistory} from 'react-router';
const unauthenticatedPages=['/','/signup'];
const authenticatedPages=['/links'];

const onEnterPublicPage= ()=>{
if(Meteor.userId()){
  browserHistory.replace('/links');
}
};

const onEnterPrivatePage= ()=>{
if(!Meteor.userId()){
  browserHistory.replace('/');
}
};

export const onAuthChange=(isAuthenticated)=>{
  const pathname=browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage=unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage=authenticatedPages.includes(pathname);

  if(isUnauthenticatedPage && isAuthenticated){
    browserHistory.replace('/links');
  }else if(isAuthenticatedPage && !isAuthenticated){
    browserHistory.replace('/');
  }
  console.log('es verificado',isAuthenticated);
};


export const routes =(
<Router history={browserHistory}>
  <Route path="/" component={Login}  onEnter={onEnterPublicPage} />
  <Route path="/signup" component={Signup} onEnter={onEnterPublicPage} />
  <Route path="/links" component={Link} onEnter={onEnterPrivatePage}/>
  <Route path="*" component={NotFound} />


</Router>

);