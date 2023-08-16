const { FeedbackModel } = require("../models");
const {
  APIError,
  BadRequestError,
  STATUS_CODES,
} = require("../../utils/app-errors");

//Dealing with data base operations
class FeedbackRepository {
  async CreateFeedback({ user, title, body }) {
    try {
      const feedback = new FeedbackModel({
        user,
        title,
        body,
      });
      const feedbackResult = await feedback.save();
      return feedbackResult;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Feedback"
      );
    }
  }

  async GetFeedbacks() {
    try {
      const feedbacks = await FeedbackModel.find();
      return feedbacks;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Get Feedbacks"
      );
    }
  }

  async FindFeedbackById({ _id }) {
    try {
      const feedback = await FeedbackModel.findById(_id);
      return feedback;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Feedback"
      );
    }
  }

  async DeleteFeedback({ _id }) {
    try {
      const deleteFeedback = await FeedbackModel.findOneAndDelete({ _id: _id });
      return deleteFeedback;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Delete Feedback"
      );
    }
  }
}

module.exports = FeedbackRepository;
