const express = require("express")
const utils = require("../utils/utils")
const { isAuthenticated, isAuthenticatedPage } = require("../middlewares")


 
const router = express.Router()

router.get("", (req, res) => {
    return utils.readData()
        .then((dataArr) => {
            return res.render("index", {title:"todos", todos: dataArr })
        })
})

//todos single 1
router.get("/todos/:title",
    // isAuthenticatedPage,
    (req, res) => {
    const title = req.params.title.toLowerCase()

    console.log("---authlogin---",req.headers.authorization)

    return utils.readData()
        .then((dataArr) => {
            const todo = dataArr.find((element) => (element.title.toLowerCase() === title))
            return res.render("task", { title: "show", todo })
        })
})

// //todos single 2
// router.get("/todos/:title",
//     (req, res) => {

//         const title = req.params.title
//         let todo = {}

//         console.log("Hello");


//         fetch(`/api/todos/${encodeURIComponent(title)}`)
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log(data);
//                 todo = data
//             })
//             .catch((error) => {
//                 console.error(error);
//             });

//         return res.render("task", { title: "show", todo })


// })

// //todos single 3
// router.get("/todos/:title",
//     (req, res) => {

// const title = req.params.title;


// fetch(`/api/todos/${encodeURIComponent(title)}`)
//     .then((response) => response.json())
//     .then((data) => {
//         const todo = data;
//         res.render("task", { title: "show", todo });
//     })
//     .catch((error) => {
//         console.error(error);
//         res.render("task", { title: "show", todo: {} });
//     });

// })


router.get("/todo/create",(req, res) => {
    return res.render("task_create", { title: "create" })
})

router.get("/todos/update/:title", (req, res) => {
    const title = req.params.title.toLowerCase()

    // console.log(title)

    return utils.readData()
        .then((dataArr) => {
            const todo = dataArr.find((element) => (element.title.toLowerCase() === title))
            return res.render("task_update", { title: "Update", todo })
        })

    // return res.render("task")
})


//register
router.get("/auth/register", (req, res) => {
    return res.render("register", { title: "Register" })
})

//login
router.get("/auth/login", (req, res) => {
    return res.render("login", { title: "Login" })
})


module.exports = router