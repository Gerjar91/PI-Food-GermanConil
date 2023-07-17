import axios from "axios"



// actions para traer todas las recetas 
export const addAllRecipe = () => {
    const endpoint = `http://localhost:3001/recipes`;
    return async function (dispatch) {
        const response = await axios.get(endpoint)
        return dispatch({
            type: 'ADD_ALL_RECIPE',
            payload: response.data,
        });
        ;
    };
};

// actions para traer el detalle de una receta 
export const addDetailRecipe = (id) => {
    const endpoint = `http://localhost:3001/recipes/${id}`;
    return async function (dispatch) {
        const response = await axios.get(endpoint)
        return dispatch({
            type: 'ADD_DETAIL_RECIPE',
            payload: response.data,
        });
        ;
    };
};

// actions para eliminar estate de detail
export const removeDetailRecipe = () => {
    return {
        type: "REMOVE_DETAIL_RECIPE",
    }
}
// actions para ORDENAR el state por HC Ascendente
export const hsOrderAsc = () => {
    return {
        type: "HEALTHSCORE_ORDER_ASC",
    }
}
// actions para ORDENAR el state por HC Descendente
export const hsOrderDes = () => {
    return {
        type: "HEALTHSCORE_ORDER_DES",
    }
}
// actions para ORDENAR el state alfabeticamente 
export const hsOrderAlf = () => {
    return {
        type: "HEALTHSCORE_ORDER_ALF",
    }
}
// actions para Filtrar por Diets
export const dietsFilter = (diets) => {
    return {
        type: "FILTER_DIETS",
        payload: diets
    }
}
// actions para traer las recetas filtradas por nombre 
export const recipesByName = (name) => {
   const endpoint = `http://localhost:3001/recipes/name?name=${name}`;
    return async function (dispatch) {
        const response = await axios.get(endpoint)
        return dispatch({
            type: 'RECIPES_BY_NAME',
            payload: response.data,
        });
        ;
    };
}
