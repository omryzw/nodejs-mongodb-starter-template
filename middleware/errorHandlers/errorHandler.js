/**
 * Custom error handler to standardize error objects returned to
 * the client
 *
 * @param err Error caught by Express.js
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 * @param next NextFunction function provided by Express
 */

const CustomError = require("../../models/CustomError");

module.exports = (err, req, res, next) => {
  let customError = err;
  if (!(err instanceof CustomError)) {
    let errorMessage = "";
    if (err.response && err.response.data) {
      errorMessage = err.response.data;
    } else if (err.message) {
      errorMessage = err.message;
    }
    customError = new CustomError(
      err.status || (err.response && err.response.status),
      errorMessage || "Some error happened",
    );
  }
  res.status(customError.status).send(customError);
};
