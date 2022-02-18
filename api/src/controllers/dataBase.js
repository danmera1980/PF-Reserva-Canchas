const bcrypt = require("bcrypt");

//Temp function to load data
const { User, Establishment, Site, Court, Booking } = require("../db");
const dataBase = require("../TempData/dataBase.json");
const { randomString } = require("./utils/utils");

const loadUsers = async function () {
  try {
    const passwordHash = await bcrypt.hash("grupo7", 10);
    const allUsers = dataBase.user;
    console.log("carga users");
    for (let i = 0; i < allUsers.length; i++) {
      const newUser = await User.create({
        name: allUsers[i].name,
        lastName: allUsers[i].lastName,
        email: allUsers[i].email,
        passwordHash: passwordHash,
        phone: allUsers[i].phone,
        isAdmin: allUsers[i].isAdmin,
      });
    }
    console.log("users loaded");
  } catch (error) {
    console.log(error);
  }
};

const loadEstablishments = async function () {
  try {
    const allUsers = await User.findAll();
    const allEstablishments = dataBase.establishment;
    for (let i = 0; i < allEstablishments.length; i++) {
      const newEstablishment = await Establishment.create({
        cuit: allEstablishments[i].cuit,
        name: allEstablishments[i].name,
        timeActiveFrom: allEstablishments[i].timeActiveFrom,
        timeActiveTo: allEstablishments[i].timeActiveTo,
      });

      await newEstablishment.addUser(allUsers[i]);
      await User.update(
        { hasEstablishment: true },
        { where: { id: allUsers[i].id } }
      );
    }
    console.log("est loaded");
  } catch (error) {
    console.log(error);
  }
};

const loadSites = async function () {
  try {
    console.log("carga sites");

    const allEstablishments = dataBase.establishment;
    const allSites = dataBase.site;
    for (let i = 0; i < allEstablishments.length; i++) {
      let establishmentDB = await Establishment.findOne({
        where: { cuit: allEstablishments[i].cuit },
      });
      const newSite = await Site.create({
        name: allSites[i].name,
        city: allSites[i].city,
        street: allSites[i].street,
        streetNumber: allSites[i].streetNumber,
        latitude: allSites[i].latitude,
        longitude: allSites[i].longitude,
      });
      establishmentDB.addSite(newSite);
    }
    for (let i = 0; i < allSites.length - allEstablishments.length; i++) {
      let establishmentDB = await Establishment.findOne({
        where: { cuit: allEstablishments[i].cuit },
      });
      const newSite = await Site.create({
        name: allSites[i].name,
        city: allSites[i].city,
        street: allSites[i].street,
        streetNumber: allSites[i].streetNumber,
        latitude: allSites[i].latitude,
        longitude: allSites[i].longitude,
      });
      establishmentDB.addSite(newSite);
    }

    console.log("sites loaded");
  } catch (error) {
    console.log(error);
  }
};

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const loadCourts = async function () {
  try {
    console.log("carga canchas");

    const allSites = await Site.findAll();
    const allCourts = dataBase.court;

    for (let i = 0; i < allSites.length; i++) {
      for (let j = 0; j < getRandomArbitrary(1, 9); j++) {
        const siteDb = await Site.findOne({
          where: { id: allSites[i].id },
        });
        let newCourt = await Court.create({
          name: allCourts[j].name,
          description: allCourts[j].description,
          shiftLength: allCourts[j].shiftLength,
          price: allCourts[j].price,
          sport: allCourts[j].sport,
        });
        await siteDb.addCourt(newCourt);
      }
    }
    console.log("Courts loaded");
  } catch (error) {
    console.log(error);
  }
};
const loadBookings = async () => {
  const allBookings = dataBase.booking;
  try {
    const bookings = await Promise.all(allBookings.map( async (book) => {
      let startTime1 = new Date(
        book.startTime[0],
        book.startTime[1] - 1,
        book.startTime[2],
        book.startTime[3],
        00,
        0
      );
      let endTime1 = new Date(
        book.endTime[0],
        book.endTime[1] - 1,
        book.endTime[2],
        book.endTime[3],
        0,
        0
      );
      await Booking.create({
        courtId: book.courtId,
        userId: book.userId,
        status: book.status,
        finalAmount: book.finalAmount,
        startTime: startTime1,
        endTime: endTime1,
        external_reference: randomString(8),
      })

    }));

  } catch (error) {
    console.log(error);
  }
};
const loadDataToDB = async function () {
  try {
    const users = await loadUsers();
    const establishment = await loadEstablishments();
    const sites = await loadSites();
    const courts = await loadCourts();
    const bookings = await loadBookings();
  } catch (error) {
    console.log(error);
  }
};
const isDbLoaded = async function () {
  try {
    let users = await User.findAll();

    if (!users.length) {
      await loadDataToDB();
      console.log("inicializada");
    }
    console.log("db inicializada");
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  isDbLoaded,
};
