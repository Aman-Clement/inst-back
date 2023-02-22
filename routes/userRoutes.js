const express=require('express');
const {registerUser,allUsers}=require("../controllers/userController")


const router=express.Router();

router.route('/').get(allUsers);
router.route('/').post(registerUser);

module.exports=router;