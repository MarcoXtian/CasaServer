const RequestService = require("../Models/Sendrequest.Model");
const Joi = require("joi");

//send Request
exports.sendrequestService = async (req, res) => {
  try {
    const find = await RequestService.find({ RequestService: req.body.RequestService });
    const validationSchema = Joi.object({
        FullName: Joi.string().required(),
        Gender: Joi.string().required(),
        Age: Joi.number().required(),
        CarMilage:Joi.string().required(),
        ContactNumber:Joi.number().min(10).required(),
        Services: Joi.string().required(),
        CarandModel:Joi.string().required(),
        Day:Joi.string().required(),
        Time:Joi.string().required(),
    });
    const { error } = validationSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    if (find.length >= 1) {
      return res.status(403).send({ message: "You already requested" });
    } else {
      const sendrequestService = new RequestService({
        FullName: req.body.FullName,
        Gender: req.body.Gender,
        Age: req.body.Age,
        CarMilage: req.body.CarMilage,
        ContactNumber: req.body.ContactNumber,
        Services: req.body.Services,
        CarandModel: req.body.CarandModel,
        Day: req.body.Day,
        Time:req.body.Time,

      });
      const savesendrequestService = await sendrequestService.save();
      return res.status(200).send(savesendrequestService);
    }
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
//get all request
exports.getRequest = async (req, res) => {
  try {
    const savesendrequestService = await RequestService.find();
    return res
      .status(200)
      .json({ data: savesendrequestService, message: "Get All Request", status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};
//get request by id
exports.idgetRequest = async (req, res) => {
  try {
    const getidRequest = await RequestService.findById(req.params._id);
    return res
      .status(200)
      .json({ message: "Request Retrived", data: getidRequest, statusCode: 200 });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message, statusCode: 400 });
  }
};

//deleterequest
exports.deleteRequest = async (req, res) => {
  try {
    const removeRequest = await RequestService.deleteOne({ _id: req.params.RequestService_id });
    return res
      .status(200)
      .json({ data: removeRequest, message: "Request Removed", status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};
//update request
exports.updateRequest = async (req, res) => {
  try {
    const find = await RequestService.find({ RequestService: req.body.RequestService });
    const validationSchema = Joi.object({
        FullName: Joi.string().required(),
        Gender: Joi.string().required(),
        Age: Joi.number().required(),
        CarMilage:Joi.string().required(),
        ContactNumber:Joi.number().min(10).required(),
        Services: Joi.string().required(),
        CarandModel:Joi.string().required(),
        Day:Joi.string().required(),
        Time:Joi.string().required(),
    });
    const { error } = validationSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    if (find.length >= 1) {
      return res.status(403).send({ message: "Alredy Accepted" });
    } else {const updateRequest = await RequestService.updateMany(
      { _id: req.params.RequestService_id },
      {
        FullName: req.body.FullName,
        Gender: req.body.Gender,
        Age: req.body.Age,
        CarMilage: req.body.CarMilage,
        ContactNumber: req.body.ContactNumber,
        Services: req.body.Services,
        CarandModel: req.body.CarandModel,
        Day: req.body.Day,
        Time:req.body.Time,
      }
    );
    return res
      .status(200)
      .json({ data: updateRequest, message: "Request Accepted", status: 200 });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};