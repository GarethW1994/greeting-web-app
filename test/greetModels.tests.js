//require assert
const assert = require('assert');
const Model = require('../api/models/shoesModel');
//connect to MongoDB
mongoose.connect("mongodb://127.0.0.1/greeting_users");

describe('store shoes', function() {
   //before it fuction run clear the Database
    beforeEach(function(done) {
        Models.Shoes.find({}, function(err) {
            Models.Shoes.remove({}, function(err) {
                done(err);
            });
        });
    });

    it('should add new shoes to MongoDB', function(done) {
        var newShoe = {
            id: 200,
            color: 'Red',
            brand: 'Asics',
            price: 350,
            in_stock: 10,
            size: 3
        }

        Models.Shoes
            .create(newShoe, function(err) {
                Models.Shoes.find({}, function(err, shoes){
                  assert.equal(1, shoes.length);
                  done(err);
                });
            });
    });
});
