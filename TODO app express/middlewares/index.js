function isAuthenticated(req, res, next) {
    console.log("---auth--- ",  req.headers.authorization )
    if(!req.headers.authorization || req.headers.authorization === "null"  ) {
        return res.status(200)
        .json({ 
            redirect: true
        })
    }
    next()
}

function isAuthenticatedPage(req, res, next) {
    console.log("---authpage--- ",  req.headers.authorization )
    if(!req.headers.authorization || req.headers.authorization === "null"  ) {
        return res.render("login", { title: "Login" })
    }
    next()
}

module.exports = {
    isAuthenticated,
    isAuthenticatedPage
}