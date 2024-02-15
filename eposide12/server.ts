import express, { Request, Response, json } from "express"
import fs from "fs"
const data = express();
data.use(express.json())
data.use(express.text())
data.use(express.urlencoded())

const port = 5000;
data.get("/",(req: Request,res: Response)=>{
    
    const data = fs.readFileSync("text.txt");
    res.send(data.toString())
})

data.post("/",(req: Request,res: Response)=>{
    const data = req.body;
    console.log(data)
    fs.writeFileSync("data.json", JSON.stringify(data))
    res.send("saved file")
    console.log(data)
   
})
data.put("/",(req: Request,res: Response)=>{
    const newData = req.body;
    const dataFromPost = JSON.parse(fs.readFileSync("data.json").toString());
    
    console.log(newData)
   const name = JSON.stringify([...dataFromPost, newData])
    fs.writeFileSync("data.json", name)
    console.log(name)
    
    res.send(req.method);
})
data.delete("/",(req: Request,res: Response)=>{
    
    res.send(req.method);
})
const server = data.listen(port, ()=> console.log(`server is listening on ${port}`))