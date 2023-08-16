const { SaleRepository } = require("../database");
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
class SaleService {
  constructor() {
    this.repository = new SaleRepository();
  }

  async CreateSale({ date, records, user }) {
    try {
      const newSale = await this.repository.CreateSale({
        date,
        records,
        user,
      });

      return FormateData(newSale);
    } catch (err) {
      throw new APIError("Could not create sale", err);
    }
  }

  async GetSales(query) {
    try {
      const sales = await this.repository.GetSales(query);
      return FormateData(sales);
    } catch (err) {
      throw new APIError("Could not get sale", err);
    }
  }

  async FindSaleById(_id) {
    try {
      const book = await this.repository.FindSaleById({ _id: _id });
      return FormateData(book);
    } catch (err) {
      throw new APIError("Could not find sale", err);
    }
  }

  async UpdateSale(_id, { date, records, user }) {
    try {
      const sale = await this.repository.UpdateSale({
        _id,
        date,
        records,
        user,
      });
      return FormateData(sale);
    } catch (err) {
      throw new APIError("Could not update sale", err);
    }
  }

  async DeleteSale(_id) {
    try {
      const sale = await this.repository.DeleteSale({ _id: _id });
      return FormateData(sale);
    } catch (err) {
      throw new APIError("Could not find sale", err);
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

module.exports = SaleService;
