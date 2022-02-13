const { Court, Site } = require("../db");
// cambiar nombre de sede cuando sepa el nombre de la tabla de sede

const postCourt = async (req, res, next) => {
  const { name, description, shiftLength, price, image, sport, siteId } =
    req.body;

  let siteDB = await Site.findOne({
    where: { id: siteId },
  });

  if (!siteDB) {
    res.status(400).send("site does not exist");
  } else {
    let courtDB = await Court.findOne({
      where: {
        name: name,
        sport: sport,
        siteId: siteId,
      },
    });
    console.log(courtDB);

    try {
      if (!courtDB) {
        let courtCreated = await Court.create({
          name,
          description,
          shiftLength,
          price,
          image,
          sport,
        });

        await siteDB.addCourt(courtCreated);

        res.send("court created");
      } else {
        res.status(404).send("court already exist");
      }
    } catch (e) {
      next(e);
    }
  }
};

const sortByPrice = async (req, res) => {
  const range = req.query.range;

  const courts = await Court.findAll();

  if (range === "max") {
  }
};

const getAllCourts = async function (req, res, next) {
  try {

    let courtDB = await Court.findAll()
    res.send(courtDB);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { postCourt, getAllCourts };
