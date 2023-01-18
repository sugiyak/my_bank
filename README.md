# MyBank

MyBank is a mock bank app. 
It is a secured three layered app and composed of frontend, api, database(MongoDB Atlas).


This app was made as a capstone project for MIT professional certificate for full-stack development program.

## Features
* Create accounts
* Login/logout
* Deposit/Withdraw
* Data browser
* Authenticated interactions between frontend and api and database server
* Responsive design


## Used technology
* React.js
* Node.js
* Express
* Plain CSS
* Bootstrap
* Javascript
* MongoDB(Mongoose)
* Firebase authentivation

## How to use
To use this app, you need to get firebase api keys for authorization and your mongodb atlas URI. 
Each keys can be obtainable via the following pages:

#### Frontend firebase api key
* https://console.firebase.google.com => yourproject => setting(general) => generate api key for a web app
#### Backend(admin) firebase api key
*  https://console.firebase.google.com => yourproject => setting(service account) => generate private key for a web app
#### mongodb URI
* https://www.mongodb.com/basics/create-database

Save api keys in .env files. Frontend api goes under bank_app folder and other two goes under bank_app_api folder.


