import express, { Request, Response, json } from "express";
import bodyParser from "body-parser";
import fs from "fs"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { checkAuth } from "./auth";
import cookieParser from "cookie-parser"

const data = express();
const Port = 4000;
data.use(express.static("pubilc"));
data.use(bodyParser.urlencoded({extended: true}))
data.use(cookieParser())

interface User {
    email: string
    password: string
}
let users:User[] = [];

try{
    users = JSON.parse(fs.readFileSync("./data/user.json", "utf-8"))
}catch(err){
    users = [];
}

data.post("/singup", (req,res) => {
    const {email, password} = req.body;

    //Validation
    if(!email || !password) {
        return res.status(400).send("Email and Password are require")
    }

    //Hash password using brcyptjs
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    
    const newUser = {email, password: hash};
    users.push(newUser)

    //Save the update the user list to users.json
    fs.writeFileSync("./data/user.json", JSON.stringify(users, null, 2))
    res.status(201).send("User register is sucessfully")
})

data.post("/singin", (req, res) => {
 const {email, password} = req.body;
 
 if(!email || !password){
    return res.status(400).send("Email and Password are required")
 };

 const user = users.find((user) => user.email === email);
 
 if(!user){
   return res.status(401).send("User is not found");
 }

 const passwordMatch = bcrypt.compareSync(password, user.password);

 if(!passwordMatch){
    res.status(401).send("Password is incorrent")
 }
 
 const token = jwt.sign({email}, "secretKey", {expiresIn: "1hr"});
 
 res.cookie("token", token)
 res.redirect("/")
 
});

data.post("/logout",(req: Request, res: Response)=> {
    res.clearCookie("token");
    res.redirect("/singin.html")
})

data.get("/data",checkAuth,(req: Request,res: Response)=>{
    res.sendFile(__dirname + "/data/user.json");
})

const server = data.listen(Port, ()=>console.log(`Server is listening on ${Port}`))