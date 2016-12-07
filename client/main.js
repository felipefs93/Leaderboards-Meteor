console.log("Hello world");
PlayersList = new Mongo.Collection('players');

Template.leaderboard.helpers({
    'player':function(){
        return PlayersList.find();
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
        PlayersList.update('selectedPlayer', {score: 5});
    }
});
/*
Template.leaderboard.player = function(){
    return "Some other text";
}
*/