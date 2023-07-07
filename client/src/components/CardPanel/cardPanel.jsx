import react from "react"
import style from "./cardPanel.module.css"
const CardPanel = () => {
    return (

            <div className={style.containerCards}>
                <div className={style.card}>
                    <h2>Name:</h2>
                    <h3>Diets: </h3>
                </div>
                <div className={style.card}>
                    <h2>Name:</h2>
                    <h3>Diets: </h3>
                </div>
                <div className={style.card}>
                    <h2>Name:</h2>
                    <h3>Diets: </h3>
                </div>
                
            </div>
       
    )
}

export default CardPanel