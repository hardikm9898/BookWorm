const Book = require('../model/book');
const User = require('../model/user');
const { success, error } = require('../response-api/responseApi');
const { statusCode, message } = require('../constant/constant');
const mongoose = require("mongoose")

// ? Input : Title , Price, Description --- Output : Add Book to the Book Database

const addBook = async (req, res) => {
  try {
    const { title, price, description, imageUrl } = req.body;

    const book = new Book({
      title,
      price,
      description,
      imageUrl,
      userId: req.user._id,
    });
    await book.save();
    res
      .status(statusCode.CREATED)
      .json(success('success', message.ADD_BOOK, res.statusCode));
  } catch (err) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(error(message.SERVER_ERROR, res.statusCode));
  }
};

// ? Output : Page with all products

const getBookList = async (req, res) => {
  try {
    const book = await Book.find();
    return res
      .status(statusCode.SUCCESS)
      .json(success('success', { book }, res.statusCode));
  } catch (err) {
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(error(message.SERVER_ERROR, res.statusCode));
  }
};
// ? Input: BookID, EditMode --- Output: Edit Page with Data Populated

const getSingleBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId);
    if (book) {
      return res
        .status(statusCode.SUCCESS)
        .json(success('success', { book }, res.statusCode));
    }
    res
      .status(statusCode.NOT_FOUND)
      .json(error(message.BOOK_NOT_FOUND, res.statusCode));
  } catch (err) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(error(message.SERVER_ERROR, res.statusCode));
  }
};

// ? Input: PID,title,price, description --- Output: UpdateThe Existed Data

const updateBook = async (req, res) => {
  try {
    const { title, price, description } = req.body;
    const { bookId } = req.params;
    const checkBook = await Book.findById(bookId);

    if (checkBook) {
      await Book.updateOne({ _id: bookId }, { title, price, description });
      return res
        .status(statusCode.SUCCESS)
        .json(success('success', message.DATA_UPDATED));
    }
    res
      .status(statusCode.NOT_FOUND)
      .json(error(message.BOOK_NOT_FOUND, res.statusCode));
  } catch (err) { 
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(error(message.SERVER_ERROR, res.statusCode));
  }
};

// ? Input: BID --- Output: Delete The Data

const deleteBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const checkBook = await Book.findById(bookId);
    if (checkBook) {
      await Book.deleteOne({ _id: bookId });
      return res
        .status(statusCode.SUCCESS)
        .json(success('success', message.DATA_DELETED, res.statusCode));
    }
    res
      .status(statusCode.NOT_FOUND)
      .json(error(message.BOOK_NOT_FOUND, res.statusCode));
  } catch (err) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(error(message.SERVER_ERROR, res.statusCode));
  }
};
const addToWhiteList = async (req,res)=>{
 const { id } = req.params;
const userId = req.user._id;

try {
  const user = await User.findOne({ _id: userId });
  // Check if the _id already exists in the whitelist array
  if (user.whitelist.some(item => item._id.toString() === id)) {
    return res
      .status(statusCode.BAD_REQUEST)
      .json(error(message.ALREADY_WHITELISTED, res.statusCode));
  }
const objectId = new mongoose.Types.ObjectId(id)
  user.whitelist.push({ _id:objectId }); // Pushing a new object with _id property
 await User.updateOne({ _id: userId },user);
  return res
    .status(statusCode.SUCCESS)
    .json(success('success', message.WHITELISTED, res.statusCode));
} catch (err) {
  return res
    .status(statusCode.INTERNAL_SERVER_ERROR)
    .json(error(message.SERVER_ERROR, res.statusCode));
}
}
const removeFromWhiteList = async (req,res)=>{
 try {
  const { id } = req.params;
  const userId = req.user._id;
  const user = await User.findOne({ _id: userId });
  // Create a new array with elements that do not match the id
  const updateUser = user.whitelist.filter(el => el._id.toString() !== id);
  await User.updateOne({ _id: userId }, { whitelist: updateUser });

  return res
    .status(statusCode.SUCCESS)
    .json(success('success', message.REMOVE_FROM_WHITELIST, res.statusCode));
} catch (err) {

  return res
    .status(statusCode.INTERNAL_SERVER_ERROR)
    .json(error(message.SERVER_ERROR, res.statusCode));
}

}
const getWhiteListBook= async(req,res)=>{
try {

   const userId = req.user._id;
  const userFetch = await User.findOne({_id:userId})
  
  const whitelistBook = userFetch.whitelist.map(async (el) => {
    const book=await Book.findOne({ _id: el });
    return book
  });
  Promise.all(whitelistBook).then((values) => {
    return res
      .status(statusCode.SUCCESS)
      .json(success('success', values, res.statusCode));
  });
} catch (err) {
   res
     .status(statusCode.INTERNAL_SERVER_ERROR)
     .json(error(message.SERVER_ERROR, res.statusCode));
 
}
}
module.exports = {
  deleteBook,
  updateBook,
  getSingleBook,
  getBookList,
  addBook,
  addToWhiteList,
  getWhiteListBook,
  removeFromWhiteList
};
