const successResponse = (res, statusCode = 200, dataOrMessage, data = null) => {
  let response = {
    status: true,
  };

  if (typeof dataOrMessage === "string") {
    response.message = dataOrMessage;
    if (data !== undefined) {
      response.data = data;
    }
  } else {
    response.data = dataOrMessage;
  }

  return res.status(statusCode).json(response);
};

const errorResponse = (res, statusCode = 500, message, error = null) => {
  let response = {
    status: false,
  };

  if (message) response.message = message;
  if (error !== undefined) response.data = error;

  return res.status(statusCode).json(response);
};

module.exports = { successResponse, errorResponse };
