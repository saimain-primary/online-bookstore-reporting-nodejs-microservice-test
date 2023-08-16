const { UserModel } = require("../models");
const {
  APIError,
  BadRequestError,
  STATUS_CODES,
} = require("../../utils/app-errors");

//Dealing with data base operations
class UserRepository {
  async CreateUser({ email, password, phone, salt, is_admin }) {
    try {
      const user = new UserModel({
        email,
        password,
        salt,
        phone,
        is_admin,
      });
      const userResult = await user.save();
      return userResult;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create User"
      );
    }
  }

  async FindUser({ email }) {
    try {
      const existingUser = await UserModel.findOne({ email: email });
      return existingUser;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find User"
      );
    }
  }

  async FindUserById({ id }) {
    try {
      const existingUser = await UserModel.findById(id);

      return existingUser;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find User"
      );
    }
  }

  async FindUsers() {
    try {
      const users = await UserModel.find();
      return users;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Get Users"
      );
    }
  }

  async UpdateUser(_id, userInputs) {
    try {
      const { email, phone, password, is_admin } = userInputs;
      const user = await UserModel.findById(_id);

      const doc = await UserModel.findOneAndUpdate(
        { _id: _id },
        {
          email: email ?? user.email,
          phone: phone ?? user.phone,
          password: password ?? user.password,
          is_admin: is_admin ?? user.is_admin,
        },
        {
          new: true,
        }
      );

      return doc;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Update User"
      );
    }
  }

  async DeleteUser({ _id }) {
    try {
      const user = await UserModel.findByIdAndDelete(_id);
      return user;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Delete User"
      );
    }
  }

  async AddFeedbackToUser({ user_id, feedback }) {
    try {
      const user = await UserModel.findById(user_id);
      if (user) {
        let userFeedback = user.feedback;
        let saveData = {
          title: feedback.title,
          body: feedback.body,
          createdAt: feedback.createdAt,
          updatedAt: feedback.updatedAt,
        };
        userFeedback.push(saveData);
        user.feedback = userFeedback;
      }

      const userResult = await user.save();

      return userResult.feedback;
    } catch (err) {
      console.log(
        "🚀 ~ file: user-repository.js:124 ~ UserRepository ~ AddFeedbackToUser ~ err:",
        err
      );
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Add Feedback"
      );
    }
  }
}

module.exports = UserRepository;
