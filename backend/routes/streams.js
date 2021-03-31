const { Router, response } = require('express');
const { db } = require('./db');
const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const router = new Router();


router.post('/create', async (req, res) => {
    let stream = db
    .get('streams')
    .find({name: req.body.name})
    .value()
    if(stream) {
        return res.status(409).send('stream already exist')
       
    }
    try {
        const token = req.headers['authorization'].split(' ')[1];
        
        jwt.verify(token, process.env.JWT_KEY);
       
        let stream = {
            name: req.body.name
        }
        db.get('streams')
        .push(stream)
        .write()

        res.status(201).send('Stream created');

    } catch(err) {
        console.error(err)
        res.status(400).send(err)
    }
})

module.exports = router;