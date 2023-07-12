import React from "react";
import { Link } from "react-router-dom";
import style from "./serachBar.module.css";
import { addAllRecipe, dietsFilter, hsOrderAlf, hsOrderAsc, hsOrderDes } from "../../Redux/actions";
import { useDispatch } from "react-redux";

const SearchBar = () => {

    const dispatch = useDispatch()

    // en funcion de la option seleccionada despachamos la action adecuada 
    const handlerOptions = (event) => {

        switch (event.target.value) {
            case "OrderAsc":
                return (dispatch(hsOrderAsc()))
            case "OrderDes":
                return (dispatch(hsOrderDes()))
            case "OrderAlf":
                return (dispatch(hsOrderAlf()))
            case "AllRecipes":
                return (dispatch(addAllRecipe()))
            default:
                return
        }
    }
   
    return (
        <div className={style.container}>
            <h2>Search recipe </h2>
            <input type="text" />
            <h2>Search for diets</h2>
          
            <p>ORDER RECIPES</p> {/* filtrar por recetas */}
            <select onChange={handlerOptions}>
                <option value="AllRecipes" >ALL RECIPES</option>
                <option value="OrderAsc">HS ASCENDENTE</option>
                <option value="OrderDes">HS DESCENDENTE</option>
                <option value="OrderAlf" >A-Z</option>
            </select>
            <label>Create Recipe</label>
            <Link className={style.button} to="/formRecipe">Create</Link>
            <Link className={style.button} to="/homePage">Home</Link>
        </div>
    );
};

export default SearchBar;
