import React, { useState } from "react";
import style from "./homePage.module.css";
import CardPanel from "../../components/CardPanel/cardPanel";
import FilterDiets from "../../components/FilterDiets/filterDiets";


const HomePage = () => {

    //Handler para manipular el paginado 
    const [numberPage, setNumberPage] = useState(0)
    const handlerPageAdvance = () => {
        setNumberPage(numberPage + 1)
    }
    const handlerPageBack = () => {
        setNumberPage(numberPage - 1)
    }
    return (
        <div>

            <div className={style.container}>
                <div className={style.containerNav}>
                    <div className={style.nav}>
                        <button onClick={handlerPageBack} disabled={numberPage === 0 ? true : false}>⇦</button>
                        <h3>{`PAGE ${numberPage}`}</h3>
                        <button
                            onClick={handlerPageAdvance}
                            disabled={numberPage === 11 ? true : false}
                        >⇨</button>
                    </div>
                    <h1>🌽 🍅 🍕 SINGLE PAGE APPLICATION ABOUT FOOD 🌽 🍅 🍕</h1>
                </div>
                <div className={style.containerCard}>
                    <CardPanel numberPage={numberPage} />
                    <FilterDiets />
                </div>
                <div className={style.footer}>
                    <div className={style.footerLeft}>
                        <h3>Sobre Cookpad</h3>
                        <p>
                            En Cookpad, nuestra misión es hacer que la cocina diaria sea divertida.
                            Creemos firmemente que cocinar es clave para que las personas, las
                            comunidades y el planeta tengan una vida más sana y más feliz. Empoderamos
                            a los que cada día cocinan desde casa en cualquier parte del mundo para
                            que entre todos nos ayudemos, compartiendo recetas y trucos de cocina.
                            Suscríbete a Premium para obtener servicios y beneficios únicos!
                        </p>
                    </div>
                    <div className={style.footerRight}>
                        <h3>Información de Contacto</h3>
                        <ul>
                            <li>Nombre: John Doe</li>
                            <li>Email: johndoe@example.com</li>
                            <li>Ubicación: Ciudad X, País Y</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default HomePage;
