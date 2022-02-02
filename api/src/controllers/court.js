const { Court, Site } = require("../db");
// cambiar nombre de sede cuando sepa el nombre de la tabla de sede

const postCourt = async (req, res, next) => {
  const { name, description, shiftLength, price, image, sport, siteId } =
    req.body;

  shiftLength = parseInt(shiftLength);
  price = parseInt(price);

  let siteDB = await Site.findOne({
    where: { id: siteId },
  });

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
};

const findBySport = async (req, res) => {
  const { sport } = req.query.sport;
  try {
    const results = await Court.findAll({
      where: {
        sport: sport,
      },
    });
    res.send(results);
  } catch (e) {
    console.log(e);
  }
};

const sortByPrice = async (req, res) => {
  const range = req.query.range;

  const courts = await Court.findAll();

  if (range === "max") {
  }
};
module.exports = { postCourt, findBySport };
