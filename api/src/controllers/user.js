const { User, Booking, Court, Site, Establishment } = require("../db");
const bcrypt = require("bcrypt");

// starting to code
const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.findAll();
    if (!allUsers.length) {
      throw new Error("No users available");
    }
    res.send(allUsers);
  } catch (e) {
    next(e);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const id = req.user.id;
    const wantedUser = await User.findOne({
      where: { id },
      attributes: { exclude: ["passwordHash"] },
    });

    res.send(wantedUser);
  } catch (e) {
    next(e);
  }
};

const registerGoogle = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json(user.id);
  } catch (e) {
    next(e);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { name, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    if (user) {
      throw new Error("Email previously registered");
    }
    const newUser = await User.create({
      name,
      lastName,
      email,
      passwordHash,
    });
    res.json(newUser);
  } catch (error) {
    next(error);
  }
};

const editUser = async (req, res, next) => {
  try {
    const id = req.user.id;
    const { name, lastName, img, phone } = req.body;
    const changedUser = await User.findOne({ where: { id } });
    if (!changedUser) {
      throw new Error("User not fund");
    }
    name && (changedUser.name = name);
    lastName && (changedUser.lastName = lastName);
    img && (changedUser.img = img);
    phone && (changedUser.phone = phone);

    await changedUser.save();
    console.log(changedUser.name);

    res.status(200).json({ changedUser });
  } catch (e) {
    next(e);
  }
};
const getUserBookingHistory = async (req, res, next) => {
  try {
    console.log("entre", req.user.id);
    const userHistory = await Booking.findAll({
      where: {
        userId: req.user.id,
      },
      attributes: {
        exclude: [
          "payment_status",
          "merchant_order_id",
          "external_reference",
          "createdAt",
          "updatedAt",
          "userId",
        ],
      },
      include: [
        {
          model: Court,
          as: "court",
          attributes: ["name", "sport", "image"],
          include: {
            model: Site,
            as: "site",
            attributes: ["name", "street", "streetNumber"],
            include: {
              model: Establishment,
              as: "establishment",
              attributes: ["name"],
            },
          },
        },
      ],
      order: ["startTime", "DESC"]
    });

    res.send(userHistory);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserProfile,
  registerUser,
  editUser,
  registerGoogle,
  getUserBookingHistory,
};
