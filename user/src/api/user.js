const UserService = require("../services/user-service");
const UserAuth = require("./middlewares/auth");
const AdminAuth = require("./middlewares/admin");

module.exports = (app) => {
  const service = new UserService();

  app.get("/", AdminAuth, async (req, res, next) => {
    try {
      const { data } = await service.GetUserList();
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.put("/:id", AdminAuth, async (req, res, next) => {
    try {
      const userId = req.params.id;
      const { email, password, phone, is_admin } = req.body;

      const { data } = await service.UpdateUser(userId, {
        email,
        password,
        phone,
        is_admin,
      });

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.delete("/:id", AdminAuth, async (req, res, next) => {
    try {
      const userId = req.params.id;
      const { data } = await service.DeleteUser(userId);
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.post("/admin", async (req, res, next) => {
    try {
      const { email, password, phone } = req.body;
      const { data } = await service.SignUpAdmin({ email, password, phone });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.post("/signup", async (req, res, next) => {
    try {
      const { email, password, phone } = req.body;
      const { data } = await service.SignUp({ email, password, phone });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.post("/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const { data } = await service.SignIn({ email, password });

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/profile", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { data } = await service.GetProfile({ _id });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.post("/feedback", async (req, res, next) => {
    try {
      const { email, password, phone } = req.body;
      const { data } = await service.SignUp({ email, password, phone });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });
};
