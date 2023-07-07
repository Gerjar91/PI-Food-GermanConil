import React from "react";
import { Link } from "react-router-dom";
import style from "./homePage.module.css";
import CardPanel from "../CardPanel/cardPanel";
const HomePage = () => {
    return (

        <div>
            <div className={style.container}>
                <h4>SOME RECIPES</h4>
                <h3>MEXICAN FOOD</h3>
                <CardPanel />
                <h3>AMERICAN FOOD</h3>
                <CardPanel />
                <h3>MEXICAN FOOD</h3>
                <CardPanel />
           
                <div className={style.nav}>
                    <button>⇦</button>
                    <h3>PAGE 01</h3>
                    <button>⇨</button>
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
