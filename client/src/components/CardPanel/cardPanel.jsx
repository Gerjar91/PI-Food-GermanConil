import { useEffect, useState } from "react";
import { addAllRecipe } from "../../Redux/actions";
import style from "./cardPanel.module.css";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Cards/card";
import { Link } from "react-router-dom";

const CardPanel = ({ numberPage }) => {
    const dispatch = useDispatch();

    let { allRecipes, dietsFilter, recipeByName } = useSelector((state) => state);
    // despachamos un actions y cargamos el estado global cuando se monta el componente 
    useEffect(() => {
        dispatch(addAllRecipe());
    }, [dispatch]);


    // estado local que controla las recetas y sus filtrados 
    const [recipes, setRecipes] = useState(allRecipes);

    useEffect(() => {
        setRecipes(allRecipes);

        //Verificar si el estado filtrado por nombre contiene elementos
        if (recipeByName.length !== 0 && !recipeByName.error) {
            setRecipes(recipeByName);
        }

        //Filtramos el estado completo por los filtros de diets si es que los hay
        if (dietsFilter.length > 0) {
            setRecipes((prevRecipes) =>
                prevRecipes.filter((recipe) =>
                    dietsFilter.every((diet) => recipe.diets.includes(diet))
                )
            );
        }
    }, [dietsFilter, recipeByName, allRecipes]);


    // fraccionar el estado en frupos de 9 items para paginarlo 
    const allRecipesPage = [];
    for (let i = 0; i < recipes.length; i += 9) {
        const array = recipes.slice(i, i + 9);
        allRecipesPage.push(array);
    }
    
    if (recipes.length === 0 || recipeByName.error) {
        return (
            <div className={style.message}>
                <h2>UUPS!!!!</h2>
                <h2>(❌) (❌) (❌)</h2>
                <h3>
                    No recipes found for the selected diet combination or recipes
                </h3>
                <img
                    src="https://www.nicepng.com/png/full/41-416284_doh-homer-simpson-quotes-on-quotestopics-homer-simpson.png"
                    alt=""
                />
            </div>
        );
    }
    return (
        <div className={style.containerCards}>
            {allRecipesPage[numberPage].map((recipe) => (
                <Link className={style.link} to={`/detailPage/${recipe.id}`} key={recipe.id}>
                    <Card
                        name={recipe.name}
                        image={recipe.image}
                        diets={recipe.diets}
                        HS={recipe.HS}
                    />
                </Link>
            ))}
        </div>
    );
};

export default CardPanel;
