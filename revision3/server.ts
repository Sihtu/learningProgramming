import express, { Request, Response } from "express";
import bodyParser from "body-parser"
import bcrypt from "bcryptjs"
import fs from "fs"
import jwt from "jsonwebtoken"
import { authCheck } from "./auth";
import cookieParser from "cookie-parser"

const data = express();

interface User {
    email: string
    password: string
}
let users:User[] = []

try{
    users = JSON.parse(fs.readFileSync("./data/user.json", "utf-8"))
}catch(err){
    users =[]
}

const Port = 4000;
data.use(express.static("public"));
data.use(bodyParser.urlencoded({extended: true}));
data.use(cookieParser())

data.post("/singup", (req, res)=>{
    const {email, password} = req.body;
    if(!email|| !password){
        return res.status(401).send("Email and Password are required")
    };

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = {email,password: hash};
    users.push(newUser);
    fs.writeFileSync("./data/user.json", JSON.stringify(users, null, 2))
    
    console.log(users)
    res.status(201).send("User Registor is successfully")
})

data.post("/singin", (req: Request, res: Response) => {
        const{email, password} = req.body;
        if(!email || !password){
          return  res.status(400).send("Email and Password are Require")
        };
        const user:any = users.find((user) => user.email === email);
        if(!user){
            return res.status(401).send("Email or Password are Incorrect")
        };
        
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if(!passwordMatch){
           return res.status(401).send("Password is not incorrect")
        }
        const token = jwt.sign({email}, "secretKey", {expiresIn: "1h"});
        res.cookie("token", token)
        res.redirect("/")   
});
data.post("/singout", (req: Request, res: Response) => {
    res.clearCookie("token");
    res.redirect("/singin.html")
})

data.get("/data",authCheck, (req, res)=> {
    
    res.sendFile(__dirname +"/data/user.json")
})


data.listen(Port, () => console.log(`Server is listing on ${Port}`))