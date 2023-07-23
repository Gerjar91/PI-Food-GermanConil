
const initialstate = {
    allRecipes: [],
    detailRecipe: [],
    dietsFilter: [],
    recipeByName: [],
    orderFilter:[]
}

const reducer = (state = initialstate, { type, payload }) => {

    switch (type) {
        case 'ADD_ALL_RECIPE':
            return { ...state, allRecipes: payload };

        case "ADD_DETAIL_RECIPE":
            return { ...state, detailRecipe: payload };

        case "CLEAR_SEARCH":
            return { ...state, recipeByName: [] };

        case "REMOVE_DETAIL_RECIPE":
            return { ...state, detailRecipe: [] };

        case "FILTER_DIETS":
            return {
                ...state, dietsFilter: payload
            }
        case "ORDER_RECIPES":
            return {
                ...state, orderFilter: payload
            }
        case "RECIPES_BY_NAME":
            return {
                ...state, recipeByName: payload
            }
        default:
            return state;
    }
}
export default reducer;


