const User = require("../model/userModel");
const httpStatusCode = require("../utils/httpStatusCode");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const logger = require("../utils/logger");
const sendEmail = require("../utils/sendEmail");
const EmailVerification = require("../model/verificationModel");
const { registerValidation, loginValidation } = require("../validation/authValidation");

class authController {
  async register(req, res) {
    try {
      const { error,value } = registerValidation.validate(req.body);

      if (error) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: error.details[0].message,
        });
      }

      const { name, email, password } = value;

      const existUser = await User.findOne({
        where: { email },
      });

      if (existUser) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "User already exists",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      await sendEmail(user);
      logger.info(`User registered successfully: ${user.email}`);

      return res.status(httpStatusCode.CREATED).json({
        success: true,
        message: "User registered successfully",
        user,
      });
    } catch (error) {
      logger.error(`Error registering user: ${error.message}`);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Failed to register user",
      });
    }
  }
  async login(req, res) {
    try {
      const { error,value } = loginValidation.validate(req.body);

      if (error) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: error.details[0].message,
        });
      }

      const { email, password } = value;

      const checkUser = await User.findOne({ where: { email: email } });
      if (!checkUser) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const checkPassword = await bcrypt.compare(password, checkUser.password);

      if (!checkPassword) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Invalid email or password",
        });
      }
      if (!checkUser.isVerified) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "User not verified",
        });
      }
      const accessToken = jwt.sign(
        {
          id: checkUser.id,
          name: checkUser.name,
          email: checkUser.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
      );
      const refreshToken = jwt.sign(
        {
          id: checkUser.id,
          name: checkUser.name,
          email: checkUser.email,
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" },
      );
      checkUser.refreshToken = refreshToken;
      await checkUser.save();
      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "User Loggedin Successfully",
        data: {
          id: checkUser.id,
          name: checkUser.name,
          email: checkUser.email,
        },
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } catch (error) {
      logger.error(`Login failed: ${error.message}`);
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async refreshToken(req, res) {
    try {
      const refreshToken = req.headers["refresh-token"];
      if (!refreshToken) {
        return res.status(httpStatusCode.UNAUTHORIZED).json({
          success: false,
          message: "Refresh token missing",
        });
      }
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res.status(httpStatusCode.UNAUTHORIZED).json({
          success: false,
          message: "User not found",
        });
      }
      if (user.refreshToken !== refreshToken) {
        return res.status(httpStatusCode.UNAUTHORIZED).json({
          success: false,
          message: "Invalid refresh token",
        });
      }
      const newAccessToken = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "5m",
        },
      );
      return res.status(httpStatusCode.OK).json({
        success: true,
        data: {
          name: user.name,
          email: user.email,
          newAccessToken: newAccessToken,
        },
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async verify(req, res) {
    try {
      const { token } = req.params;

      if (!token) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Invalid verification link",
        });
      }

      const emailVerification = await EmailVerification.findOne({
        where: {
          token,
        },
      });

      if (!emailVerification) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Invalid verification link",
        });
      }

      const existingUser = await User.findByPk(emailVerification.userId);

      if (!existingUser) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "User not found",
        });
      }

      if (existingUser.isVerified) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Email already verified",
        });
      }

      const currentTime = new Date();

      const expirationTime = new Date(
        emailVerification.createdAt.getTime() + 15 * 60 * 1000,
      );

      if (currentTime > expirationTime) {
        await sendEmail(existingUser);

        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message:
            "Verification link expired. A new verification email has been sent.",
        });
      }

      existingUser.isVerified = true;

      await existingUser.save();

      await EmailVerification.destroy({
        where: {
          userId: existingUser.id,
        },
      });

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Email verified successfully",
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async profile(req, res) {
    try {
      const userId = req.user.id;
      const profile = await User.findByPk(userId, {
        attributes: {
          exclude: ["password", "refreshToken"],
        },
      });
      return res.status(httpStatusCode.OK).json({
        message: "User Fetched successfully",
        profile: profile,
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new authController();
