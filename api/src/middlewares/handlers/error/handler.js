

module.exports = errorHandler = (req, res) => {
    res.status(500).send({ error: `${res.error}` });
};