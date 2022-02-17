module.exports = (req, res, next) => {
    const now = new Date();
    console.log("time: " + now.toISOString(), "ip: " + req.ip)
    next();
};