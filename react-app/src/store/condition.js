const GET_ALL = "conditions/GET_ALL"

const setAllConditions = (conditions) => {
    return {
        conditions,
        type: GET_ALL
    }
}

export const retrieveAllConditions = () => async dispatch => {
    const response = await fetch('/api/products/conditions', {
        headers: {
            "Content-Type": "application/json"
        }
    })

    const data = await response.json()
    dispatch(setAllConditions(data))
}

const initState = {conditions: []}
export default function reducer(state=initState, action){
    let newState = initState
    switch(action.type){
        case GET_ALL:
            newState = {...state}
            newState['conditions'] = action.conditions
            return newState
        default:
            return state
    }
}