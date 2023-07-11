import React, { useState } from "react";
import style from "./homePage.module.css";
import CardPanel from "../../components/CardPanel/cardPanel";



const HomePage = () => {

    //Handler para manipular el paginado 
    const [page, setpage] = useState(0)
    const handlerPageAdvance = () => {
        setpage(page + 1)
    }
    const handlerPageBack = () => {
        setpage(page - 1)
    }

    return (
        <div>
            <div className={style.container}>
                <h4>SOME RECIPES</h4>
                <CardPanel page={page} />
                <div className={style.nav}>
                    <button onClick={handlerPageBack} disabled={page === 0 ? true : false}>⇦</button>
                    <h3>{`PAGE ${page}`}</h3>
                    <button onClick={handlerPageAdvance} >⇨</button>
                </div>
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
                        Suscribite a Premium para obtener servicios y beneficios únicos!
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
    );
};

export default HomePage;
