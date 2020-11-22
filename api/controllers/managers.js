const Manager = require("../models/manager");

exports.managers_get_all = (req, res, next) => {
    Manager.find()
    .select("name surname email password image")
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            managers: docs.map(doc => {
                return {
                    name: doc.name,
                    surname: doc.surname,
                    email: doc.email,
                    password: doc.password,
 //                   image: doc.image,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: 'http//localhost:3000/managers/' + doc._id
                    }
                }
            })
        }
            res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })    
    })
}

exports.post_new_manager = (req, res, next) => {
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
                    password: hash//,
                    //image: req.file.path
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
}

exports.login_manager = (req, res, next) => {
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
}

exports.delete_manager = (req, res, next) => {
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
}