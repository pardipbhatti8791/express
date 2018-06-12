function log(req, res, next) {
    console.log('Logging in...');
    next();
};

module.exports = log;