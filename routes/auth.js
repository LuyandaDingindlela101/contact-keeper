// GET NEEDED REQUIREMENTS
const { Router } = require("express");
const router = Router();


// ROUTE TO GET THE LOGGED IN USER
router.get("/", (request, response) => {
    response.json("got logged user");
})

// AUTHENTICATE USER AND GET TOKEN
router.post("/", (request, response) => {
    response.json("authenticate user");
})


// EXPORT THE ROUTER
module.exports = router;