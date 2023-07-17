import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import style from "./serachBar.module.css";
import { addAllRecipe, hsOrderAlf, hsOrderAsc, hsOrderDes, recipesByName } from "../../Redux/actions";
import { useDispatch } from "react-redux";

const SearchBar = () => {

    const dispatch = useDispatch()

    // buscar por nombre de receta despachar la action para llamar al endpoint 
    const [inputValue, setInputValue] = useState([])

    const handlerInput = (event) => {
        setInputValue(event.target.value)
    }
    const handlerSearch = () => {
        dispatch(recipesByName(inputValue))
        setInputValue("")
    }




    // Lógica para condicionar la renderización del elemento de búsqueda
    const location = useLocation();
    const disableSearch = location.pathname !== "/homePage";


    // Ordenar recetas en funcion de la option seleccionada despachamos la action adecuada 
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
            <div>
                <p>SEARCH RECIPE  🔍︎</p>
                <input type="text" value={inputValue} onChange={handlerInput} placeholder="Search recipe..." disabled={disableSearch}/>
                <button onClick={handlerSearch} disabled={inputValue.length < 3 || disableSearch } >Send</button>
            </div>
            <div>
                <p>ORDER RECIPES</p> {/* filtrar por recetas */}
                <select onChange={handlerOptions } disabled={disableSearch}>
                    <option value="AllRecipes" >ALL RECIPES</option>
                    <option value="OrderAsc">HS ASCENDENTE</option>
                    <option value="OrderDes">HS DESCENDENTE</option>
                    <option value="OrderAlf" >A-Z</option>
                </select>
            </div>
            <div>
                <p>CREATE RECIPE</p>
                <Link className={style.button} to="/formRecipe">Create</Link>

            </div>
            <Link className={style.button} to="/homePage">Home</Link>
        </div>
    );
};

export default SearchBar;
