const bcrypt = require("bcrypt");
const { User } = require("../db");

//Temp function to load data
const { Establishment, Site, Court } = require("../db");
const usersData = require("../TempData/usersData.json");
const establishmentsData = require("../TempData/establishmentsData.json");
const sitesData = require("../TempData/sitesData.json");
const courtsData = require("../TempData/courtsData.json");
// const { use } = require("../routes/routerUser");

const loadDataToDB = () => {
  usersData.map(async (user) => {
    // console.log(user.name)
    const passwordHash = await bcrypt.hash("password123", 10);
    User.findOrCreate({
      where: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        passwordHash,
        phone: user.phone,
        img: user.img,
        hasEstablishment: user.hasEstablishment,
        isAdmin: user.isAdmin,
      },
    });
  });

  establishmentsData.map(async (est) => {
    await Establishment.findOrCreate({
      where: {
        id: String(est.id),
        name: est.name,
        logoImage: est.logoImage,
        timeActiveFrom: est.timeActiveFrom,
        timeActiveTo: est.timeActiveTo,
        responsableId: String(est.responsableId),
      },
    });
  });

  sitesData.map(async (site) => {
    await Site.findOrCreate({
      where: {
        name: site.name,
        country: site.country,
        city: site.city,
        street: site.street,
        streetNumber: site.streetNumber,
        latitude: site.latitude,
        longitude: site.longitude,
        // establishmentId: site.establishmentId
      },
    });
  });

  courtsData.map(async (court) => {
    // console.log(court)
    await Court.findOrCreate({
      where: {
        name: court.name,
        description: court.description,
        shiftLength: court.shiftLength,
        price: court.price,
        image: [court.image],
        sport: court.sport,
        // siteId: court.siteId
      },
    });
  });
};

// loadDataToDB();

// End temp function to load data

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
    // ver esta porqueria que funcione con el idea que me manda el front y el que pido
    console.log(req);

    const {id} = req.user.id
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
    const user  = req.user;
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
   
    const id  = req.user.id;
    const { name, lastname, img, phone } = req.body;
    const changedUser = await User.findOne({ where: { id } });
    if (!changedUser) {
      throw new Error("User not fund");
    }
    name && (changedUser.name = name);
    lastname && (changedUser.lastname = lastname);
    img && (changedUser.img = img);
    phone && (changedUser.phone = phone);

    await changedUser.save();
    console.log(changedUser.name)

    res.status(200).json({changedUser});
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllUsers,
  getUserProfile,
  registerUser,
  editUser,
  registerGoogle,
};
