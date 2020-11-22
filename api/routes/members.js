const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

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
        fileSize: (1024*1024)*10
    },
    fileFilter: fileFilter
});

const MembersController = require('../controllers/members');

router.get('/', checkAuth, MembersController.get_members_all);

router.post('/', checkAuth,/* upload.single('image'),*/ MembersController.post_member);

router.get('/:memberId', MembersController.get_this_member);

router.patch('/:memberId', checkAuth, MembersController.patch_member);

router.delete('/:memberId', checkAuth, MembersController.delete_member);

module.exports = router;