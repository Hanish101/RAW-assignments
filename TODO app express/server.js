const express = require("express")
const viewsRouter = require("./routes/views.routes")
const todoRouter = require("./routes/todos.routes")
const authRouter = require('./routes/auth.routes')

const app = express()
app.set("view engine", "ejs")


// app.use(middlewares.logger)
app.use(express.json())


app.get("/greetings", (req, res) => {
    return res.send("Greetings from Todo App.")
})

app.use("/", viewsRouter)
app.use("/api/todos", todoRouter)
app.use("/api/auth", authRouter)



app.listen(5000, () => {
    console.log("server is running on port 5000")
})
