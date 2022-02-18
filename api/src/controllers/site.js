const { Establishment, Site, User } = require("../db");

const createSite = async (req, res, next) => {
  const {
    establishmentId,
    name,
    country,
    city,
    street,
    streetNumber,
    latitude,
    longitude,
  } = req.body;

  try {
    let siteDB = await Site.findOne({
      where: {
        name: name,
        establishmentId: establishmentId,
        isActive: true,
      },
    });

    if (siteDB) {
      res.status(404).send("site already exist");
    } else {
      let siteCreated = await Site.create({
        name,
        country,
        city,
        street,
        streetNumber,
        latitude,
        longitude,
        establishmentId,
      });

      res.status(200).json(siteCreated);
    }
  } catch (error) {
    next(error);
  }
};

const findByLocation = async (req, res) => {
  const { location } = req.query.location;
  try {
    const results = await Site.findAll({
      where: {
        city: location,
      },
    });
    res.send(results);
  } catch (e) {
    console.log(e);
  }
};

const getAllSites = async (req, res, next) => {
  const establishmentId = req.params.establishmentId;

  let sites;

  try {
    if (establishmentId) {
      sites = await Site.findAll({
        where: { 
                establishmentId: establishmentId,
                isActive:true
                },
      });
      sites = sites.map((site) => {
        return {
          id: site.id,
          name: site.name,
    
        };
      });
      return res.send(sites);
    }

    sites = await Site.findAll();
    res.send(sites);
  } catch (e) {
    console.log(e);
  }
};

const updateStatusSite = async (req, res, next) => {

  const {siteId}= req.body
  try {
    
      const updated = await Site.findOne({ where: { id: siteId }});
      updated.isActive = !updated.isActive;
      await updated.save();

     res.json(updated)
  } catch (e) {
    console.log(e);
  }
};

module.exports = { createSite, getAllSites, findByLocation,updateStatusSite };
