import http, { IncomingMessage, ServerResponse } from "http";
import fs from "fs";
import { Menu, Menu_Catagory } from "./type";
import { stringify } from "querystring";
import { nanoid } from "nanoid";
const port = 3000;
const menus: Menu[] = [];
const menuCatagory: Menu_Catagory[] =[];
const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    
    const method = req.method
    if(url === "/"){
        const data = fs.readFileSync("index.html");
        res.write(data);
        res.end();
    }else if(url === "/server.js"){
        const data = fs.readFileSync("server.js");
        res.write(data);
        res.end();
    }else if(url.includes("/menu")){
        switch(method){
            case "GET":
                res.write(JSON.stringify(menus)); 
                res.end();
                break;
            case "PUT":
                break;
            case "POST":
                let data = "";
                req.on("data", (chunk) => {
                    data += chunk;
                })
                req.on("end", () => {
                   const menu = JSON.parse(data);
                   menu.id = nanoid()
                   menus.push(menu);
                   console.log(menus)
                   res.write(JSON.stringify(menus));
                    res.end()
                })
                break;
            case "DELETE":
                console.log(url);
                res.end();
                break;

        }

    }else if(url ==="/menu_catagory"){

    }
})
server.listen(port, () => console.log(`server is listening : ${port}`))