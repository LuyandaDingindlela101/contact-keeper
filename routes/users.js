// GET NEEDED REQUIREMENTS
const { Router, request } = require("express");
const User = require("../models/User");
const bcrypt =  require("bcryptjs");
const { check, validationResult } = require('express-validator');


const router = Router();


// ROUTE TO REGISTER A USER
router.post("/",
    [
        // CHECK IF name IS NOT EMPTY
        check("name", "name is required").not().isEmpty(),
        // CHECK IF EMAIL IS VALID
        check("email", "email is not valid").isEmail(),
        // CHECK IF PASSWORD IS MORE THAT 6 CHARACTERS
        check("password", "please enter a password with 6 or more characters").isLength({ min: 6 })
    ],
    async (request, response) => {
        // GET ALL THE ERRORS
        const errors = validationResult(request);

        // CHECK IF THERE ARE ERRORS
        if(!errors.isEmpty()) {
            // RETURN A 400 STATUS CODE BECAUSE THE PROVIDED DETAILS ARE INCORRECT
            return response.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = request.body;

        try {
            // FIND A USER WITH THE SAME email AS PROVIDED
            let user = await User.findOne({ email });
        
            if (user) {
                return response.status(400).json({ msg: "user exists" });
            }

            user = new User({
                name, email, password
            });

            // ENCRYPT THE PASSWORD BY USING A salt
            let salt = await bcrypt.genSalt(10);
            user.password = bcrypt.hash(password, salt)

        } catch (err) {

        }

        response.send(request.body);
})


// EXPORT THE ROUTER
module.exports = router;