const exampleRouter = require("./example.routes");
module.exports = (app) => {
  app.get("/", (req, res) => {
    res.status(200).send({
      message: "Backend for DCG Ai is Working",
    });
  });
  app.use("/example", exampleRouter);
};
