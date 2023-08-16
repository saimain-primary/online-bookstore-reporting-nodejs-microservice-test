const BookService = require("../services/book-service");
const AdminAuth = require("./middlewares/admin");

module.exports = (app) => {
  const service = new BookService();

  app.post("/", AdminAuth, async (req, res, next) => {
    try {
      const { name, description, author, cover, genres } = req.body;
      const { data } = await service.CreateBook({
        name,
        description,
        author,
        cover,
        genres,
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  // get book details
  app.get("/:id", async (req, res, next) => {
    const bookId = req.params.id;
    try {
      const { data } = await service.FindBookById(bookId);
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  // update book details
  app.put("/:id", AdminAuth, async (req, res, next) => {
    const bookId = req.params.id;
    try {
      const { name, description, author, cover, genres } = req.body;
      const { data } = await service.UpdateBook(bookId, {
        name,
        description,
        author,
        cover,
        genres,
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  // get book details
  app.delete("/:id", AdminAuth, async (req, res, next) => {
    const bookId = req.params.id;
    try {
      const { data } = await service.DeleteBook(bookId);
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  // get all book list
  app.get("/", async (req, res, next) => {
    try {
      const { data } = await service.GetBooks();
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });
};
