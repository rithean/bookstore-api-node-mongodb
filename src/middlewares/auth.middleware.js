const { verifyAccessToken } = require("../utils/jwt");
const { errorResponse } = require("../utils/response");

const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return errorResponse(res, 401, "Unauthorized");
  } else {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = verifyAccessToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      return errorResponse(res, 401, "Unauthorized");
    }
  }
};

const authorize = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return errorResponse(res, 403, "Forbidden");
    } else {
      next();
    }
  };
};

module.exports = { authenticate, authorize };
