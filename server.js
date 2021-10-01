// GET NEEDED REQUIREMENTS
const express = require("express");
// LOOK FORE AN ENVIROMENT VARIABLE CALLED PORT(USED IN PRODUCTION) OR JUST USE 5000
const port = process.env.port || 5000;


// INITIALISE THE EXPRESS APP
app = express();

// MIDDLEWARE TO CON=NVERT RESPONSES TO JSON
app.use(express.json());

// DEFINE ROUTES
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contacts"));


// LISTEN FOR REQUESTS ON PORT
app.listen(port, () => console.log(`Server listening on port: ${port}`));