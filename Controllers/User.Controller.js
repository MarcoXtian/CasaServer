const Users = require("../Models/User.Model");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register
exports.addUser = async (req, res) => {
  try {
    const find = await Users.find({ Email: req.body.Email });

    const validationSchema = Joi.object({
      FullName: Joi.string().min(4).required(),
      Gender: Joi.string().min(4).required(),
      Address: Joi.string().min(5).required(),
      Age: Joi.number().min(10).required(),
      ContactNumber: Joi.number().min(10).required(),
      Email: Joi.string().min(8).required().email(),
      Password: Joi.string()
        .required()
        .pattern(new RegExp("^([A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")),
    });

    const { error } = validationSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //salt and hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.Password, salt);

    //search if email is already in use
    if (find.length >= 1) {
      return res.status(403).send({ message: "Email is already existing" });
    } else {
      const user = new Users({
        FullName: req.body.FullName,
        Gender: req.body.Gender,
        Address: req.body.Address,
        Age: req.body.Age,
        ContactNumber: req.body.ContactNumber,
        Email: req.body.Email,
        Password: hashedPassword,
      });

      const saveUser = await user.save();
      return res.status(200).send(saveUser);
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
};
//login
exports.userLogin = async (req, res) => {
  try {
    const validation = Joi.object({
      Email: Joi.string().required().min(2),
      Password: Joi.string().required(),
    });

    // Request Validations
    const { error } = validation.validate(req.body);
    if (error)
      return res.status(400).send({
        message: error.details[0].message,
        statusCode: 400,
      });

    // Check if email exists
    const User = await Users.findOne({ Email: req.body.Email });
    if (!User)
      return res.status(404).send({
        message: `User not found`,
        statusCode: 404,
      });

    // Check if password valid
    const validPass = await bcrypt.compare(req.body.Password, User.Password);
    if (!validPass)
      return res.status(403).send({
        message: ` Incorrect Email or password`,
        statusCode: 403,
      });

    // Create and assign token
    const payload = {
      _id: User._id,
      username: User.username,
      role: User.role,
    };

    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).header("authToken", token).send({
      token: token,
      _id: User._id,
      logged_in: "Yes",
      message: `User verified`,
      statusCode: 200,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message, statusCode: 400 });
  }
};

//get user by id
exports.getUserInfo = async (req, res) => {
  try {
    const getInfo = await Users.findById(req.params._id);
    return res
      .status(200)
      .json({ message: "User Retrived", data: getInfo, statusCode: 200 });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message, statusCode: 400 });
  }
};
//get all user
exports.getUsers = async (req, res) => {
  try {
    const User = await Users.find();
    return res
      .status(200)
      .json({ data: User, message: "Get Users", status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};
//update user
exports.updateUser = async (req, res) => {
  try {
    const validationSchema = Joi.object({
      FullName: Joi.string().min(4).required(),
      Gender: Joi.string().min(4).required(),
      Address: Joi.string().min(5).required(),
      Age: Joi.number().min(10).required(),
      Password: Joi.string()
        .required()
        .pattern(new RegExp("^([A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")),
    });
    const { error } = validationSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.Password, salt);
    const updateUser = await Users.updateMany
      { _id: req.params.User_id },
      {
        FullName: req.body.FullName,
        Gender: req.body.Gender,
        Address: req.body.Address,
        Age: req.body.Age,
        Password: hashedPassword,
      }
    );
    return res
      .status(200)
      .json({ data: updateUser, message: "User Updated", status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};

