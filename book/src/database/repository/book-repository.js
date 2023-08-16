const { BookModel } = require("../models");
const {
  APIError,
  BadRequestError,
  STATUS_CODES,
} = require("../../utils/app-errors");

//Dealing with data base operations
class BookRepository {
  async CreateBook({ name, description, author, genres, cover }) {
    try {
      const book = new BookModel({
        name,
        description,
        author,
        genres,
        cover,
      });
      const bookResult = await book.save();
      return bookResult;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Book"
      );
    }
  }

  async GetBooks() {
    try {
      const books = await BookModel.find();
      return books;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Get Book"
      );
    }
  }

  async FindBook({ name }) {
    try {
      const existingBook = await BookModel.findOne({ name: name });
      return existingBook;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Book"
      );
    }
  }

  async FindBookById({ _id }) {
    try {
      const existingBook = await BookModel.findById(_id);
      return existingBook;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Book"
      );
    }
  }

  async UpdateBook({ _id, name, description, author, genres, cover }) {
    try {
      const book = await BookModel.findById(_id);
      console.log(
        "🚀 ~ file: book-repository.js:73 ~ BookRepository ~ UpdateBook ~ book:",
        book
      );

      if (book) {
        book.name = name;
        book.description = description;
        book.author = author;
        book.genres = genres;
        book.cover = cover;
        const bookResult = await book.save();
        return bookResult;
      }

      return {};
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Update Book"
      );
    }
  }

  async DeleteBook({ _id }) {
    try {
      const deleteBook = await BookModel.findOneAndDelete({ _id: _id });
      return deleteBook;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Delete Book"
      );
    }
  }
}

module.exports = BookRepository;
