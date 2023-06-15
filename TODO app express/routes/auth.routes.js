const express = require("express")
const router = express.Router()
const { body, validationResult } = require("express-validator")
const JWT = require("jsonwebtoken")
const { SECRET } = require("../config")
const bcrypt = require('bcryptjs');
const utils = require("../utils/utils")
const fs = require("fs/promises")




let USER = []

router.post("/register",
    body("name")
        .custom((name) => {
            if (typeof name === "string" && name.length >= 5) {
                return true
            }
            return false
        })
        .withMessage("Name should be of minimum 5 characters."),
    body("email")
    .isEmail()
        .withMessage("Enter email in proper format."),
    body("email")
        .custom((email) => {

            const user = USER.find((user) => user.email === email);
            if (user) {
                return false;
            }
                return true;
        })
  .withMessage("Email address already in use"),
    body("password")
        .custom((password) => {
            if (typeof password === "string" && password.length >= 8) {
                return true
            }
            return false
        })
        .withMessage("Password should be of minimum 8 characters."),
    (req, res) => {

        const { name, email, password } = req.body

        
        const errors = validationResult(req)
        
        if (!errors.isEmpty()) {
            return res.status(400)
            .json({
                message: "User registeration failed.",
                error: errors.array(),
                data: {}
            })
        }
        
        // USER.push(
            //     {
                //         name,
                //         email,
                //         password
                //     }
                // )
                
                //push data to users.json
                
        const salt = bcrypt.genSaltSync(10);
        
        const hashedPassword = bcrypt.hashSync(password, salt)
        
        newdata = {name, email, hashedPassword}
        
        console.log("registered user", newdata, password)

        return utils.readUsers()
        .then((data) => {
            data.push(newdata)
            return fs.writeFile("users.json", JSON.stringify(data))
        })
        .then(() => {
                return res.status(201)
                    .json({
                        message: "User registeration successful.",
                        data: {},
                        error: null
                    })
            })
            .catch((error) => {
                return res.status(400)
                    .json({
                        message: "user creation failed in user.json.",
                        data: {},
                        error: error.message ? error.message : error.toString()
                    })
            })

    })

router.post("/login", (req, res) => {
    const { email, password } = req.body 

    console.log("---user info ---", email, password)

    utils.readUsers()
        .then((users) => {
            USER = users; 
            // console.log(USER); 
        })
        .catch((error) => {
            console.log(error); 
        });

    if (USER.length <=0 ) {
        return res.status(400)
                .json({
                    message: "User login failed.",
                    error: "User does not exists.",
                    data: {}
                })
    } 

    const userIndex = USER.findIndex((user) => user.email === email)

    if(userIndex === -1 ) {
        return res.status(404)
                .json({
                    message: "User login failed.",
                    error: "User not found.",
                    data: {}
                })
    }

    // if(USER[userIndex].password !== password) {
    //     return res.status(404)
    //     .json({
    //         message: "User login failed.",
    //         error: "Invalid password.",
    //         data: {}
    //     })
    // }

    if( !bcrypt.compareSync(password, USER[userIndex].hashedPassword)){
        return res.status(404)
        .json({
            message: "User login failed.",
            error: "Invalid password.",
            data: {}
        })
    }

    // create access tokens
    // response to clientjwt npm

    const token = JWT.sign({ email }, SECRET)

    return res.status(200)
    .json({
        message: "User login successful.",
            error: null,
            data: {
                access_token: token
            }
    })
})

router.get('/', (req, res)=> {
    return res.json(USER)
})

module.exports = router
