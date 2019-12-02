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
    console.log(req.body);  
    friendData.push(req.body);
  });

  app.post("/api/clear", function(req, res) {
    // Empty out the arrays of data
    friendData.length = 0;
    res.json({ ok: true });
  });
};
