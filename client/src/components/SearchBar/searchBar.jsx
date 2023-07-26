import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import style from "./serachBar.module.css";
import {  recipesByName, clearSearch, orderRecipes } from "../../Redux/actions";
import { useDispatch } from "react-redux";

const SearchBar = () => {

    const dispatch = useDispatch()

    //Estado local que almacena el input
    const [inputValue, setInputValue] = useState([])

    //cargamos el estado con lo que entra en el input 
    const handlerInput = (event) => {
        setInputValue(event.target.value)
        handlerSearch()
    }
    //despachamos la actions con el nombre al dar click 
    const handlerSearch = () => {
        dispatch(recipesByName(inputValue))
    }
    // borramos el estado que filtra con nombre para traer todas las recetas nuevamente 
    const clear = () => {
        dispatch(clearSearch())
        setInputValue("")
    }

    // Lógica para condicionar la renderización del elemento de búsqueda
    const location = useLocation();
    const disableSearch = location.pathname !== "/homePage";


    // Ordenar recetas en funcion de la option seleccionada despachamos la action adecuada 

    const handlerOptions = (event) => {
        dispatch(orderRecipes(event.target.value))
    }




    return (
        <div className={style.container}>
            <div>
                <p>SEARCH RECIPE  🔍︎</p>
                <input type="text" value={inputValue} onChange={handlerInput} placeholder="Search recipe..." disabled={disableSearch} />
                <button onClick={handlerSearch} disabled={inputValue.length < 3 || disableSearch} >Send</button>
                <button onClick={clear} disabled={inputValue.length === 0} >Clear</button>
            </div>
            <div>
                <p>ORDER RECIPES</p> {/* filtrar por recetas */}
                <select onChange={handlerOptions} disabled={disableSearch}>
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
            <Link className={style.button} to="/homePage" >Home</Link>
        </div>
    );
};

export default SearchBar;
