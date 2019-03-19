// DATA

var friends = require("../data/friends");

// ROUTING

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        // compare results database
        // calculate the difference between numbers.
        // choose the user with least differences.
        // push the user to the database.
        // hold the "best match".
        // loop through all of the options
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: Infinity
        };

        // POST and parse user scores.
        var userData = req.body;
        var userScores = userData.scores;

        // calculate the difference between the user"s scores and the database.
        var totalDifference;

        // loop through all the friend possibilities in the database.
        for (var i = 0; i < friends.length; i++) {
            var currentFriend = friends[i];
            totalDifference = 0;

            console.log(currentFriend.name);

            // loop through scores of each friend
            for (var j = 0; j < currentFriend.scores.length; j++) {
                var currentFriendScore = currentFriend.scores[j];
                var currentUserScore = userScores[j];

                // calculate the difference between scores and sum them into the totalDifference
                totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
            }

            // If the sum of differences is less then the differences of the current "best match"
            if (totalDifference <= bestMatch.friendDifference) {
                // Reset the bestMatch to be the new friend.
                bestMatch.name = currentFriend.name;
                bestMatch.photo = currentFriend.photo;
                bestMatch.friendDifference = totalDifference;
            }
        }

        // save the user's data to the database 
        friends.push(userData);

        // Return a JSON with the user's bestMatch. 
        res.json(bestMatch);
    });
};
