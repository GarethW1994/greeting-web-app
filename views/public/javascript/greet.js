'use strict';
var filterNames = [];
var userNames = [];


var greet = function(name) {    
        userNames.push({user: name});
    
        
        if (filterNames.length == 0) {
                filterNames.push(name);       
        } else {
            if (filterNames.includes(name) === false) {
                filterNames.push(name);       
            }    
        }
    
            
        return filterNames;
}

var addedNames = function(name) {
var userMap = {};        
    
    for (var x = 0; x < userNames.length; x++) {
            var userList = userNames[x];
            var user = userList.user;
            
            if (userMap[user] === undefined) {
                userMap[user] = 0;
            }
            
            userMap[user] += 1;
        }
    
        for (var n in userMap) {
            if (n === name) {
            return userMap[n];   
            }
        }
}

//export modules
module.exports = {
  greetUser: greet,
  nameList: addedNames
}