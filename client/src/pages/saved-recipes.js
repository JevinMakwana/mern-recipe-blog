import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useGetUserId } from "../hooks/useGetUserId.js";

export function SavedRecipes(){
    const [recipes, setSavedRecipes] = useState([]);
    const userId = useGetUserId();

    useEffect(()=>{
      const fetchSavedRecipes = async()=> {
          try{
              const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userId}`);
              setSavedRecipes(response.data.savedRecipes);
          }catch(err){
              console.error(err);
          }
      };
      fetchSavedRecipes();
    });
    

    return(
        <div className='main-crolling-div'>
            <h1>Saved Recipes</h1>
            <ul>
                {  recipes.map((recipe) => (
                    <li className='main-card' key={recipe._id}>
                        <div>
                            <h2>{recipe.name}</h2>
                        </div>

                        <div>
                          <p className='instructions'>{recipe.instructions}</p>
                        </div>

                        <img src={recipe.imageUrl} alt={recipe.name} />

                        <p style={{ fontSize: "15px", fontWeight: "500", color:"rgba(119, 119, 119, 0.7)" }}>Cooking Time: {recipe.cookingTime} (minutes)</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}