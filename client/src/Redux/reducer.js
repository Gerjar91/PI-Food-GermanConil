
const initialstate = {
    allRecipes: [],
    detailRecipe: [],
    dietsFilter: [],
    recipeByName: []
}

const reducer = (state = initialstate, { type, payload }) => {

    switch (type) {
        case 'ADD_ALL_RECIPE':
            return { ...state, allRecipes: payload };

        case "ADD_DETAIL_RECIPE":
            return { ...state, detailRecipe: payload };

        case "REMOVE_DETAIL_RECIPE":
            return { ...state, detailRecipe: [] };

        case "HEALTHSCORE_ORDER_ASC": // ordenamos los estados por HS ascendente
            const allRecipeOrderAs = [...state.allRecipes].sort((a, b) => a.HS - b.HS);
            const allRecipeOrderBynameAs = [...state.recipeByName].sort((a, b) => a.HS - b.HS);
            return {
                ...state,
                allRecipes: allRecipeOrderAs,
                recipeByName: allRecipeOrderBynameAs,
            }

        case "HEALTHSCORE_ORDER_DES":// ordenamos los estados por HS descendente
            const allRecipeOrderDs = [...state.allRecipes].sort((a, b) => b.HS - a.HS);
            const allRecipeOrderByNameDs = [...state.recipeByName].sort((a, b) => b.HS - a.HS);
            return {
                ...state,
                allRecipes: allRecipeOrderDs,
                recipeByName: allRecipeOrderByNameDs,
            }


        case "HEALTHSCORE_ORDER_ALF":// ordenamos los estados por orden alfabetico
            const allRecipeAlf = [...state.allRecipes].sort((a, b) => {
                if (a.name < b.name) return -1
                return 0
            })
            const allRecipeByNameAlf = [...state.allRecipes].sort((a, b) => {
                if (a.name < b.name) return -1
                return 0
            })

            return {
                ...state,
                allRecipes: allRecipeAlf,
                recipeByName:allRecipeByNameAlf
            }
        case "FILTER_DIETS":
            return {
                ...state, dietsFilter: payload
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


/* 
let array =[
    obj1={
        name:["carlos","gustavo","rodigro"]
    },
    obj2={
        name:["fede","carla","rodigro"]
    },
    obj3={
        name:["fede","pedro","rodigro"]
    }
]

let array2 =["fede","rodrigo"] */