import express from "express";
import bcrypt from "bcryptjs";
import fs from "fs";
import cors from "cors";
import exp from "constants";
import bordyParser from "body-parser";
import jwt from "jsonwebtoken";

const PORT = 5000;
const server = express();
server.use(express.json());
server.use(cors());
server.use(bordyParser.urlencoded({ extended: true }));

interface User {
  email: string;
  password: string;
}

let user: User[] = [];
try {
  user = JSON.parse(fs.readFileSync("./data/user.json", "utf-8"));
} catch (err) {
  user = [];
}

interface Menu{
  name: string
  price: number
}
const menu:Menu[] = []

server.post("/register", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).send("Email or Password is required");
  }
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  const newUser = { email: email, password: hashPassword };
  user.push(newUser);
  fs.writeFileSync("./data/user.js", JSON.stringify(user));
  res.send({ email });
});

server.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).send("Email or Password are Required");
  }

  console.log(email);
  const compareUser: any = user.find((olduser) => olduser.email === email);
  if (!compareUser) {
    console.log(compareUser);
    return res.status(401).send("Email is Wrong");
  }

  const passwordMatch = bcrypt.compareSync(password, compareUser.password);
  if (!passwordMatch) {
    res.status(401).send("Password is Wrong");
  }
  const token = jwt.sign({ email }, "SecretKey", { expiresIn: "1hr" });
  res.send({ token });
  console.log(token);
});

server.post("/menu",(req,res) => {
  const {name,price}= req.body
  if(!name || !price){
    res.status(401).send("Name or Price is required")
  }

  menu.push({name, price})
  console.log(menu)
  res.status(201).send({menu})
})

server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
