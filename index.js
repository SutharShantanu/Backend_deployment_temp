const express = require("express");
const { connection } = require("./db");
const { userRouter } = require(".//Routes/user.routes");
const { auth } = require("./Middlewares/auth.middlewares");
const { noteRouter } = require("./Routes/note.routes");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use(auth);
app.use("/notes", noteRouter);

app.listen(4500, async () => {
    try {
        await connection;
        console.log("Connected to mongoDB");
    } catch (error) {
        console.log({ msg: error.message });
    }
    console.log(`server listening on port 4500`);
});
