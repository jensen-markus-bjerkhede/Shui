const { Router, response } = require('express');
const { db } = require('./db');
const jwt = require('jsonwebtoken');
const shortId = require('shortid');
const bcrypt = require('bcrypt');

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

        let verifiedUser = jwt.verify(token, process.env.JWT_KEY);
        if (req.body.name && req.body.password) {

            const HASHED_PW = await bcrypt.hash(req.body.password, 10);

            let newStream = {
                name: req.body.name,
                password: HASHED_PW,
                id: shortId.generate()
            }
            db.get('streams')
                .push(newStream)
                .write()
            let user = db
                .get('users')
                .find({ uuid: verifiedUser.uuid })
                .value()
            let userStreams = user.streams;
            userStreams.push(stream.id)
            db
                .get('users')
                .find({ uuid: verified_user.uuid })
                .assign({ streams: userStreams })
                .write();

            res.status(201).send("Successfully created stream")
        } else {
            res.status(400).send('Whoops! Did you really entered the credentials correctly?')
        }


    } catch (err) {
        console.error(err)
        res.status(400).send(err)
    }
});
router.post('/subscribe', async (req, res) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        const verified_user = jwt.verify(token, process.env.JWT_KEY);
        let stream = db
            .get('streams')
            .find({ name: req.body.name })
            .value()
        console.log(stream)
        if (stream) {
            const valid = await bcrypt.compare(req.body.password, stream.password)
            if (valid) {
                let user = db
                    .get('users')
                    .find({ uuid: verified_user.uuid })
                    .value()
                let userStreams = user.streams;
                userStreams.push(stream.id)
                db
                    .get('users')
                    .find({ uuid: verified_user.uuid })
                    .assign({ streams: userStreams })
                    .write();
                res.status(200).send("Successfull");
            }
        }
    } catch (err) {
        console.error(err)
        res.status(400).send(err)
    }
});


router.delete('/delete', async (req, res) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        jwt.verify(token, process.env.JWT_KEY);

        let stream = db
            .get('streams')
            .find({ name: req.body.name })
            .value()
        if (stream) {
            db
                .get('streams')
                .remove(stream)
                .write()
            res.status(204).send("Successfully removed stream");
        }
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