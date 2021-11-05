const Service = require("../Models/Services.Models");
const Joi = require("joi");

//addService
exports.addService = async (req, res) => {
  try {
    const find = await Service.find({ Servicename: req.body.Servicename });

    const validationSchema = Joi.object({
      Servicename: Joi.string().required(),
      Image: Joi.string().required(),
      Time: Joi.string().required(),
    });
    const { error } = validationSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if (find.length >= 1) {
      return res.status(403).send({ message: "Service is already existing" });
    } else {
      const service = new Service({
        Servicename: req.body.Servicename,
        Image: req.body.Image,
        Time: req.body.Time,
      });
      const saveservice = await service.save();
      return res.status(200).send(saveservice);
    }
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
//update service
exports.updateService = async (req, res) => {
  try {
    const find = await Service.find({ Servicename: req.body.Servicename });
    const validationSchema = Joi.object({
      Servicename: Joi.string().required(),
      Image: Joi.string().required(),
      Time: Joi.string().required(),
    });
    const { error } = validationSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    if (find.length >= 1) {
      return res.status(403).send({ message: "Service is already existing" });
    } else {const updateService = await Service.updateMany(
      { _id: req.params.Service_id },
      {
        Servicename: req.body.Servicename,
        Image: req.body.Image,
        Time: req.body.Time,
      }
    );
    return res
      .status(200)
      .json({ data: updateService, message: "Service Updated", status: 200 });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};
//deleteService
exports.deleteService = async (req, res) => {
  try {
    const removeService = await Service.deleteOne({ _id: req.params.Service_id });
    return res
      .status(200)
      .json({ data: removeService, message: "Service Removed", status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};

//get all service
exports.getService = async (req, res) => {
  try {
    const service = await Service.find();
    return res
      .status(200)
      .json({ data: service, message: "Get Service", status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};
