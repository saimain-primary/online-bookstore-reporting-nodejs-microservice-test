const FeedbackService = require("../services/feedback-service");
const { PublishUserEvent } = require("../utils");
const AdminAuth = require("./middlewares/admin");
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const service = new FeedbackService();

  app.post("/", UserAuth, async (req, res, next) => {
    try {
      const user = req.user;
      const { title, body } = req.body;
      const { data } = await service.CreateFeedback({
        user,
        title,
        body,
      });

      const payload = await service.GetFeedbackPayload(
        user,
        data,
        "CREATE_FEEDBACK"
      );

      PublishUserEvent(payload);

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/:id", async (req, res, next) => {
    const feedbackId = req.params.id;
    try {
      const { data } = await service.FindFeedbackById(feedbackId);
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.delete("/:id", AdminAuth, async (req, res, next) => {
    const feedbackId = req.params.id;
    try {
      const { data } = await service.DeleteFeedback(feedbackId);
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/", async (req, res, next) => {
    try {
      const { data } = await service.GetFeedbacks();
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });
};
