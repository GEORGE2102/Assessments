import express from "express";
import { User } from "./models/user.js";
import { generateToken } from "./lib/utils.js";
import * as dotenv from "dotenv";
import passport from "passport";
import blogsRouter from "./routes/blog.js";
import connectToDB from "./lib/db.js";

dotenv.config();
import "./lib/passport.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(passport.initialize());
app.use("/api", passport.authenticate("jwt", { session: false }), blogsRouter);

connectToDB();

app.post("/register", async (req, res, next) => {
  try {
    const user = await User.create({ ...req.body });
    return res.json({ user });
  } catch (error) {
    console.error(error);
  }
});

// Login
app.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    const token = generateToken(req.user);
    res.json({ user: req.user, token });
  },
);

app.listen(port, () => {
  console.log(`Server listerning on http://localhost:${port}`);
});
