import { Meteor } from 'meteor/meteor';
import "../lib/collections.js";
import { Accounts } from '../lib/collections.js';
import { Evts } from '../lib/collections.js';
import { Msgs } from '../lib/collections.js';
import { Admin } from '../lib/collections.js';
import { FilesCollection } from 'meteor/ostrio:files';

const Images = new FilesCollection({
  storagePath: 'E:/Projects/meteor project/trial2/flask/images',
  debug: true,
  collectionName: 'Image',
  allowClientCode: false, // Disallow remove files from Client
 
});
Meteor.startup(() => {
  // code to run on server at startup
  process.env.MAIL_URL='smptp://postmaster%40sandbox58885c47ee044c9da3d00207e6173191.mailgun.org:1a76c28d52d935a7291dd44bfe377188-2af183ba-f520582a@smtp.mailgun.org';
  process.env.MONGO_URL='mongodb+srv://admin:8911@cluster0.w1luo.mongodb.net/healthreq?retryWrites=true';
});


Meteor.publish("accounts", function(){
  return Accounts.find({});
});
Meteor.publish("events", function(){
  return Evts.find({});
});
Meteor.publish("messages", function(){
  return Msgs.find({});
});
Meteor.publish("admin", function(){
  return Admin.find({});
});

Meteor.methods({
  addUser: function(info, name){
    let findout = Accounts.find({name:name}).fetch();
    let found = findout.length;
    console.log(found); 
    if(found > 0){
      throw new Meteor.Error("User already exist");
    }else{
    info.createdOn = new Date();
    Admin.insert(info);
    }

  },

  addMesg: function(mesg){
    mesg.CreatedAt = new Date()
    Msgs.insert(mesg);
  },
  sendEmail: function(to, from, subject, text) {
    // Make sure that all arguments are strings.
    check([to, from, subject, text], [String]);

    // Let other method calls from the same client start running, without
    // waiting for the email sending to complete.
    this.unblock();

    Email.send({ to:to, from:from, subject:subject, text:text });
  }
});
