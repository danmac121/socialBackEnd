# SocialBackEnd

## Description

This social media backend allows you to create, read, update and delete users and thoughts, add and delete reactions to thoughts, and add or delete friends from users. It also ensures that when a user is deleted, all of their thoughts are also deleted. To use this code, you must have mongoDB compass if you want to view the full database, and insomnia to test all of the end points. When hitting certain end points, you must pass the proper parameters in json in insomnia. Refer to the models or walkthrough video linked below to see what parameters must be passed. 

## Installation
To use this application, ensure you have insomnia and mongoDB Compass installed. Clone down the repo and run npm i express, npm i mongoose, and npm i moment(for formatting the dates). Open your terminal and run "npm run seed" to seed the database. Then run nodemon index.js to initialize the server. You can now use insomnia to hit your desired end points to create, read, update, and delete items in the database. 

[Here is a link to the walkthrough video](https://drive.google.com/file/d/1kTF2jRcVd6vX8_a_SAgPXGNljliXv1aQ/view?usp=sharing)
