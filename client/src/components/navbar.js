import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Button } from "@mui/material";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/create-recipe">Create Recipe</Link>
       

      {!cookies.access_token ? " " : <Link to="/saved-recipes">Saved Recipes</Link> }
      {!cookies.access_token ? (
        <Link to="/auth">Login</Link>
        ) : 
        <Button color="error" variant="contained" type="button" onClick={logout}>
                Logout
            </Button>
          
      }
    </div>
  );
};
