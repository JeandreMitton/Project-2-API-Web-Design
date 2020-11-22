const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const ManagersController = require('../controllers/managers');

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

router.get('/', checkAuth, ManagersController.managers_get_all);

router.post("/signup", checkAuth, /*upload.single('image'),*/ ManagersController.post_new_manager);

router.post('/login', ManagersController.login_manager);

router.delete("/:managerId", checkAuth, ManagersController.delete_manager);

module.exports = router;  