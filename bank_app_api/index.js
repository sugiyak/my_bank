require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const dal = require('./dal.js');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const decodeToken = require('./logic');
  
//swagger configuration
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Library API',
            version: '1.0.0'
        }
    },
    apis: ['index.js']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(cors());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//get a specific user's info -- secured
/**
* @swagger
* /account/search/{email}:
*   get:
*     description: Get a specific user's info
*     responses:
*       200:
*         description: Success
*
*/
app.get('/account/search/:email', (req,res)=>{
    let decoded = decodeToken(req,res);
    if(decoded){
        console.log(`feedback from search: Decoded!`);
        dal.find(req.params.email)
        .then((user)=>{
            console.log('feedback from search: Authorized');
            console.log(`feedback from search: ${user}`);
            res.send(user)
        })
    }
    else {
        res.send("Not authorized")
    }
})

//update a specific user's balance  -- secured

/**
* @swagger
* /account/update/{email}/{amount}:
*   post:
*     description: update a specific user's balance
*     responses:
*       200:
*         description: Success
*
*/
app.post('/account/update/:email/:amount', (req,res)=>{
    let data = {email: req.params.email, amount: req.params.amount};
    let decoded = decodeToken(req,res);
    if(decoded){
        console.log('feedback from update: Decoded!');
        dal.update(data.email, data.amount)
        .then((user)=>{
            console.log(`feedback from update: ${user}`);
            res.send(user)
         }).catch((error)=> console.log(error))}
    else {
        res.send("Not authorized")
    }
})

//create account

/**
* @swagger
* /account/create/{name}/{email}/{password}/{role}:
*   post:
*       description: create a new account with the information entered in the form
*   responses:
*           200:
*           description: Success
*
*/
app.post('/account/create/:name/:email/:password/:role', (req,res)=>{
    //create user in database
    let data = {name: req.params.name, email: req.params.email, password: req.params.password, role: req.params.role};
    dal.create(data)
    .then((user)=>{
        console.log(`return from create post: ${user}`);
        res.send(user);
    });
});

//all account

/**
* @swagger
* /account/all:
*   get:
*     description: Retrieve all data in store
*     responses:
*       200:
*         description: Success
*
*/
app.get('/account/all', (req,res)=>{
    dal.all().then((docs)=>{
        console.log(docs);
        res.send(docs);
    });
});

const port = process.env.PORT || 8000;
app.listen(port, ()=>console.log(`Runnning on ${port}`));