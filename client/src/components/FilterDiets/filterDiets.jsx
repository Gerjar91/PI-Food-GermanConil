import { useDispatch, useSelector } from "react-redux";
import style from "./filterDiets.module.css";
import { dietsFilter } from "../../Redux/actions";

const FilterDiets = () => {

  //traemos el estado global de filtros 
  const check = useSelector((state) => state.dietsFilter)
  const dispatch = useDispatch()

  // cada ves que se seleccione un filtro lo despachamos con la action 
  let setCheck = (newFilter) => dispatch(dietsFilter(newFilter));

  // controlamos el input , por cada elemento que se marca o desmarca lo agregamos o filtramos
  const handlerDiets = (event) => {
    if (!check.includes(event.target.value) && event.target.value !== "") {
      let newFilter = [...check, event.target.value]
      setCheck(newFilter); // ejecutamos la funcion copiando los filtros anteriores y los nuevos 
    } else {
      const filteredList = check.filter((item) => item !== event.target.value)
      setCheck(filteredList);
    }
  };

  return (
    <div className={style.container}>
      <h3>TYPES OF DIETS...</h3>
      <div>
        <input
          type="checkbox"
          value="vegan"
          onChange={handlerDiets}
          checked={check.includes("vegan")}
        />
        <label>VEGAN</label>
      </div>
      <div>
        <input
          type="checkbox"
          value="gluten free"
          onChange={handlerDiets}
          checked={check.includes("gluten free")}
        />
        <label>GLUTEN FREE</label>
      </div>
      <div>
        <input
          type="checkbox"
          value="ketogenic"
          onChange={handlerDiets}
          checked={check.includes("ketogenic")}
        />
        <label>KETOGENIC</label>
      </div>
      <div>
        <input
          type="checkbox"
          value="lacto vegetarian"
          onChange={handlerDiets}
          checked={check.includes("lacto vegetarian")}
        />
        <label>LACTO-VEGETARIAN</label>
      </div>
      <div>
        <input
          type="checkbox"
          value="ovo vegetarian"
          onChange={handlerDiets}
          checked={check.includes("ovo vegetarian")}
        />
        <label>OVO-VEGETARIAN</label>
      </div>
      <div>
        <input
          type="checkbox"
          value="pescetarian"
          onChange={handlerDiets}
          checked={check.includes("pescetarian")}
        />
        <label>PESCETARIAN</label>
      </div>
      <div>
        <input
          type="checkbox"
          value="paleo"
          onChange={handlerDiets}
          checked={check.includes("paleo")}
        />
        <label>PALEO</label>
      </div>
      <div>
        <input
          type="checkbox"
          value="primal"
          onChange={handlerDiets}
          checked={check.includes("primal")}
        />
        <label>PRIMAL</label>
      </div>
      <div>
        <input
          type="checkbox"
          value="dairy free"
          onChange={handlerDiets}
          checked={check.includes("dairy free")}
        />
        <label>DAIRY FREE</label>
      </div>
      <div>
        <input
          type="checkbox"
          value="whole 30"
          onChange={handlerDiets}
          checked={check.includes("whole 30")}
        />
        <label>WHOLE 30</label>
      </div>
      <div>
        <input
          type="checkbox"
          value="lacto ovo vegetarian"
          onChange={handlerDiets}
          checked={check.includes("lacto ovo vegetarian")}
        />
        <label>LACTO OVO</label>
      </div>
    </div>
  );
};

export default FilterDiets;
