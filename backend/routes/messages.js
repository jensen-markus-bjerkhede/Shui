const { Router, response } = require('express');
const { db } = require('./db');
const shortId = require('shortid');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const router = new Router();


router.post('/create', async (req, res) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];

        const verified_user = jwt.verify(token, process.env.JWT_KEY);

        let user = db
            .get('users')
            .find({ uuid: verified_user.uuid })
            .value();

        const userKeyBytes = CryptoJS.AES.decrypt(user.userkey, process.env.SECRET);
        const decryptedUserKey = userKeyBytes.toString(CryptoJS.enc.Utf8);

        const messageBytes = CryptoJS.AES.decrypt(req.body.content, decryptedUserKey);
        const decryptedMessage = messageBytes.toString(CryptoJS.enc.Utf8);

        const encryptedMessage = CryptoJS.AES.encrypt(decryptedMessage, process.env.SECRET).toString();

        const streamList = req.body.streams.replace(/\s/g, '').split(',');

        const message = {
            id: shortId.generate(),
            name: user.username,
            content: encryptedMessage,
            streams: streamList,
            uuid: user.uuid
        }
        db.get('messages')
            .push(message)
            .write()

        res.status(201).send('Message created');

    } catch (err) {
        console.error(err)
        res.status(400).send(err)
    }
});
router.get('/list', async (req, res) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];

        const verifiedUser = jwt.verify(token, process.env.JWT_KEY);

        const user = db
            .get('users')
            .find({ uuid: verifiedUser.uuid })
            .value()

        const messages = db.get('messages')
            .value()

        let returnMessages = messages.map(({ uuid, ...remainingAttrs }) => remainingAttrs)

        returnMessages.forEach(message => {

            const messageBytes = CryptoJS.AES.decrypt(message.content, process.env.SECRET);
            const decryptedMessage = messageBytes.toString(CryptoJS.enc.Utf8);

            const userKeyBytes = CryptoJS.AES.decrypt(user.userkey, process.env.SECRET);
            const decryptedUserKey = userKeyBytes.toString(CryptoJS.enc.Utf8);

            message.content = CryptoJS.AES.encrypt(decryptedMessage, decryptedUserKey).toString();
        });
        return res.status(200).send(returnMessages);

    } catch (err) {
        console.error(err)
        res.status(400).send(err)
    }
});

function hasAny(messagesStreams, streams) {
    return messagesStreams.some(r=> streams.includes(r))
}

module.exports = router;
