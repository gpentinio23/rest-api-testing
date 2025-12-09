
require("dotenv").config();
const jwt = require("jsonwebtoken");

 //const roles = ["user"];
const roles = ["admin"];
// const roles = ["user", "admin"];



const token = jwt.sign(
    {
        id: 1,
        email: "test@example.com",
        roles: roles
    },
    process.env.JWT_SECRET,
    {
        algorithm: "HS256",
        expiresIn: "20m" // expires in 20 minutes
    }
);

console.log("Your token:\n");
console.log(token);
