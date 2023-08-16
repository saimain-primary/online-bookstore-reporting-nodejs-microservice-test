const BookService = require("../services/book-service");
const SaleService = require("../services/sale-service");
const AdminAuth = require("./middlewares/admin");

module.exports = (app) => {
  const service = new SaleService();

  app.post("/", AdminAuth, async (req, res, next) => {
    try {
      const user = req.user;
      const { date, records } = req.body;
      const { data } = await service.CreateSale({
        date,
        records,
        user,
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  // get sale details
  app.get("/:id", async (req, res, next) => {
    const saleId = req.params.id;
    try {
      const { data } = await service.FindSaleById(saleId);
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  // update sale details
  app.put("/:id", AdminAuth, async (req, res, next) => {
    const saleId = req.params.id;
    try {
      const user = req.user;
      const { date, records } = req.body;
      const { data } = await service.UpdateSale(saleId, {
        date,
        records,
        user,
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  // delete sale
  app.delete("/:id", AdminAuth, async (req, res, next) => {
    const saleId = req.params.id;
    try {
      const { data } = await service.DeleteSale(saleId);
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  // get all sale list
  app.get("/", async (req, res, next) => {
    try {
      const query = req.query;
      const { data } = await service.GetSales(query);
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });
};
