import { Mongo } from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links=new Mongo.Collection('links');

if(Meteor.isServer){
  Meteor.publish('links', function(){
    return Links.find({userId:this.userId});
  });
}

Meteor.methods({
  'links.insert'(url){
    if(!this.userId){
      throw new Meteor.Error('Usuario no autorizado');
    }

    new SimpleSchema({
      url:{
        type:String,
        label:'Your Link',
        regEx:SimpleSchema.RegEx.Url
      }
    }).validate({url});


    Links.insert({
      _id:shortid.generate(),
      url:url,
      userId:this.userId,
      visible:true,
      visitedCount:0,
      lastVisitedAt:null
    });

  },
  'links.setVisibility'(_id,visible){
    if(!this.userId){
      throw new Meteor.Error('Usuario no autorizado');
    }
    new SimpleSchema({
      visible:{
        type:Boolean,
      },
      _id:{
        type: String,
        min: 1,
      }
    }).validate({visible,_id});
    Links.update({
      _id,
      userId:this.userId
    },{
      $set:{visible}
    });

  },
  'links.trackVisit'(_id){
    new SimpleSchema({
      _id:{
        type: String,
        min: 1,
      }
    }).validate({_id});

    Links.update({_id:_id},{
      $set:{
        lastVisitedAt:new Date().getTime()
      },
      $inc:{
        visitedCount:1
      },
    });
  },



});
