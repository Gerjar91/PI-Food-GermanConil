import { useEffect } from "react";
import { addAllRecipe } from "../../Redux/actions";
import style from "./cardPanel.module.css";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Cards/card";
import { Link } from "react-router-dom";

const CardPanel = ({ page }) => {
    const dispatch = useDispatch();


    // traer el estado global 
    let { allRecipes, dietsFilter } = useSelector((state) => state);


    //Filtramos el estado completo por los filtros de diets si es que hay

    if (dietsFilter.length !== 0) {
        allRecipes = allRecipes.filter(recipe => {
            return dietsFilter.every(diet => recipe.diets.includes(diet));
        });
    }

    console.log(allRecipes);

    // despachamos un actions y cargamos el estado global cuando se monta el componente 
    useEffect(() => {
        dispatch(addAllRecipe());
    }, [dispatch]);



    // fraccionar el estado en frupos de 9 items 
    const allRecipesPage = [];
    for (let i = 0; i < allRecipes.length; i += 9) {
        const array = allRecipes.slice(i, i + 9)
        allRecipesPage.push(array)
    }

    // Verificar si el estado está cargado
    if (allRecipes.length === 0) {
        return( <div className={style.message}>
            <h2>UUPS!!!!</h2>
            <h3>No recipes found for the selected diet combination</h3>
        </div> )// Mostrar mensaje de carga 
    }
    return (

        <div className={style.containerCards} >
            {allRecipesPage[page].map(recipe =>
                <Link className={style.link} to={() => `/detailPage/${recipe.id}`}>
                    <Card
                        key={recipe.id}
                        name={recipe.name}
                        image={recipe.image}
                        diets={recipe.diets}
                        HS={recipe.HC}
                    />
                </Link>
            )}
        </div>

    );
};

export default CardPanel;
