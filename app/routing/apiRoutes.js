// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendData = require("../data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
 

  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });

  // API POST Requests
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: Infinity
    };

    var userData = req.body;
    var userScores = userData.scores;

    var scoreDifference;

    for (let i = 0; i < friendData.length; i++){
      var currentFriend = friendData[i];
      scoreDifference = 0;

      console.log(currentFriend.name);

      for(let j = 0; j < currentFriend.scores.length; j++){
        const currentFriendScore = currentFriend.scores[j];
        const currentUserScore = userScores[j];

        scoreDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
      }

      if (scoreDifference <= bestMatch.friendDifference){
        bestMatch.name = currentFriend.name;
        bestMatch.photo = currentFriend.photo;
        bestMatch.friendDifference = scoreDifference
      }
    }
    
    friendData.push(userData);

    res.json(bestMatch)
  });

  app.post("/api/clear", function(req, res) {
    // Empty out the arrays of data
    friendData.length = 0;
    res.json({ ok: true });
  });
};
