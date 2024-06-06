const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const {
    printAlltaskref,
    taskrefbyId,
    createtaskref,
    updatetaskref,
    deleteUser
} = require('../controllers/userController.js');
const Auth_middleware = require('../middlewares/authMiddleware.js');
const {
    registration
} = require('../controllers/AuthControllers.js');

router.post('/signup', registration);

// router.get('/login', login);

router.use(Auth_middleware);

router.delete('/delete', deleteUser);

router.get('/', printAlltaskref);

router.get('/get', taskrefbyId);

router.post('/create',upload.single('photo'), createtaskref);

router.put('/update', updatetaskref);


module.exports = router;