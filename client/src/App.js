import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/navbar";
import { Auth } from "./pages/auth";
import { CreateRecipe } from "./pages/create-recipe";
import { Home } from "./pages/home";
import { SavedRecipes } from "./pages/saved-recipes";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;



// import "./App.css";
// // import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Home } from "./pages/home.js";
// import { Auth } from "./pages/auth.js";
// import { CreateRecipe } from "./pages/create-recipe"; 
// import { SavedRecipes } from "./pages/saved-recipe";
// import { Navbar } from "./components/navbar.js";

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />}/>
//           <Route path="/auth" element={<Auth />}/>
//           <Route path="/create-recipe" element={<CreateRecipe />}/>
//           <Route path="/saved-recipe" element={<SavedRecipes />}/>
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;