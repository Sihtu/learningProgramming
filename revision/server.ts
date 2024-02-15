import http from "http";
import fs from "fs";
import { menu } from "./type";
import { json } from "stream/consumers";
import { nanoid } from "nanoid";
const menus: menu[] = [];

const server = http.createServer((req,res) => {
   const url = req.url;
   
   const method = req.method;
   if(url === "/"){
    const data = fs.readFileSync("index.html")
    res.write(data)
    res.end();
   }else if(url === "/server.js"){
    const data = fs.readFileSync("server.js");
    res.write(data)
    res.end()
   }else if (url.includes("/menu")){
    switch(method){
        case "GET":
            res.write(JSON.stringify(menus));
            res.end()
            break;
        case "PUT":
            break
         case "POST":
            let data ="";
            req.on("data",(chunk)=>{
                data += chunk
            })
            req.on("end", ()=>{
                const menu = JSON.parse(data);
                menu.id = nanoid();
                menus.push(menu);
                console.log(menus)
                res.write(JSON.stringify(menus))
                res.end()
            })
           break
        case "DELETE":
            console.log(url)
            break
    }
   }
})
server.listen(3000, () => console.log("sever is listening on port 3000"))