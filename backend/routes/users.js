const { Router } = require('express');
const { db } = require('./db');
const bcrypt = require('bcrypt');
const shortid = require('shortid');
const CryptoJS = require('crypto-js');
const jwt = require("jsonwebtoken");

const router = new Router();

router.post('/create', async (req, res) => {

    let user = db
        .get('users')
        .find({ username: req.body.username })
        .value()
    if (user) {
        return res.status(409).send('User already exist')
    }
    if (req.body.username && req.body.password) {

        const HASHED_PW = await bcrypt.hash(req.body.password, 10);
        const USER_KEY = shortid.generate();
        const ENCRYPTED_USER_KEY = CryptoJS.AES.encrypt(USER_KEY, process.env.SECRET).toString();

        let user = {
            uuid: shortid.generate(),
            username: req.body.username,
            password: HASHED_PW, // hash with bcrypt
            userkey: ENCRYPTED_USER_KEY // encrypted with SECRET
        }

        db.get('users')
            .push(user)
            .write()

        res.status(201).send('User created.');

    } else {
        res.status(400).send('Whoops! Did you really entered the credentials correctly?')
    }
})
router.delete('/delete', async (req, res) => {

    const token = req.headers['authorization'].split(' ')[1];

    try {

        const verified_user = jwt.verify(token, process.env.JWT_KEY);

        let messages = db.get('messages')
            .filter({ uuid: verified_user.uuid })
            .value()

        messages.forEach(item => {
            db.get('messages')
                .find({ id: item.id })
                .assign({ name: 'Anonymous' })
                .write()
        });

        db
            .get('users')
            .remove({ uuid: verified_user.uuid })
            .write();

        res.status(204).send('User removed.');

    } catch (err) {
        console.error(err)
        res.status(400).send(err)
    }
})

module.exports = router;