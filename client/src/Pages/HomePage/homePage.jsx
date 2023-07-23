import style from "./homePage.module.css";
import CardPanel from "../../components/CardPanel/cardPanel";
import FilterDiets from "../../components/FilterDiets/filterDiets";
import axios from "axios"

const HomePage = () => {

    //  cargar todas las dietas de la api en la BD
    const endpoint = `http://localhost:3001/diets`;
    let diets = async () => { await axios(endpoint) }
    diets()


    return (
        <div>
            <div className={style.container}>
                <div className={style.containerCard}>
                    <CardPanel />
                    <FilterDiets />
                </div>
                <div className={style.footer}>
                    <div className={style.footerLeft}>
                        <h3>Sobre Cook-SPA</h3>
                        <p>
                            Nuestra misión es hacer que la cocina diaria sea divertida.
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
