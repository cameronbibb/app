const express = require('express');
const usersDb = require('./usersDb');
const connectDB = require('./config/mongoDb.js');
const routes = require('./routes/api/books');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors({ origin: true, credentials: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// users routes
app.get('/users', usersDb.getUsers);
app.get('/users/:id', usersDb.getUserById);
app.post('/users/', usersDb.createUser);
app.put('/users/:id', usersDb.updateUser);
app.delete('/users/:id', usersDb.deleteUser);

// books routes
app.use(routes);

connectDB();

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, Postgres, and MongoDB API' });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});