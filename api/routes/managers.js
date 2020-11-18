const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const bcrypt = require('bcrypt');
const checkAuth = require('../middleware/check-auth');

const jwt = require('jsonwebtoken');

const Manager = require("../models/manager");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './img/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
    
};
const upload = multer({
    storage: storage,
    limits: {
        fileSize: (1024*1024)*5
    },
    fileFilter: fileFilter
});

router.post('/', /*checkAuth, upload.single('image'),*/ (req, res, next) => {
   
    const manager = new Manager({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password//,
  //      image: req.file.path
    });
    
    manager
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Created manager successfully',
            createdManager: {
                name: result.name,
                surname: result.surname,
                email: result.email,
                password: result.password,
//                image: result.image,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: "localhost:3000/managers/" + result._id
                }
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

router.post("/signup", /*checkAuth, upload.single('image'),*/ (req, res, next) => {
        Manager.find({email: req.body.email})
        .exec()
        .then(manager => {
            if(manager.length >= 1) {
                return res.status(409).json({
                    message: 'Mail exists'
                });
            } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const manager = new Manager({
                        _id: new mongoose.Types.ObjectId(),
                        name: req.body.name,
                        surname: req.body.surname,
                        email: req.body.email,
                        password: hash,
                        image: req.file.path
                    });
                    manager
                    .save()
                    .then(result => {
                        console.log(result);
                        res.status(200).json({
                            message: 'Manager created'
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
                }
            });
        }
    });
});

router.post('/login', (req, res, next) => {
    Manager.find({ email: req.body.email })
    .exec()
    .then(manager => {
        if (manager.length < 1) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        bcrypt.compare(req.body.password, manager[0].password, (err, result) => {
            if(err) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            if(result) {
                const token = jwt.sign({
                    email: manager[0].email,
                    managerId: manager[0]._id,
                    name: manager[0].name,
                    surname: manager[0].surname,
//                    image: manager[0].image
                }, 
                process.env.JWT_KEY,
                {
                    expiresIn:"1h"
                }
                );
                return res.status(200).json({
                    message: "Auth succussful",
                    token: token
                });
            }
            res.status(401).json({
                message: "Auth failed"
            });
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
})

router.delete('/:managerId', (req, res, next) => {
    Manager.remove({_id : req.params.managerId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Manager deleted'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;