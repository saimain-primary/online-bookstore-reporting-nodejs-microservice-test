const { ValidateAdminSignature } = require("../../utils");

module.exports = async (req, res, next) => {
  const isAuthorized = await ValidateAdminSignature(req);

  if (isAuthorized) {
    return next();
  }
  return res.status(403).json({
    message:
      "Not Authorized , This is only for admin user please update is_admin value",
  });
};
