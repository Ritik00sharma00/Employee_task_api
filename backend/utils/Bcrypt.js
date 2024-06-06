 const bcrypt = require("bcrypt");

 const generateHash = async (password) => {
     try {
         const saltrounds = 10;
         const hashpasword = await bcrypt.hash(password, saltrounds);
         return hashpasword;
     } catch (err) {
         return null;
     }

 }

 const compareHash = async (password, hashedPassword) => {
     try {
         const match = await bcrypt.compare(password, hashedPassword);
         return match;

     } catch (error) {


         return false;
     }
 }

 module.exports = {
     generateHash,
     compareHash
 };