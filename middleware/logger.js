const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.hostname}/${req.params}`);
    next();
}

module.exports = logger;