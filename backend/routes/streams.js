const { Router, response } = require('express');
const { db } = require('./db');
const jwt = require('jsonwebtoken');

const router = new Router();


router.post('/create', async (req, res) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];

        let stream = db
            .get('streams')
            .find({ name: req.body.name })
            .value()
        if (stream) {
            return res.status(409).send('stream already exist')
        }

        jwt.verify(token, process.env.JWT_KEY);

        let newStream = {
            name: req.body.name
        }
        db.get('streams')
            .push(newStream)
            .write()

        res.status(201).send(newStream)
            .value()

    } catch (err) {
        console.error(err)
        res.status(400).send(err)
    }
});

router.get('/list', async (req, res) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        jwt.verify(token, process.env.JWT_KEY);

        let streams = db.get('streams')
            .value()
        return res.status(200).send(streams);

    } catch (err) {
        console.error(err)
        res.status(400).send(err)
    }
});

module.exports = router;