require("dotenv").config();
//requires dotenv to connect to database so my passwords can be hidden
//uses express to use local port 3001 and routes for the controllers
//uses sequelize to intiate the tables
const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({force:false}).then(function() {
  app.listen(PORT, function() {
      console.log('App listening on PORT ' + PORT);
  });
});