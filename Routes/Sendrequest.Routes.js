const express = require("express");
const router = express.Router();

//const verify = require("../Controllers/Verifytoken.Controllers");

const SendRequestController = require("../Controllers/Sendrequest.Controller");

router.post("/sendrequest", SendRequestController.sendrequestService);

router.get("/getRequest", SendRequestController.getRequest);

router.get("/getRequest/:_id", SendRequestController.idgetRequest);

router.delete("/deleteRequest/:_id", SendRequestController.deleteRequest);

router.put("/updateRequest/:id", SendRequestController.updateRequest);

module.exports = router;
