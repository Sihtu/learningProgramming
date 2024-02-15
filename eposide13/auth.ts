import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const checkAuth = (req:Request, res: Response, next: NextFunction) =>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).redirect("/singin.html")
    };

    jwt.verify(token,"secretKey",(err:any)=> {
        if(err) {
            return res.status(401).send("Uncorrect");
        }

        next();
    })
}