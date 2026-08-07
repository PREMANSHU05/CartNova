const User = require("../models/user");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = name || user.name;

    user.email = email || user.email;

    await user.save();

    res.status(200).json({
      success: true,

      message: "Profile updated successfully",

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};


const uploadProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,

        message: "User not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,

        message: "No image uploaded",
      });
    }

    user.profileImage = req.file.path;

    await user.save();

    res.status(200).json({
      success: true,

      message: "Profile image uploaded successfully",

      image: user.profileImage,
    });
  } catch (error) {
    console.log("PROFILE IMAGE ERROR:", error);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
module.exports = {
  getProfile,
  updateProfile,
  uploadProfileImage,
};
