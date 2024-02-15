import http from "http";
import fs from "fs";
const server = http.createServer((req, res) => {
    const data = fs.readFileSync("index.html");
    const object = {id: 1, name: "sithu"}
    res.writeHead(200, "okay", {"Name": "Sithu"})
    res.write(JSON.stringify(object))
    res.end();
});
server.listen(3000, ()=> console.log("name"))