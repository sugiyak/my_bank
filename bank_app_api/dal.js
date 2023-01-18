const mongoose = require("mongoose");
const User = require("./schema/users");
const uri = process.env.MONGO_ATLAS_URI;

mongoose.connect(uri);

// create user account
async function create(data){
    try{
        const user = await User.create(data);
        return user;
    }
    catch(error){
        console.log(`error from dal.js/create: ${error.message}`);
        return error.message;
    }

}

// update - deposit/withdraw amount
async function update(email,amount){
    try{
        const user = await User.findOneAndUpdate({ email: email}, {$inc: {balance: parseInt(amount)}}, {new : true});
        console.log(`feedback from dal.js/update: ${user}`);
        return user.toObject();
    }
    catch(error){
        console.log(`error from dal.js/update: ${error.message}`);
        return error.message;
    }
}

// find user account
async function find(email){
    try {
        const user = await User.findOne({email:email});
        console.log(user);
        return user.toObject();
    } catch (error) {
        console.log(`error from dal.js/find: ${error.message}`);
        return error.message;
    }
}


//return all users
async function all(){
    try {
        const users = await User.find();
        console.log(`${users.length} users found`);
        return users;
    } catch (error) {
        console.log(`error from dal.js/all: ${error.message}`);
        return error.message;
    }
};


module.exports = {create, all, find, update};