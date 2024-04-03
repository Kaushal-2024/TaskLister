const fs = require('fs');
const path = require('path');

function addUser(userObj) {    

    let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, './userFile.json'), 'utf8'))
    
    userObj.id = Date.now()
    users.push(userObj)

    fs.writeFileSync(path.resolve(__dirname, './userFile.json'), JSON.stringify(users), function (err) {
        if (err) throw err;
    });

    console.log("user added in file")
}

function getAllUser() {    
    let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, './userFile.json'), 'utf8'))
    return users;
}

function getUserbyId(userId) {

    let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, './userFile.json'), 'utf8'))
    let user = users.filter((users) => users.id == userId)
    return user;

}

module.exports = {
    addUser, getAllUser, getUserbyId
}