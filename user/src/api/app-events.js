const UserService = require("../services/user-service");

module.exports = (app) => {
  const service = new UserService();

  app.use("/app-events", (req, res, next) => {
    const { payload } = req.body;

    service.SubscribeEvents(payload);

    console.log("User Service Received Event");
    return res.status(200).json(payload);
  });
};
