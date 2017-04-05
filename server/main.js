import { Meteor } from 'meteor/meteor';
import {WebApp} from 'meteor/webapp';
import {Links} from '../imports/api/links'

import '../imports/api/users';
import '../imports/api/links';
import '../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {
  // code to run on server at startup
/*
  WebApp.connectHandlers.use((req,res,next)=>{
    res.statusCode=302;
    res.setHeader('Location','http://www.google.com');
    res.end();
  });
*/
  WebApp.connectHandlers.use((req,res,next)=>{
    const _id=req.url.slice(1);
    const link= Links.findOne({_id:_id});
    if(link){
      res.statusCode=302;
      res.setHeader('Location',link.url);
      res.end();
      Meteor.call('links.trackVisit',_id);
    }else{
      next();
    }

  });


});
