import React, { useState } from 'react';
import axios from 'axios';
import { useGetUserId } from '../hooks/useGetUserId.js';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';


export const CreateRecipe = () => {
    const userId = useGetUserId();
    const navigate = useNavigate();
    const [cookies, _] = useCookies(["access_token"]);
    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions:"",
        imageUrl: "",
        cookingTime: 0,
        userOwner: userId,
    });
    

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRecipe({ ...recipe, [name]: value })
    };

    const addIngredient = () => {
        setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] })
    };

    const handleIngredientChange = (event, idx) => {
        const { value } = event.target;
        const ingredients = recipe.ingredients;
        ingredients[idx] = value;
        setRecipe({ ...recipe, ingredients });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(
                "http://localhost:3001/recipes", 
                recipe, 
                // {
                //     headers: { authorization: cookies.access_token
                // },
            );
            alert("Recipe Creted!");
            navigate("/");
        } catch (err) {
            console.error(err);
        }

    }

    return (
        <div className="create-recipe">
            <h2>Create Recipe</h2>
            <form onSubmit={handleSubmit}>

                <label htmlFor="name">Name</label>
                <input className='form-ip' type="text" id="name" name="name" onChange={handleChange} />
                
                <label htmlFor="ingredients">Ingedients</label>
                {recipe.ingredients.map((ingredient, idx) => (
                    
                    <input className='form-ip form-ip-ingredient' key={idx} type="text" name="ingredients" value={ingredient}
                        onChange={(event) => handleIngredientChange(event, idx)} />
                    
                ))}
                <button className='form-btn' onClick={addIngredient} type="button">Add Ingredient</button>
                
                <label htmlFor="instructions">Instructions</label>
                <textarea className='form-ip' id='instructions' name="instructions" value={recipe.instructions} onChange={handleChange} ></textarea>

                <label htmlFor="imageUrl">Image URL</label>
                <input className='form-ip' type="text" id="imageUrl" name='imageUrl' value={recipe.imageUrl} onChange={handleChange} />

                <label htmlFor="cookingTime">Cooking Time(minutes)</label>
                <input className='form-ip' type="number" id="cookingTime" name='cookingTime' onChange={handleChange} />

                <button className='form-btn' type='submit'>Create Recipe</button>
            </form>
        </div>
    );
}
