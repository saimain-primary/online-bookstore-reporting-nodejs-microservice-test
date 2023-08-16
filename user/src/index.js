const { PORT } = require("./config");
const createServer = require("./server");
const { databaseConnection } = require("./database");

const StartServer = async () => {
  const app = createServer();
  await databaseConnection();

  app
    .listen(PORT, () => {
      console.log(`listening to port ${PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    });
};

StartServer();
