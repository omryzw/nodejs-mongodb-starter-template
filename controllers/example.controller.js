const { StatusCodes } = require("http-status-codes");
const ExampleModel = require("../models/example.model");

exports.exampleFunction = async (req, res, next) => {
  try {
    const newExampleItem = new ExampleModel(req.body);
    const result = await newExampleItem.save();
    //! of coz we need some validation before saving anything
    const response = { message: "Example Response", result: result };
    return res.status(StatusCodes.OK).send(response);
  } catch (error) {
    next(error);
  }
};
