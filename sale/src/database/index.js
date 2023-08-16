// database related modules
module.exports = {
  databaseConnection: require("./connection"),
  BookRepository: require("./repository/book-repository"),
  SaleRepository: require("./repository/sale-repository"),
};
