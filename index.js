console.log("Heating Up  Backend 🤖 Server 🔥🔥🔥");
require("dotenv").config();
const { dbConnect } = require("./configs/db.config");
const compression = require("compression");
const express = require("express");
const app = express();
const logger = require("morgan");
const http = require("http");
let server = http.createServer(app);
const handleError = require("./middleware/errorHandlers/errorHandler");
app.use(compression());
app.use(
  express.json({
    extended: false,
    limit: "50mb",
  }),
);
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: false,
    parameterLimit: 50000,
  }),
);
dbConnect();
// Add headers
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(function (req, res, next) {
  const send = res.send;
  res.send = function (body) {
    const contentType = res.get("Content-Type") || "";
    if (contentType.toLowerCase().includes("application/json")) {
      const jsonBody = JSON.parse(body);
      jsonBody.status = res.statusCode;
      body = JSON.stringify(jsonBody);
    }
    send.call(this, body);
  };
  next();
});

app.use(logger("dev"));

require("./routes/index.routes")(app);
app.use(handleError);

server.listen(process.env.PORT || 3000, () => {
  console.log("Backend 🤖 Server Started Successfully ✅ ");
});
