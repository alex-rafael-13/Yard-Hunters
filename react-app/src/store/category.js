const GET_ALL = "categories/GET_ALL"

const setAllCategories = (categories) => {
    return {
        categories,
        type: GET_ALL
    }
}

export const retrieveAllCategories = () => async dispatch => {
    const response = await fetch('/api/products/categories', {
        headers: {
            "Content-Type": "application/json"
        }
    })

    const data = await response.json()
    dispatch(setAllCategories(data))
}

const initState = {categories: []}
export default function reducer(state=initState, action){
    let newState = initState
    switch(action.type){
        case GET_ALL:
            newState = {...state}
            newState['categories'] = action.categories
            return newState
        default:
            return state
    }
}