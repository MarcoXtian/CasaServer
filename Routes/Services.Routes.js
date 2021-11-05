const express = require("express");
const router = express.Router();

const ServiceController = require("../Controllers/Services.Controllers");

router.post("/addservice", ServiceController.addService);

router.get("/services", ServiceController.getService);

router.put("/service/update/:Service_id", ServiceController.updateService);

router.delete("/service/delete/:Service_id", ServiceController.deleteService);


module.exports = router;
