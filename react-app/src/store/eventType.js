const GET_ALL_TYPES = 'types/GET_ALL'

const setAllTypes = (types) => {
    return{
        types,
        type: GET_ALL_TYPES
    }
}

export const retrieveTypes = () => async dispatch => {
    const response = await fetch('/api/types')

    if(response.ok){
        const types = await response.json()
		if (types.errors) {
			return;
		}

        dispatch(setAllTypes(types))
    }

    return response
}

const initState = {types:[]}
export default function reducer(state = initState, action){
    let newState
    
    switch(action.type){
        case GET_ALL_TYPES:
            newState = {...state}
            newState['types'] = action.types
            return newState
        default:
            return state
    }
}

