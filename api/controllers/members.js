const Member = require('../models/member');

exports.get_members_all = (req, res, next) => {
    Member.find()
    .select("name surname email image")
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            members: docs.map(doc => {
                return {
                    name: doc.name,
                    surname: doc.surname,
                    email: doc.email,
 //                   image: doc.image,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: 'http//localhost:3000/members/' + doc._id
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

exports.post_member = (req, res, next) => {
   
    const member = new Member({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email//,
  //      image: req.file.path
    });
    
    member
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Created member successfully',
            createdMember: {
                name: result.name,
                surname: result.surname,
                email: result.email,
//                image: result.image,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: "localhost:3000/members/" + result._id
                }
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
}

exports.get_this_member = (req, res, next) => {
    const id = req.params.memberId;

    Member.findById(id)
    .select('name surname email _id image')   
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if(doc) {
            res.status(200).json({
                member: doc.member,
                request: {
                    type: 'GET',
                    url: "http//localhost:3000/members"
                }
            });

        } else {
            res.status(404).json({message: "No valid entry found for provided ID"})
        }
        res.status(200).json(doc) 
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err});
    });
}


exports.patch_member = (req, res, next) => {
    const id = req.params.memberId
    const updateOps  = {};
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Member.update({_id: id}, { $set: updateOps })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Member updated',
            request: {
                type: 'GET',
                url: 'http://loclahost:3000/members/' + id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.delete_member = (req, res, next) => {
    const id = req.params.memberId
    Member.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Member deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:300/members',
                body: {name: 'String', surname: 'String', email: 'String'/*, image: 'Image'*/}
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}