import express from "express";
import mongoose from "mongoose";
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";

const router = express.Router();

router.get("/", async (req, res)=> {
    try{
        const responce = await RecipeModel.find({});//all things of recipeModel will be assigned to variable responce 
        res.json(responce);
    }catch(err){
        res.json(err);
    }
});

router.post("/", verifyToken, async (req, res)=> {
    const recipe = new RecipeModel(req.body);
    try{
        const responce = await recipe.save();
        res.json(recipe);
    }catch(err){
        res.json(err);
    }
});

router.put("/", verifyToken, async (req, res)=> {
    try{
        const recipe = await RecipeModel.findById(req.body.recipeId);
        const user = await UserModel.findById(req.body.userId);
        user.savedRecipes.push(recipe);
        await user.save();
        res.json({savedRecipes: user.savedRecipes});
    }catch(err){
        res.json(err);
    }
});


router.get("/savedRecipes/ids/:userId", async (req,res) => {
    try{
        const user = await UserModel.findById(req.params.userId);
        res.json({savedRecipes : user?.savedRecipes});
    }catch(err){
        res.json(err);
    }
})
 
router.get("/savedRecipes/:userId", async (req,res) => {
    try{
        const user = await UserModel.findById(req.params.userId);
        const savedRecipes = await RecipeModel.find({
            _id: {$in : user.savedRecipes}
        });
        res.json({savedRecipes});
    }catch(err){
        res.json(err);
    }
})

export{ router as recipesRouter}