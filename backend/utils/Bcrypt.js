 const bcrypt = require("bcrypt");

 const generateHash = async (password) => {
     try {
         const saltrounds = 10;
         const hashpasword = await bcrypt.hash(password, saltrounds);
         return hashpasword;
     } 
     catch (err) 
     {
         res.status(400).json({
             message: "generating hash password failed",
             err
         });
     }

 }

 const compareHash = async (password, hashedPassword) => {
     try {
         const match = await bcrypt.compare(password, hashedPassword);
         return match;

     } catch (error) {
         console.error('Error comparing password:', error.message);
         return false;
     }
 }

 module.exports = {
     generateHash,
     compareHash
 };