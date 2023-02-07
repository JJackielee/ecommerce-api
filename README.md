# ecommerce-api
A web application that sends json data on product inventory

## Description

This application is an api that spits of data of product inventory and associated tags and category related to the product. You are able to get all the data of a product, categary and tag. You are also able to update existing products, category and tag. You can also delete data from the database. Everything is achieve with REST api so you need to send a get/post/put/delete request with required data in the body for it to work. 

What I learn from this project is the use of mysql with sequelize. I was able to use models to create tables and use routes to create request to return data. I learned to use .dotenv to hide sensitive information while connecting to my mysql database. I also learn the use of association to connect data base together with sequelize instead of connecting the database with mysql queries. 

## Installation

After cloning all the files from the respository you would need to install a few packages to be able to run this application. First you will need to install mysql into your computer. Then You would need node.js, mysql2.js, sequelize, dotenv and  express. With the included package.json file in the repository you would only need to run "npm install" after installing node.js into your local machine. 

## Usage
- install mysql
- install node.js
- install mysql2
- install sequelize
- install dotenv
- install express 
- run schema.sql and npm run seed to create the table and add data into the tables
- run node server.js in the root folder to start the server
- make a get request to the server for each router (category, product, tag)
- make a post request to the server for each router (category, product, tag) with body data
- make a Delete request to the server for each router (category, product, tag) with a parameter


[link to walk through video](https://drive.google.com/file/d/1uyE-WD1XdSZmj0IyS7aR22_9IhWb0n74/view)


## Credits

N/A

## License

N/A

---


## Features

Users are able to view, add, update and delete data to our data base using fetch request of the appropriate method. 