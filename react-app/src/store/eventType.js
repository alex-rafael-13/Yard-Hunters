const GET_ALL_TYPES = 'types/GET_ALL'

const setAllTypes = (types) => {
    return{
        types,
        type: GET_ALL_TYPES
    }
}

const retrieveTypes = () => async dispatch => {
    const response = await fetch('api/types')
}