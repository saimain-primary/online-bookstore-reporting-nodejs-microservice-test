const { UserRepository } = require("../database");
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
class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  async SignIn(userInputs) {
    const { email, password } = userInputs;

    try {
      const existingUser = await this.repository.FindUser({ email });
      if (existingUser) {
        const validPassword = await ValidatePassword(
          password,
          existingUser.password,
          existingUser.salt
        );

        if (validPassword) {
          const token = await GenerateSignature({
            email: existingUser.email,
            _id: existingUser._id,
            is_admin: existingUser.is_admin,
          });
          return FormateData({ id: existingUser._id, token });
        }
      }

      return FormateData(null);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async SignUp(userInputs) {
    const { email, password, phone } = userInputs;

    try {
      // create salt
      let salt = await GenerateSalt();

      let userPassword = await GeneratePassword(password, salt);

      const existingUser = await this.repository.FindUser({ email: email });
      let user;
      if (existingUser) {
        user = existingUser;
      } else {
        user = await this.repository.CreateUser({
          email,
          password: userPassword,
          phone,
          salt,
        });
      }

      const token = await GenerateSignature({
        email: email,
        _id: user._id,
        is_admin: user.is_admin,
      });

      return FormateData({ id: user._id, token });
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async SignUpAdmin(userInputs) {
    const { email, password, phone } = userInputs;

    try {
      // create salt
      let salt = await GenerateSalt();

      let userPassword = await GeneratePassword(password, salt);

      const existingUser = await this.repository.FindUser({ email: email });
      let user;
      if (existingUser) {
        user = existingUser;
      } else {
        user = await this.repository.CreateUser({
          email,
          password: userPassword,
          phone,
          salt,
          is_admin: true,
        });
      }

      const token = await GenerateSignature({
        email: email,
        _id: user._id,
        is_admin: user.is_admin,
      });

      return FormateData({ id: user._id, token });
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async GetProfile(id) {
    try {
      const existingUser = await this.repository.FindUserById({ id });
      return FormateData(existingUser);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async UpdateUser(id, userInputs) {
    const { email, password, phone, is_admin } = userInputs;

    try {
      const findUser = await this.repository.FindUserById({ id: id });
      let user;
      if (findUser) {
        user = await this.repository.UpdateUser(id, {
          email,
          password,
          phone,
          is_admin,
        });
      }

      return FormateData(user);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async GetUserList() {
    try {
      const users = await this.repository.FindUsers();
      return FormateData(users);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async DeleteUser(_id) {
    try {
      const users = await this.repository.DeleteUser({ _id: _id });
      return FormateData(users);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async AddFeedbackToUser(user_id, feedback) {
    try {
      const feedbackResult = await this.repository.AddFeedbackToUser({
        user_id,
        feedback,
      });
      return FormateData(feedbackResult);
    } catch (err) {
      console.log(
        "🚀 ~ file: user-service.js:176 ~ UserService ~ AddFeedbackToUser ~ err:",
        err
      );
      throw new APIError("Could not add feedback", err);
    }
  }

  async SubscribeEvents(payload) {
    const { event, data } = payload.data;

    const { user, feedback } = data;
    switch (event) {
      case "CREATE_FEEDBACK":
        await this.AddFeedbackToUser(user._id, feedback);
        break;
      default:
        break;
    }
  }
}

module.exports = UserService;
