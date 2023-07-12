
import { useDispatch } from "react-redux"
import style from "./filterDiets.module.css"
import { dietsFilter } from "../../Redux/actions"
import { useEffect, useState } from "react"


const FilterDiets = () => {
    const [check, setcheck] = useState([])
    
    const handlerDiets = (event) => {
        if (!check.includes(event.target.value) && event.target.value !== "") {
            setcheck([...check, event.target.value])
        } else { // si se vuelve a seleccionar la eliminamos de la lista 
            setcheck((prevCheck) => prevCheck.filter((item) => item !== event.target.value));
        }

    }
    //controlamos la actualizacion del estado Check y despachamos la action
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(dietsFilter(check));
    }, [check]);

    return (
        <div className={style.container}>
            <h3>TYPES OF DIETS</h3>
            <div>
                <input type="checkbox" value="vegan" onChange={handlerDiets} checked={check.includes("vegan")} />
                <label >VEGAN</label>
            </div>
            <div>
                <input type="checkbox" value="gluten free" onChange={handlerDiets} checked={check.includes("gluten free")} />
                <label >GLUTEN FREE</label>
            </div>
            <div>
                <input type="checkbox" value="ketogenic" onChange={handlerDiets} checked={check.includes("ketogenic")} />
                <label >KETOGENIC</label>
            </div>
            <div>
                <input type="checkbox" value="lacto vegetarian" onChange={handlerDiets} checked={check.includes("lacto vegetarian")} />
                <label >LACTO-VEGETARIAN</label>
            </div>
            <div>
                <input type="checkbox" value="ovo vegetarian" onChange={handlerDiets} checked={check.includes("ovo vegetarian")} />
                <label >OVO-VEGETARIAN</label>
            </div>
            <div>
                <input type="checkbox" value="pescetarian" onChange={handlerDiets} checked={check.includes("pescetarian")} />
                <label >PESCETARIAN</label>
            </div>
            <div>
                <input type="checkbox" value="paleo" onChange={handlerDiets} checked={check.includes("paleo")} />
                <label >PALEO</label>
            </div>
            <div>
                <input type="checkbox" value="primal" onChange={handlerDiets} checked={check.includes("primal")} />
                <label >PRIMAL</label>
            </div>
            <div>
                <input type="checkbox" value="dairy free" onChange={handlerDiets} checked={check.includes("dairy free")} />
                <label >DAIRY FREE</label>
            </div>
            <div>
                <input type="checkbox" value="whole 30" onChange={handlerDiets} checked={check.includes("whole 30")} />
                <label >WHOLE 30</label>
            </div>
            <div>
                <input type="checkbox" value="lacto ovo vegetarian" onChange={handlerDiets} checked={check.includes("lacto ovo vegetarian")} />
                <label >LACTO OVO</label>
            </div>
          

        </div>
    )
}
export default FilterDiets