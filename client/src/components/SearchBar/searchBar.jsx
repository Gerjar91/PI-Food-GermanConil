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
    // en funcion de la diets seleccionada despachamos la action con una lista de dietas 
    let diets = []
    const handlerDiets = (event) => {
        if (!diets.includes(event.target.value) && event.target.value !== "") {
            diets.push(event.target.value)
        } else { // si se vuelve a seleccionar la eliminamos de la lista 
            diets = diets.filter(item => item !== event.target.value)
        }
        dispatch(dietsFilter(diets))
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

            <p>SEARCH FOR DIETS</p> {/* filtrar por dietas  */}
            <select multiple onClick={handlerDiets}>
                <option value="">DIETS</option>
                <option value="gluten free" >GLUTEN FREE</option>
                <option value="ketogenic" >KETOGENIC</option>
                <option value="lacto vegetarian" >LACTO-VEGETARIAN</option>
                <option value="ovo vegetarian" >OVO-VEGETARIAN</option>
                <option value="vegan" >VEGAN</option>
                <option value="pescetarian" >PESCETARIAN</option>
                <option value="paleo" >PALEO</option>
                <option value="primal" >PRIMAL</option>
                <option value="dairy free" >DAIRY FREE</option>
                <option value="whole 30" >WHOLE 30</option>
                <option value="lacto ovo vegetarian" >LACTO OVO</option>
            </select>
            <label>Create Recipe</label>
            <Link className={style.button} to="/formRecipe">Create</Link>
            <Link className={style.button} to="/homePage">Home</Link>
        </div>
    );
};

export default SearchBar;
