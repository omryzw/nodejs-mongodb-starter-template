const router = require("express").Router();
const controller = require("../controllers/example.controller");

router.post("/", controller.exampleFunction);

module.exports = router;
