

// traemos el estado completo y el estado por nombre
const getRecipes = (state) => {
    const { allRecipes, recipeByName } = state;
    if (recipeByName.length) {
        return recipeByName;
    }
    return allRecipes;
}

export const getRecipesByFilter = (state) => {
    let { dietsFilter } = state;
    const recipes = getRecipes(state); // recibe el estado completo o el estado filtrado por nombre
    return recipes.filter((recipe) =>// si tiene filtros aplicados dietsfilter se filtran los resultados 
        dietsFilter.every((diet) => recipe.diets.includes(diet))
    );
}


export const getRecipesByOrder = (state) => {
    let { orderFilter } = state;
    const recipe = getRecipesByFilter(state)
console.log(orderFilter);
    switch (orderFilter) {
        case "OrderAsc":
            const allRecipeOrderAs = recipe.sort((a, b) => a.hs - b.hs);
            return allRecipeOrderAs
        case "OrderDes":
            const allRecipeOrderDs = recipe.sort((a, b) => b.hs - a.hs);
            return allRecipeOrderDs
        case "OrderAlf":
            const allRecipeAlf = recipe.sort((a, b) => {
                if (a.name < b.name) return -1
                return 0
            })
            return allRecipeAlf
        case "AllRecipes":
            return recipe
        default:
            return recipe
    }

}
