import style from "./card.module.css"

const Card = ({ name, image, diets, hs, id }) => {
    return (
        <div>
            <div className={style.bdd}>{typeof id === "string" ? <p >✪BD</p> : <></>}</div>
            <div className={style.card}>
                <img src={image} alt={""} />
                <div className={style.title}>
                    <h2>{name}</h2>
                </div>
                <div className={style.container}>
                    <div className={style.containerdiets}>
                        {diets?.map((el, index) => {
                            return <li key={index}>{el}</li>
                        })}
                    </div>
                    <div className={style.hs}>
                        <h3>HS:{hs}</h3>
                    </div>

                </div>
            </div>
        </div>

    )

}
export default Card

