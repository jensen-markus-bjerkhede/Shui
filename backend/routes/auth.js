const { Router, response } = require('express');
const { db } = require('./db');
const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const router = new Router();


router.post('/login', async (req, res) => {

    let user = db
        .get('users')
        .find({ username: req.body.username })
        .value()

    if (user) {
        const valid = await bcrypt.compare(req.body.password, user.password)

        if (valid) {

            const bytes = CryptoJS.AES.decrypt(user.userkey, process.env.SECRET);
            const DECRYPTED_USER_KEY = bytes.toString(CryptoJS.enc.Utf8);

            // JTW
            const token = jwt.sign({ uuid: user.uuid }, process.env.JWT_KEY);

            try {
                jwt.verify(token, process.env.JWT_KEY);
            } catch {
                res.send(400)
            }

            return res.send({
                token: token,
                userkey: DECRYPTED_USER_KEY
            });

        }
    }
    return res.send(400);
});

router.get('/verify', async (req, res) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        jwt.verify(token, process.env.JWT_KEY);
        res.status(200).send(true);
    } catch (err) {
        res.status(200).send(false);
    }
});


module.exports = router;