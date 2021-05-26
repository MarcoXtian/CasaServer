const express = require("express");
const router = express.Router();

//const verify = require("../Controllers/Verifytoken.Controllers");

const SendRequestController = require("../Controllers/Sendrequest.Controller");

router.post("/sendrequest", SendRequestController.sendrequestService);
router.get("/getRequest", SendRequestController.getRequest);

module.exports = router;
