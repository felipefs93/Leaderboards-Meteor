console.log("Hello world");
PlayersList = new Mongo.Collection('players');
Meteor.subscribe('thePlayers');
//UserAccounts = new Mongo.collection('users');

Template.leaderboard.helpers({
    'player':function(){
        //return PlayersList.find();
        var currentUserId = Meteor.userId();
        //return PlayersList.find({createdBy: currentUserId}, {sort: {score: -1, name: 1}})
        return PlayersList.find({}, {sort: {score: -1, name: 1}})
    },
    'otherHelperFunction':function(){
        return "Some other function"
    },
    'selectedClass': function(){
        //return "selected"
        //return this._id
        var playerId = this._id;
        var selectedPlayer = Session.get('selectedPlayer');
        if(playerId == selectedPlayer){
            return "selected"
        }
    },
    'showSelectedPlayer': function(){
        var selectedPlayer = Session.get('selectedPlayer');
        return PlayersList.findOne(selectedPlayer);
    }

});

Template.leaderboard.events({
    'click': function(){
        console.log("You clicked something");
    },
    'click li': function(){
        console.log("You clicked li");
    },
    'click .player': function(){
        var playerId = this._id;
        Session.set('selectedPlayer', playerId);
    },
    'click .increment': function(){
        var selectedPlayer = Session.get('selectedPlayer');
        PlayersList.update(selectedPlayer, {$inc: {score: 5}});
    },
    'click .decrement': function(){
        var selectedPlayer = Session.get('selectedPlayer');
        PlayersList.update(selectedPlayer, {$inc: {score: -5}})
    },
    'click .remove': function(){
        var selectedPlayer = Session.get('selectedPlayer');
        //PlayersList.remove(selectedPlayer);
        //console.log(selectedPlayer);
        Meteor.call('removePlayerData', selectedPlayer);
    }
});

Template.addPlayerForm.events({
   'submit form': function(event){
       event.preventDefault();
       var playerNameVar = event.target.playerName.value;
       Meteor.call('insertPlayerData', playerNameVar);
   } 
});
/*
Template.leaderboard.player = function(){
    return "Some other text";
}
*/