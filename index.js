const express = require("express");
const {connection} = require("./configs/db")
const { userRouter} = require("./Routes/User.route");
const { postRouter } = require("./Routes/Post.route");
const {authenticate} = require("./middlewares/authenticate.middleware");
require("dotenv").config();

const cors=require("cors");
const app = express();
app.use(cors({
    origin: "*"
}))
app.use(express.json());

app.get("/", (req, res)=>{
    res.status(200).send("Home Page");
});

app.use("/users",userRouter);
app.use(authenticate);
app.use("/posts",postRouter);

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("Connected to mongoDB");
    } catch (error) {
        console.log("Trouble connecting to mongoDB");
    }
    console.log(`listening on port ${process.env.port}`);
})