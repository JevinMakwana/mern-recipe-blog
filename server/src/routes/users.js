import express from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/Users.js';

const router = express.Router();

router.post("/register", async (req, res) => {
    const {username, password} = req.body;

    const user = await UserModel.findOne({username});

    if(user){
        return res.json({message:"User alreday exists!"});
    }

    const hashedPass = await bcrypt.hash(password, 9);

    const newUser = new UserModel({username, password: hashedPass});
    await newUser.save(); 

    res.json({message:"New user registered successsfully"}); 

});

router.post("/login", async (req, res) =>{
    const { username, password } = req.body;
    const user = await UserModel.findOne({username});

    if(!user){
        return res.status(400).json({message: "User does not exist..."});
    }

    const isValid = await bcrypt.compare(password, user.password);//****************imp */

    if(!isValid){
        return res.status(400).json({message: "Username or Password is incorrect!"});
    }
    const token = jwt.sign({id : user._id}, "secret");
    res.json({token, userId: user._id});

});



export {router as userRouter};

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, "secret", (err)=>{
            if(err){
                res.sendStatus(403);
            }
            next();
        });
    }else{
        res.sendStatus(401);
    }
}