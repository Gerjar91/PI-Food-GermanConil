import React, { useState } from "react";
import styles from "./formRecipe.module.css";

const FormRecipe = () => {
    const [recipeData, setRecipeData] = useState({
        name: "",
        ingredients: "",
        summary: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRecipeData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Lógica para enviar los datos de la receta
        console.log(recipeData);
        // Restablecer los campos del formulario
        setRecipeData({ name: "", ingredients: "", summary: "" });
    };

    return (
        <div className={styles.container}>
            <div className={styles.recipeForm}>
                <h1 className={styles.formTitle}>Crear nueva receta</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className={styles.formGroup}>
                            <label >NAME</label>
                            <input
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label >SUMMARY</label>
                            <textarea
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label >HEALTH SCORE</label>
                            <input
                                value={recipeData.ingredients}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>
                    </div>
                    <div>
                        <div className={styles.formGroup}>
                            <label >STEPS</label>
                            <textarea
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>
                    </div>
                    <div>
<h2>Select diets</h2>
                        <div className={styles.inputGroup}>
                            <input type="checkbox" value="option1" /> Vegan
                            <input type="checkbox" value="option2" /> Vegetaria
                            <input type="checkbox" value="option3" /> Omnivoro
                            <input type="checkbox" value="option4" /> Ovo vegan
                            <input type="checkbox" value="option1" /> Vegan
                            <input type="checkbox" value="option2" /> Vegetaria
                            <input type="checkbox" value="option3" /> Omnivoro
                            <input type="checkbox" value="option4" /> Ovo vegan
                        </div>
                    <button type="submit" className={styles.submitButton}>Crear Receta</button>
                    </div>



                </form>
            </div>
        </div>

    );
};

export default FormRecipe;
