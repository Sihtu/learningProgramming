import express, { Request, Response, urlencoded } from "express";
import fs from "fs";


const data = express();
data.use(express.json())
data.use(urlencoded())
const Port = 4000;
data.get("/", (req:Request, res:Response)=> {
   const data = fs.readFileSync("data.json")
   console.log(JSON.parse(data.toString()))
    res.send(data.toString())
})
data.post("/", (req:Request, res:Response)=> {
    const data = req.body;
    console.log("This is data form postman",data)
    fs.writeFileSync("data.json", JSON.stringify(data));
    res.send(req.method)
})
data.put("/", (req:Request, res:Response)=> {
    const arrayData = req.body
    const data = fs.readFileSync("data.json")
    const serverData = JSON.parse(data.toString())
    const array = [...serverData, arrayData]
    console.log(array)
    res.send(req.method)
})
data.delete("/", (req:Request, res:Response)=> {
    const {name} = req.query
    const value = name as string
    console.log(value)
    fs.unlinkSync(value)
    res.send(req.method)
})
data.listen(Port, ()=> console.log(`Server is listening on ${Port}`))