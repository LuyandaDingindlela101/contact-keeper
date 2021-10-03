const { Router } = require("express");
const { check, validationResult } = require('express-validator');

// CUSTOM MODULES
const User = require("../models/User");
const auth =  require("../middleware/auth");
const Contact = require("../models/Contact");


const router = Router();


// ROUTE TO GET ALL USERS CONTACTS
router.get("/", auth, async (request, response) => {
    try {
        // GET ALL CONTACTS THAT HAVE THE SAME USER AS THE PROVIDED id AND SORT THEM BY MOST RECENT ADDITION
        let contacts = await Contact.find({ user: request.user.id }).sort({ date: -1 });

        response.json(contacts);
    } catch (error) {

        console.error(error.message);
        response.status(500).send("Server error")
    }
})

// ROUTE TO ADD NEW CONTACT
router.post("/", 
    // BOTH THE auth MIDDLEWARE AND express-validator NEED O BE THE 2ND PARAMETER, THAT IS SOLVED BY PUTTING THEM IN AN ARRAY
    [
        auth,
        // CHECK IF name IS NOT EMPTY
        check("name", "name is required").not().isEmpty()
    ],
    async (request, response) => {
        // GET ALL THE ERRORS
        const errors = validationResult(request);

        // CHECK IF THERE ARE ERRORS
        if(!errors.isEmpty()) {
            // RETURN A 400 STATUS CODE BECAUSE THE PROVIDED DETAILS ARE INCORRECT
            return response.status(400).json({ errors: errors.array() });
        }

        const { name, email, phone_number, type } = request.body;

        try {
            // CREATE A NEW CONTACT WITH THE PROVIDED DETAILS
            let new_contact = new Contact({ user: request.user.id , name, email, phone_number, type });
            // SAVE THE CONTACT TO THE DATABASE
            let contact =  await new_contact.save();

            response.json(contact);
        } catch (error) {

            console.error(error.message);
            response.status(500).send("Server error")
        }
    }
)

// ROUTE TO UPDATE A CONTACT BASED ON THE id
router.put("/:id", auth, (request, response) => {
    response.json("put contact");
})

// ROUTE DELETE A CONTACT BASED ON THE id
router.delete("/:id", auth, (request, response) => {
    response.json("deleted contact");
})


// EXPORT THE router
module.exports = router;