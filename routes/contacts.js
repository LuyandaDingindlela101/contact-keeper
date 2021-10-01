const { Router } = require("express");
const router = Router();



// ROUTE TO GET ALL USERS CONTACTS
router.get("/", (request, response) => {
    response.json("got all contacts");
})

// ROUTE TO ADD NEW CONTACT
router.post("/", (request, response) => {
    response.json("added contacts");
})

// ROUTE TO UPDATE A CONTACT BASED ON THE id
router.put("/:id", (request, response) => {
    response.json("put contact");
})

// ROUTE DELETE A CONTACT BASED ON THE id
router.delete("/:id", (request, response) => {
    response.json("deleted contact");
})


// EXPORT THE router
module.exports = router;