const { BookRepository } = require("../database");
const {
  FormateData,
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
  ValidatePassword,
} = require("../utils");

const {
  APIError,
  BadRequestError,
  ValidationError,
  STATUS_CODES,
} = require("../utils/app-errors");

// All Business logic will be here
class BookService {
  constructor() {
    this.repository = new BookRepository();
  }

  async CreateBook(userInputs) {
    const { name, description, author, cover, genres } = userInputs;

    try {
      const newBook = await this.repository.CreateBook({
        name,
        description,
        author,
        cover,
        genres,
      });

      return FormateData(newBook);
    } catch (err) {
      throw new APIError("Could not create book", err);
    }
  }

  async GetBooks() {
    try {
      const books = await this.repository.GetBooks();
      return FormateData(books);
    } catch (err) {
      throw new APIError("Could not get book", err);
    }
  }

  async FindBookById(_id) {
    try {
      const book = await this.repository.FindBookById({ _id: _id });
      return FormateData(book);
    } catch (err) {
      throw new APIError("Could not find book", err);
    }
  }

  async UpdateBook(_id, userInputs) {
    try {
      const { name, description, author, cover, genres } = userInputs;
      const book = await this.repository.UpdateBook({
        _id,
        name,
        description,
        author,
        cover,
        genres,
      });
      return FormateData(book);
    } catch (err) {
      throw new APIError("Could not update book", err);
    }
  }

  async DeleteBook(_id) {
    try {
      const book = await this.repository.DeleteBook({ _id: _id });
      return FormateData(book);
    } catch (err) {
      throw new APIError("Could not find book", err);
    }
  }

  async SubscribeEvents(payload) {
    const { event, data } = payload;

    console.log("PAYLOAD : ", payload);

    switch (event) {
      case "TEST":
        console.log("TEST EVENT FROM BOOK");
        break;
      default:
        break;
    }
  }
}

module.exports = BookService;
