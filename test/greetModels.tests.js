//require assert
const assert = require('assert');
const model = require('../models');
//connect to MongoDB
var Models = model("mongodb://127.0.0.1/greeting_users")

describe('store names', function() {
   //before it fuction run clear the Database
    beforeEach(function(done) {
        Models.users.find({}, function(err) {
            Models.users.remove({}, function(err) {
                done(err);
            });
        });
    });

    it('should add new person to MongoDB database', function(done) {
        var newPerson = {
            name: 'Jonny',
            languages: 'English',
            timesGreeted: 1
        }

        Models.users
            .create(newPerson, function(err) {
                Models.users.find({}, function(err, result){
                  assert.equal(1, result.length);
                  done(err);
                });
            });
    });
});
