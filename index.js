const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;
const usersDb = require('./usersDb');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/users', usersDb.getUsers);
app.get('/users/:id', usersDb.getUserById);
app.post('/users/', usersDb.createUser);
app.put('/users/:id', usersDb.updateUser);
app.delete('/users/:id', usersDb.deleteUser);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});