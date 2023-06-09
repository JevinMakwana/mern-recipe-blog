import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useGetUserId } from "../hooks/useGetUserId.js";
import { useCookies } from 'react-cookie';

export function Home(){
    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [cookies, _] = useCookies(["access_token"]);
    
    const userId = useGetUserId();
    useEffect(()=>{
      const fetchRecipe = async ()=>{
          try{
              const response = await axios.get("http://localhost:3001/recipes");
              setRecipes(response.data);
          }catch(err){
              console.error(err);
          }
      };

      const fetchSavedRecipes = async()=> {
          try{
              const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userId}`);
              setSavedRecipes(response.data.savedRecipes);
          }catch(err){
              console.error(err);
          }
      };
      fetchRecipe();
      if(cookies.access_token)
        fetchSavedRecipes();
    }, []);

    const saveRecipe = async (recipeId)=>{
        try{
            const response = await axios.put("http://localhost:3001/recipes", { 
            //   recipeId: {recipeId}, 
            //   userId: {userId}
              recipeId,
              userId,
            }, {headers: {authorization: cookies.access_token}}); 
            setSavedRecipes(response.data.savedRecipes);
        }catch(err){
            console.error(err);
        }
    };   
    
    // const isRecipeSaved = (id)=> savedRecipes.includes(id);
    const isRecipeSaved = (id) => savedRecipes.includes(id);
    return(
        <div className='main-crolling-div'>
            <h1>Recipes</h1>
            <ul>
                {recipes.map((recipe) => (
                    <li className='main-card' key={recipe._id}>
                        <div >
                            <h2>{recipe.name}</h2>
                            <button  className='card-button'
                              onClick={() => {
                                saveRecipe(recipe._id);
                              }}
                              disabled={isRecipeSaved(recipe._id)}
                            > 
                            {isRecipeSaved(recipe._id)? "saved" : "save"}
                            </button>
                        </div>

                        <div >
                          <p className='instructions'>{recipe.instructions}</p>
                        </div>

                        <img src={recipe.imageUrl} alt={recipe.name} />

                        <p style={{ fontSize: "15px", fontWeight: "500", color:"rgba(119, 119, 119, 0.7)" }}>Cooking Time: {recipe.cookingTime}min</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}