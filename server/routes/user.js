const express = require('express');
const {
  addBook,
  getBookList,
  updateBook,
  deleteBook,
  getSingleBook,
  addToWhiteList,
  getWhiteListBook,
  removeFromWhiteList
} = require('../controller/user-controller');
const validator = require('../middleware/validation');

const { bookSchema } = require('../validator/validate');

const router = express.Router();

router.post("/book/whitelist/:id",addToWhiteList) // ? add to whitelist
router.delete("/book/whitelist/:id", removeFromWhiteList) // ? add to whitelist
router.get('/book/whitelist', getWhiteListBook); // ? Get Whitelist books
router.get('/book/:bookId', getSingleBook); // ? Get Single Book
router.post('/book', validator(bookSchema), addBook); // ? add Book
router.get('/book', getBookList); // ? show  Booklist
router.put('/book/:bookId', validator(bookSchema), updateBook); // ? Update Book data in edit page
router.delete('/book/:bookId', deleteBook); // ? Delete Book
module.exports = router;
