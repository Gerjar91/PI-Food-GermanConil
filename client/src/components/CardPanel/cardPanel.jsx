import { useEffect, useState } from "react";
import { addAllRecipe } from "../../Redux/actions";
import style from "./cardPanel.module.css";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Cards/card";
import { Link } from "react-router-dom";
import { getRecipesByOrder } from '../../Redux/selectors';

const CardPanel = () => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true)

    // despachamos un actions y cargamos el estado global cuando se monta el componente 
    useEffect(() => {
        dispatch(addAllRecipe())
            .then(() => {
                setLoading(false)
            })
    }, [dispatch]);


    // traemos el estado mediante un selector 
    let recipes = useSelector(getRecipesByOrder);

    // fraccionar el estado en frupos de 9 items para paginarlo 
    const allRecipesPage = [];
    for (let i = 0; i < recipes.length; i += 9) {
        const array = recipes.slice(i, i + 9);
        allRecipesPage.push(array);
    }

    //Handler para manipular el paginado 
    const [numberPage, setNumberPage] = useState(0)
    const handlerPage = (event) => {
        if (event.target.value === "adv") setNumberPage(numberPage + 1)
        else setNumberPage(numberPage - 1)
    }

    const handlerFinishPag = () => {
        let pag = allRecipesPage.length
        setNumberPage(pag - 1)
    }
    const handlerStartPag = () => {
        setNumberPage(0)
    }

    // si se modifa el estado volvemos a la pagina 1 
    useEffect(() => {
        setNumberPage(0)
    }, [recipes.length])

    // controlar el avance del paginado 
    const disableboton = {
        adv: numberPage + 1 === allRecipesPage.length, // false o true 
        back: numberPage === 0// false o true 
    };

    let { recipeByName } = useSelector((state) => state)

    if (loading) {
        return (<div className={style.loanding}></div>)
    }


    if (!recipes.length || recipeByName.error) {
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
        <div>
            <div className={style.nav}>
                <button
                    onClick={handlerStartPag}
                    value="bac"
                    disabled={disableboton.back}
                >0...</button>
                <button
                    onClick={handlerPage}
                    value="bac"
                    disabled={disableboton.back}
                >⇦</button>
                <h3>{`PAGE ${numberPage}`}</h3>
                <button
                    onClick={handlerPage}
                    disabled={disableboton.adv}
                    value="adv"
                >⇨</button>
                <button
                    onClick={handlerFinishPag}
                    disabled={disableboton.adv}
                    value="adv"
                >...{allRecipesPage.length}</button>
            </div>
            <div className={style.containerCards}>

                {allRecipesPage[numberPage]?.map((recipe) => (
                    <Link className={style.link} to={`/detailPage/${recipe.id}`} key={recipe.id}>
                        <Card
                            id={recipe.id}
                            name={recipe.name}
                            image={recipe.image}
                            diets={recipe?.diets}
                            hs={recipe.hs}
                        />
                    </Link>
                ))}

            </div>
        </div>
    );
};

export default CardPanel;
