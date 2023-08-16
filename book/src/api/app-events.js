const BookService = require("../services/book-service");

module.exports = (app) => {
  const service = new BookService();

  app.use("/app-events", (req, res, next) => {
    const { payload } = req.body;

    service.SubscribeEvents(payload);

    console.log("Book Service Received Event");
    return res.status(200).json(payload);
  });
};
