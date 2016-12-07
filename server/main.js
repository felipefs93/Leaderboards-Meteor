import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
    console.log("Hello World from server");
    PlayersList = new Mongo.Collection('players');
    //UserAccounts = new Mongo.Collection('users');
    //console.log(PlayersList.find({name: "Mary"}).fetch()[0].name);
});
