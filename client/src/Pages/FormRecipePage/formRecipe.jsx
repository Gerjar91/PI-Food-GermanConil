import React, { useState } from "react";
import styles from "./formRecipe.module.css";
import axios from "axios";




//FUNCION PARA REALIZAR VALIDACIONES 
export function validate(input) {
    let errors = {}
    //validaciones de nombre 
    if (input.name.length < 5) { errors.name = "complete con un nombre" }
    if (input.summary.length < 10) { errors.summary = "complete con un resumen" }
    if (input.hs < 1 || input.hs > 100 || isNaN(input.hs)) { errors.hs = "complete con un HS de 1 a 100 " }
    if (input.numbersteps > 7 || isNaN(input.numbersteps)) { errors.numbersteps = "ingrese un numero del 1 al 7 " }
    if (input.diets.length < 1) { errors.diets = "selecciones una dieta " }
    if (input.image.length === 0) { errors.image = "cargue una imagen" }
    return errors
}


const FormRecipe = () => {

    /* ESTADOS LOCALES QUE CONTROLAN LO QUE SE INGRESA Y ERRORES ------------------------- */
    let [input, setInput] = useState({
        name: "",
        summary: "",
        hs: "",
        image: "",
        diets: [],
        numbersteps: "",
        steps: {}


    })
    let [error, setError] = useState({
        name: "",
        summary: "",
        hs: "",
        image: "",
        diets: "",
        numbersteps: "",
        steps: ""

    })
    console.log(error);
    console.log(input);

    /* FUNCION PARA ENVIA EN TIEMPO REAL LOS VALORES A LOS ESTADOS  ------------------------- */

    let handleChange = (event) => {
        setInput(
            {
                ...input,
                [event.target.name]: event.target.value,
            });
        setError(validate({
            ...input,
            [event.target.name]: event.target.value
        }))
    }

    let handleInputCheked = (event) => {
        if (event.target.checked) {
            setInput({
                ...input,
                diets: [...input.diets, event.target.value]
            });
            setError(validate({
                ...input,
                [event.target.name]: event.target.value
            }))
        } else {
            setInput({
                ...input,
                diets: input.diets.filter((diet) => diet !== event.target.value)
            });
        }

    }

    let handlerInputSteps = (event) => {
        let posicion = parseInt(event.target.name)
        setInput({
            ...input,
            steps: {
                ...input.steps,
                [posicion]: event.target.value, // Agrega el paso en la posición correspondiente
            },
        })
    }

    // mensaje de create
    let [recipeCreated, setRecipeCreated] = useState(false);

    //enviamos la info al front 
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { name, summary, image, hs, diets, steps } = input;
        const URL = '/recipe/';
        await axios.post(URL, {
            name,
            summary,
            hs,
            image,
            diets,
            steps
        })

        setRecipeCreated(true);

        //reseteamos los input 
        setInput({
            name: "",
            summary: "",
            hs: "",
            image: "",
            diets: [],
            numbersteps: "",
            steps: {}
        });
        setError({
            name: "",
            summary: "",
            hs: "",
            image: "",
            diets: "",
            numbersteps: "",
            steps: ""
        });
    }
    //renderizamos el form 
    const handleResetForm = () => {
        setRecipeCreated(false);

    };

    return (

        <div className={styles.container}>
            <div className={styles.recipeForm}>
                {recipeCreated ? (
                    <>
                        <p className={styles.successMessage}>The recipe has been created successfully!</p>
                        <button className={styles.buttoncreate} onClick={handleResetForm}> create new recipe  </button>
                    </>
                ) : (
                    <>
                        <h1 className={styles.formTitle}>CREATE NEW RECIPE</h1>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <div className={styles.formGroup}>
                                    <label className={error.name ? styles.label : styles.errorlabel}>
                                        {error.name ? error.name : "NAME"}</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={input.name}
                                        onChange={handleChange}
                                        placeholder='write name...'
                                        className={styles.input} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={error.summary ? styles.label : styles.errorlabel}>
                                        {error.summary ? error.summary : "SUMMARY"}</label>
                                    <textarea
                                        type="text"
                                        name="summary"
                                        value={input.summary}
                                        onChange={handleChange}
                                        placeholder='write summary...'
                                        className={styles.input}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={error.hs ? styles.label : styles.errorlabel}>
                                        {error.hs ? error.hs : "HEALT SCORE"}</label>
                                    <input
                                        type="text"
                                        name="hs"
                                        value={input.hs}
                                        onChange={handleChange}
                                        placeholder='write HS...'
                                        className={styles.input} />
                                </div>

                            </div>
                            <div>
                                <div className={styles.formGroup}>
                                    <label className={error.image ? styles.label : styles.errorlabel}>
                                        {error.image ? error.image : "IMAGE"}</label>
                                    <input
                                        type="text"
                                        name="image"
                                        value={input.image}
                                        onChange={handleChange}
                                        placeholder='input URL...'
                                        className={styles.input} />
                                </div>
                                <h2>Select diets</h2>
                                <div className={styles.inputGroup}>
                                    <input onChange={handleInputCheked} type="checkbox" name="diets" value="vegetarian" /> Vegetaria
                                    <input onChange={handleInputCheked} type="checkbox" name="diets" value="vegan" /> vegan
                                    <input onChange={handleInputCheked} type="checkbox" name="diets" value="dairy free" /> dairy free
                                    <input onChange={handleInputCheked} type="checkbox" name="diets" value="lacto ovo vegetarian" /> lacto ovo vegetarian
                                    <input onChange={handleInputCheked} type="checkbox" name="diets" value="paleolithic" /> paleolithic
                                    <input onChange={handleInputCheked} type="checkbox" name="diets" value="primal" /> primal
                                    <input onChange={handleInputCheked} type="checkbox" name="diets" value="pescatarian" /> pescatarian
                                    <input onChange={handleInputCheked} type="checkbox" name="diets" value="ketogenic" /> ketogenic
                                    <input onChange={handleInputCheked} type="checkbox" name="diets" value="fodmap friendly" /> fodmap friendly
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={error.numbersteps ? styles.label : styles.errorlabel}>
                                        {error.numbersteps ? error.numbersteps : "STEPS"}</label>

                                    <input
                                        name="numbersteps"
                                        value={input.numbersteps}
                                        onChange={handleChange}
                                        className={styles.input}
                                        placeholder='number of steps...'
                                    />
                                </div>
                            </div>

                            <div>
                                <div className={styles.formGroup}>
                                    {
                                        (() => { // funcion autoejecutable para crear inputs 
                                            const steps = [];
                                            if (input.numbersteps < 8) {
                                                for (let i = 0; i < input.numbersteps; i++) {
                                                    steps.push(
                                                        <div style={{ marginTop: "5px" }}>
                                                            <label  >Step {i + 1}</label>
                                                            <input
                                                                key={i}
                                                                type="text"
                                                                name={`${i + 1}`}
                                                                value={input[`step${i + 1}`]}
                                                                onChange={handlerInputSteps}
                                                                placeholder={`Write step ${i + 1}...`}
                                                                className={styles.input}
                                                            />
                                                        </div>
                                                    );
                                                }
                                                return steps;
                                            }
                                        })()
                                    }
                                </div>
                            </div>
                            <button type="submit" className={styles.submitButton} disabled={Object.keys(error).length > 0}>Crear Receta</button>
                        </form>


                    </>

                )}


            </div>
        </div>

    );
};

export default FormRecipe;

