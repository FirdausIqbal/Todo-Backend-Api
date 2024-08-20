import express from "express";
import cors from "cors";
import {init} from "./models/Sync.js";
import userRoute from "./routes/user.js";
import taskRoute from "./routes/task.js";
import authRoute from "./routes/auth.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "./middleware/strategyConfig.js";

const app = express();
const PORT = 3001;
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use(cookieParser())

app.use(session(
    {
        secret: process.env.SESSION_KEY,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            maxAge: 10 * 60 * 1000
        }
    }
));

app.use(passport.initialize());
app.use(passport.session());

init();

// USER
app.use("/user",  userRoute);

// TASK
app.use("/task", taskRoute);

// AUTH
app.use("/auth", authRoute);

app.listen(PORT, ()=>{
    console.log(`Server Running on port ${PORT}`)
})