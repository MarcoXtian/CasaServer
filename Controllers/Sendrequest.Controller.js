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

