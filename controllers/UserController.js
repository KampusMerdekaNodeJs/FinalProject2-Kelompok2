const { User } = require("../models");
const { comparePassword } = require("../hellpers/bcrypt");
const { generateToken } = require("../hellpers/jwt");

class UserController {
  static register(req, res) {
    const {
      email,
      password,
      username,
      full_name,
      age,
      phone_number,
      profile_image_url,
    } = req.body;
    User.create({
      email,
      password,
      username,
      full_name,
      age,
      phone_number,
      profile_image_url,
    })
      .then((result) => {
        let response = {
          id: result.id,
          username: result.username,
          email: result.email,
          full_name: result.full_name,
          age: result.age,
          phone_number: result.phone_number,
          profile_image_url: result.profile_image_url,
        };
        res.status(201).json(response);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
  static login(req, res) {
    const { email, password } = req.body;
    User.findOne({
      where: {
        email,
      },
    })
      .then((user) => {
        if (!user) {
          throw {
            name: "User Login Error",
            devMessage: `User with email ${email} not found`,
          };
        }
        const isCorrect = comparePassword(password, user.password);
        if (!isCorrect) {
          throw {
            name: "User Login Error",
            devMessage: `User's Password with email ${email} does not match`,
          };
        }
        let payload = {
          id: user.id,
          username: user.username,
          email: user.email,
        };
        const token = generateToken(payload);

        return res.status(200).json({ token });
      })
      .catch((err) => {
        res.status(500).json(err);
        console.log(err);
      });
  }
  static async updateUser(req, res) {
    const userId = req.params.id;
    const { email, username, full_name, age, phone_number, profile_image_url } =
      req.body;

    try {
      const user = await User.findOne({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update user data
      user.email = email;
      user.username = username;
      user.full_name = full_name;
      user.age = age;
      user.phone_number = phone_number;
      user.profile_image_url = profile_image_url;

      await user.save();

      res.status(200).json({ message: "User updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async deleteUser(req, res) {
    const { id } = req.params;

    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await user.destroy();
      //status 204 user deleted
      return res.status(204).send();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "User deleted successfully" });
    }
  }
}

module.exports = UserController;
