import React, { useState } from "react";
import styles from "./formRecipe.module.css";
import axios from "axios";




//FUNCION PARA REALIZAR VALIDACIONES 
export function validate(input) {
    let errors = {}
    //validaciones de nombre 
    if (input.name.length < 5) { errors.name = "complete con un nombre" }
    if (input.summary.length < 10) { errors.summary = "complete con un resumen" }
    if (input.hs < 1 || input.hs > 100) { errors.hs = "complete con un hs de 1 a 100 " }
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
        steps: []


    })
    let [error, setError] = useState({
        name: "",
        summary: "",
        hs: "",
        image: "",
        diets: [],
        numbersteps: "",
        steps: []

    })

    /* FUNCION PARA ENVIA EN TIEMPO REAL LOS VALORES A LOS ESTADOS  ------------------------- */

    let handleChange = (event) => {
        setInput(
            {
                ...input,
                [event.target.name]: event.target.value,
            })
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
        console.log(event.target.name);
    }
    console.log(input);

    const handleSubmit = async (event) => {
        event.preventDefault()
        const { name, summary, image, hs, diets, steps } = input;
        const URL = 'http://localhost:3001/recipe/';
        await axios.post(URL, {
            name,
            summary,
            hs,
            image,
            diets,
            steps:[steps]
        })
    }

    return (


        <div className={styles.container}>
            <div className={styles.recipeForm}>
                <h1 className={styles.formTitle}>Crear nueva receta</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className={styles.formGroup}>
                            <label >NAME</label>
                            <input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={handleChange}
                                placeholder='write name...'
                                className={styles.input} />
                        </div>
                        <div className={styles.formGroup}>
                            <label >SUMMARY</label>
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
                            <label >HEALTH SCORE</label>
                            <input
                                type="number"
                                name="hs"
                                value={input.hs}
                                onChange={handleChange}
                                placeholder='write HS...'
                                className={styles.input} />

                        </div>

                    </div>
                    <div>
                        <div className={styles.formGroup}>
                            <label >IMAGE</label>
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
                            <label >STEPS</label>
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
                                    for (let i = 0; i < input.numbersteps; i++) {
                                        steps.push(
                                            <div style={{ marginTop: "5px" }}>
                                                <label>Step {i + 1}</label>
                                                <input
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
                                })()
                            }
                        </div>



                    </div>
                    <button type="submit" className={styles.submitButton}>Crear Receta</button>



                </form>
            </div>
        </div>

    );
};

export default FormRecipe;

