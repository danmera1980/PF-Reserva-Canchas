const { Court, Site, Establishment } = require("../db");
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

const getAllCourts = async function (req, res, next) {
  try {
    let courtDB = await Court.findAll();
    res.send(courtDB);
  } catch (error) {
    console.log(error);
  }
};
const getCourtById = async (req, res, next) => {
  const {id} = req.params
  try {
      const establishment = await Court.findOne({
          where:{
              id
          },
          include:{
              model: Site,
              as: 'site',
              include:{
                model: Establishment,
                as: 'establishment',
                attributes: {
                  exclude: ['cuit']
                }
              }
            }
      })
      res.send(establishment)

  } catch (error) {
      console.log(error)
  }
}

const updateStatusCourt = async (req, res, next) => {

  console.log('soy req.body',req.body)
  const {courtId}= req.body
  console.log('soy courtId',courtId)
  try {
    
      const updated = await Court.findOne({ where: { id: courtId }});
      updated.isActive = !updated.isActive;
      await updated.save();

     res.json(updated)
  } catch (e) {
    console.log(e);
  }
};


module.exports = { postCourt, getAllCourts, getCourtById, updateStatusCourt };
