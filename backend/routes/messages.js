const { Router, response } = require('express');
const { db } = require('./db');
const bcrypt = require('bcrypt');
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

        let message = {
            name: req.body.name,
            content: req.body.content,
            stream: req.body.stream,
            uuid: user.uuid
        }
        db.get('messages')
        .push(message)
        .write()

        res.status(201).send('Message created');

    } catch(err) {
        console.error(err)
        res.status(400).send(err)
    }
})
router.get('/list', async (req, res) => {
    
    try {
        // const token = headers['authorization'].split(' ')[1];
        
        // jwt.verify(token, process.env.JWT_KEY);

        let messages = db.get('messages')
        .filter({stream: req.query.stream})
        .value()

        let returnMessages = messages.map(({uuid, ...remainingAttrs}) => remainingAttrs)
      
        return res.status(200).send(returnMessages);

    } catch(err) {
        console.error(err)
        res.status(400).send(err)
    }
})

module.exports = router;