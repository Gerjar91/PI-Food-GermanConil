import { useDispatch, useSelector } from "react-redux";
import { addDetailRecipe, removeDetailRecipe } from "../../Redux/actions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import style from "./detailPage.module.css";

const DetailPage = () => {
  let { id } = useParams(); // Por params el id de la card 

  // Despachamos una acción para cargar el estado global con el detalle
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addDetailRecipe(id));
    return () => {
      dispatch(removeDetailRecipe()); // Reseteamos el estado de detalles
    };
  }, [dispatch, id]);

  // Extraemos del estado global el detalle de la receta
  const detailRecipe = useSelector((state) => state.detailRecipe);



  // renderizar los steps 
  const stepsElements = []
  if (detailRecipe.steps) {
    for (const key in detailRecipe.steps[0]) {
      stepsElements.push(
        <div key={key} className={style.step}>
          <p className={style.stepNumber}>{`STEP Nº: ${key}`}</p>
          <h5>{detailRecipe.steps[0][key]}</h5>
        </div>
      );
    }
  }





  return (
    <div className={style.container}>
      <div className={style.summary}>
        <h1 >{detailRecipe.name || detailRecipe.title}</h1>
        {!detailRecipe.image ? <div className={style.loanding}>Loanding....</div> :

          <img src={detailRecipe.image} alt={detailRecipe.name} />
        }
        <h3>{detailRecipe?.summary}</h3>
        <h2>HS {detailRecipe.healthScore}</h2>
      </div>
      <div className={style.diets}>
        <h4>    DIETS: </h4>
        {detailRecipe.diets?.map((el, index) => (
          <li key={index}> #{el}</li>
        ))}
      </div>
      <div className={style.containersteps}>
        {stepsElements}
      </div>
    </div>
  );
};

export default DetailPage;
