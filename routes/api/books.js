const express = require('express');
const router = express.Router();

const Book = require('../../models/Book');

router.get('/test', (request, response) => response.send('book route testing!'));

router.get('/books', (request, response) => {
  Book.find()
    .then(books => response.json(books))
    .catch(err => response.status(404).json({ nobooksfound: 'No Books found' }));
});

router.get('/books/:id', (request, response) => {
  Book.findById(request.params.id)
    .then(book => response.json(book))
    .catch(err => response.status(404).json({ nobookfound: 'No Book found' }));
});

router.post('/books', (request, response) => {
  Book.create(request.body)
    .then(book => response.json({ msg: 'Book added successfully' }))
    .catch(err => response.status(400).json({ error: 'Unable to add this book' }));
});

router.put('/books/:id', (request, response) => {
  Book.findByIdAndUpdate(request.params.id, req.body)
    .then(book => response.json({ msg: 'Updated successfully' }))
    .catch(err =>
      response.status(400).json({ error: 'Unable to update the Database' })
    );
});

router.delete('/books/:id', (request, reponse) => {
  Book.findByIdAndDelete(request.params.id)
    .then(book => reponse.json({ mgs: 'Book entry deleted successfully' }))
    .catch(err => reponse.status(404).json({ error: 'No such a book' }));
});

module.exports = router;