const { FeedbackRepository } = require("../database");
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
class FeedbackService {
  constructor() {
    this.repository = new FeedbackRepository();
  }

  async CreateFeedback({ user, title, body }) {
    try {
      const feedback = await this.repository.CreateFeedback({
        user,
        title,
        body,
      });

      return FormateData(feedback);
    } catch (err) {
      throw new APIError("Could not create feedback", err);
    }
  }

  async GetFeedbacks() {
    try {
      const feedbacks = await this.repository.GetFeedbacks();
      return FormateData(feedbacks);
    } catch (err) {
      throw new APIError("Could not get feedbacks", err);
    }
  }

  async FindFeedbackById(_id) {
    try {
      const feedback = await this.repository.FindFeedbackById({ _id: _id });
      return FormateData(feedback);
    } catch (err) {
      throw new APIError("Could not find feedback", err);
    }
  }

  async DeleteFeedback(_id) {
    try {
      const feedback = await this.repository.DeleteFeedback({ _id: _id });
      return FormateData(feedback);
    } catch (err) {
      throw new APIError("Could not find feedback", err);
    }
  }

  async GetFeedbackPayload(user, data, event) {
    if (data) {
      const payload = {
        event: event,
        data: { user, feedback: data },
      };

      return FormateData(payload);
    } else {
      return FormateData({ error: "No feedback is available" });
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

module.exports = FeedbackService;
