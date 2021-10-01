// GET NEEDED REQUIREMENTS
// const express = require("express");
const { Router } = require("express");
const router = Router();


// ROUTE TO REGISTER A USER
router.post("/", (request, response) => {
    response.json("registered user");
})


// EXPORT THE ROUTER
module.exports = router;