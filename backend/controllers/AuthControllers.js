const {
    generateJWT,
    verifyJWT
} = require("../utils/Auth.js");
const {
    generateHash,
    compareHash
} = require("../utils/Bcrypt.js");

const User = require("../model/user.js");

exports.registration = async (req, res) => {
    try {
        const {
            username,
            email,
            password
        } = req.body;

        let user = await User.findOne({
            email
        });

        if (user) {
            return res.status(400).json({
                message: "already exist"
            });
        }

        const hashedPassword = generateHash(password);

        user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(200).json({
            message: "registation done"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "errr"
        });
    }
}



