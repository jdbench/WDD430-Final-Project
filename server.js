require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const mongoose = require('mongoose');
const app = express();
const index = require('./server/routes/app');
const userRoutes = require('./server/routes/user');
const eventRoutes = require('./server/routes/event');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', console.error.bind(console, 'Database connection error:'));
mongoose.connection.once('open', function () {
  console.info('Successfully connected to the database');
});
app.use(express.static(path.join(__dirname, 'dist/wdd430-final-project')));
app.use("/node_modules", express.static('node_modules'));
app.use('/', index);
app.use('/user', userRoutes);
app.use('/event', eventRoutes);
app.get('*', function (req, res) {
  res.render('index.html');
});
const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, function () {
  console.info(`Server started on http://localhost:${port}`)
});