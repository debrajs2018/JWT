const router = require("express").Router();
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const UserModel = require("../model/UserModel.js");
router.post("/register", (req, res) => {
    //also check whether same email id is present in db or not  || check for creating indexing using email id , that way duplicate email ids can be prevented 
    // before registering just a link to confirm email id (this process needs to be checked )
    const { email, password } = req.body;
    const SaltRounds = Number(process.env.SALTROUNDS);
    bcrypt.genSalt(SaltRounds, (err, salt) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Error" });
            return next();
        }
        bcrypt.hash(password, salt, async (err, hash) => {
            const user = new UserModel({ email, password: hash });
            user.save((err, response) => {
                if (err) {
                    res.status(500).json({ message: err });
                }
                else {
                    res.status(200).json({ message: "Successful", data: response });
                }
            })
        })
    })


})

router.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    const record = await UserModel.findOne({ email });
    if (!record) {
        res.status(500).json({ message: "Email/Password does not match" });
        return next();
    }
    bcrypt.compare(password, record.password, (err, result) => {
        if (err || !result) {
            console.log(err);
            res.status(500).json({ message: "Email/Password does not match" });
        }
        else {
            const token = jsonwebtoken.sign(req.body, process.env.TOKEN_SECRET);
            res.status(200).json({ email, secretToken: token });
        }
    })


});

module.exports = router;