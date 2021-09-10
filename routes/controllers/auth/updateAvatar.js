const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { users: services } = require("../../../services");

const usersDir = path.join(process.cwd(), "public/avatars");

const updateAvatar = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const { path: tempName, originalname } = req.file;
    const [extention] = originalname.toLowerCase().split(".").reverse();

    if (extention !== "png" && extention !== "jpg" && extention !== "jpeg") {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Wrong file format",
      });
    }

    await Jimp.read(tempName)
      .then((img) => {
        return img.resize(250, 250).write(tempName);
      })
      .catch((err) => {
        throw err;
      });

    const newFileName = path.join(usersDir, `${userId}.${extention}`);
    await fs.rename(tempName, newFileName);
    const updatedUser = await services.updateUserData(userId, {
      avatarURL: newFileName,
    });

    if (!updatedUser) {
      return res.status(404).json({
        status: "success",
        code: 404,
        message: `Contact with ID = "${userId}" not found`,
      });
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        result: updatedUser,
      },
    });
  } catch (err) {
    await fs.unlink(tempName);
    next(error);
  }
};

module.exports = updateAvatar;
