const { SaleModel } = require("../models");
const {
  APIError,
  BadRequestError,
  STATUS_CODES,
} = require("../../utils/app-errors");

//Dealing with data base operations
class SaleRepository {
  async CreateSale({ records, date, created_by }) {
    try {
      const sale = new SaleModel({
        date,
        records,
        created_by,
      });
      const saleResult = await sale.save();
      return saleResult;
    } catch (err) {
      console.log(
        "🚀 ~ file: sale-repository.js:20 ~ SaleRepository ~ CreateSale ~ err:",
        err
      );
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Sale"
      );
    }
  }

  async GetSales(query) {
    try {
      const sales = await SaleModel.find(query);
      return sales;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Get Sale"
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

  async FindSaleById({ _id }) {
    try {
      const sale = await SaleModel.findById(_id);
      return sale;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Sale"
      );
    }
  }

  async UpdateSale({ _id, date, records, created_by }) {
    try {
      const sale = await SaleModel.findById(_id);

      if (sale) {
        sale.date = date;
        sale.records = records;
        sale.created_by = created_by;
        const saleResult = await sale.save();
        return saleResult;
      }

      return {};
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Update Sale"
      );
    }
  }

  async DeleteSale({ _id }) {
    try {
      const sale = await SaleModel.findOneAndDelete({ _id: _id });
      return sale;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Delete Sale"
      );
    }
  }
}

module.exports = SaleRepository;
