
const initialstate = {
    allRecipes: [],
    detailRecipe: [],
    dietsFilter:[]
}

const reducer = (state = initialstate, { type, payload }) => {

    switch (type) {
        case 'ADD_ALL_RECIPE':
            return { ...state, allRecipes: payload };

        case "ADD_DETAIL_RECIPE":
            return { ...state, detailRecipe: payload };

        case "REMOVE_DETAIL_RECIPE":
            return { ...state, detailRecipe: [] };

        case "HEALTHSCORE_ORDER_ASC":
            return { ...state, allRecipes: [...state.allRecipes].sort((a, b) => a.HC - b.HC) }

        case "HEALTHSCORE_ORDER_DES":
            return { ...state, allRecipes: [...state.allRecipes].sort((a, b) => b.HC - a.HC) }

        case "HEALTHSCORE_ORDER_ALF":
            return {
                ...state, allRecipes: [...state.allRecipes].sort((a, b) => {
                    if (a.name < b.name) { //extraemos comparamos los string 
                        return -1
                    }return 0  
                })
            }
        case "FILTER_DIETS":
            return {
                ...state, dietsFilter: payload
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