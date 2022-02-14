const { Court, Site } = require("../db");
// cambiar nombre de sede cuando sepa el nombre de la tabla de sede

const postCourt = async (req, res, next) => {
  const { name, description, shiftLength, price, image, sport, siteId } =
    req.body;

  try {
    let courtDB = await Court.findOne({
      where: {
        name: name,
        sport: sport,
        siteId: siteId,
      },
    });

    if (!courtDB) {
      let courtCreated = await Court.create({
        name,
        description,
        shiftLength,
        price,
        image,
        sport,
        siteId
      });

      res.status(200).json(courtCreated);
    } else {
      res.status(404).send("court already exist");
    }
  } catch (e) {
    next(e);
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
    let courtDB = await Court.findAll();
    res.send(courtDB);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { postCourt, getAllCourts };
