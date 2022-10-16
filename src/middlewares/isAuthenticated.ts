 import { Request, Response, NextFunction } from "express";
 import { verify } from 'jsonwebtoken';
 import authConfig from '../auth';

 export default function isAuthenticated(
        req: Request, 
        res: Response, 
        next: NextFunction
    ){
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(400).json({message: "Informe o Token JWT"})
    }
    
    const token = authHeader.split(' ')[1];
    
    try{
        const decodedToken = verify(token, authConfig.jwt.secret);
        return next();
    }catch(err){
        return res.status(400).json({message: "Token JWT inválido!"})
    }
 }
