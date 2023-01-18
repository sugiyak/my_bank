const admin = require('./admin');

//decode firebase token
async function decodeToken(req, res){
    const token = req.headers.authorization.split(" ")[1];
    try{
        return await admin.auth().verifyIdToken(token);
    } catch(error){
        console.log(`error from decodeToken: ${error}`);
    };
    
    };

module.exports = decodeToken;
