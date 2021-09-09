const { v4: uuidv4 } = require("uuid");
const { users: services } = require("../../../services");
const mailSender = require("../../../utils");

const signup = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await services.getOne({ email });
    if (user) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Email in use",
      });
    }
    const verifyToken = uuidv4();
    const newUser = { ...req.body, verifyToken };
    const createdUser = await services.add(newUser);
    const { URL } = process.env;
    const mail = {
      to: newUser.email,
      subject: "Email verification",
      html: `<a href="${URL}/verify/${verifyToken}" trget="_blank">Confirm your email</a>`,
    };
    await mailSender(mail);

    res.status(201).json({
      status: "success",
      code: 201,
      data: { user: createdUser },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = signup;
