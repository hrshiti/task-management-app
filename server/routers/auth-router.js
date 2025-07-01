const express = require('express');
const { register, login, getUserData, deleteUser, updateUser } = require('../controllers/auth-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const roleMiddleware = require('../middlewares/roleMiddleware');


const router = express.Router();



router.post("/register", register)
router.post("/login", login)
router.get("/userData", authMiddleware, roleMiddleware("admin","teacher"), getUserData);

router.delete("/deleteUser/:id",authMiddleware, roleMiddleware("admin"), deleteUser)
router.put("/updateUser/:id",authMiddleware, roleMiddleware("admin"), updateUser)


module.exports = router;