const { verifyAccessToken } = require("../utils/jwt");
const { errorResponse } = require("../utils/response");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return errorResponse(res, 401, "Unauthorized - No token provided");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = await verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return errorResponse(
      res,
      401,
      error.message || "Unauthorized - Invalid token"
    );
  }
};

const authorize = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return errorResponse(res, 403, "Forbidden - Access denied");
    }
    next();
  };
};

module.exports = { authenticate, authorize };
