import style from "./card.module.css"

const Card = ({ name, image, diets, HS }) => {
    return (
        <div className={style.card}>
            <img src={image} alt={name} />
            <div className={style.title}>
                <h2>{name}</h2>
            </div>

            <div className={style.container}>
                <div className={style.containerdiets}>
                    {diets.map((el, index) => {
                        return <li key={index}>{el}</li>
                    })}
                </div>
                <div  className={style.hs}>
                    <h3>HS: {HS}</h3>
                </div>
            </div>


        </div>

    )

}
export default Card

