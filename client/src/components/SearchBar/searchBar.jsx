import React from "react";
import { Link } from "react-router-dom";
import style from "./serachBar.module.css";

const SearchBar = () => {
    return (
        <div className={style.container}>
            <h2>Search recipe </h2>
            <input type="text" />
            <h2>Search for diets</h2>
            <select>
                <option value="opcion1">Ascendentes</option>
                <option value="opcion1">Descendente</option>
                <option value="opcion1">A-Z</option>
                <option value="opcion1">Diets</option>
            </select>
            <label>Create Recipe</label>
            <Link className={style.button} to="/formRecipe">Create</Link>
            <Link className={style.button} to="/">Home</Link>
        </div>
    );
};

export default SearchBar;
