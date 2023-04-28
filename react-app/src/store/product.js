const GET_ONE = 'products/GET_ONE'
const GET_ALL = 'products/GET_ALL'

const setAllProducts = (products) => {
    return {
        type: GET_ALL,
        products
    }
}

const setProduct = (product) => {
    return {
        type: GET_ONE,
        product
    }
}

export const retrieveAllProducts = () => async dispatch => {
    const response = await fetch(`/api/products`,{
        headers: {
			"Content-Type": "application/json",
		},
    })

    const data = await response.json()
    if(data.err) return
    dispatch(setAllProducts(data))
}

export const retrieveProduct = (id) => async dispatch => {
    const response = await fetch(`/api/products/${id}`,{
        headers: {
			"Content-Type": "application/json",
		},
    })

    if (response.ok) {
        const product = await response.json()
        if(DataTransfer.errors){
            return
        }

        dispatch(setProduct(product))
    }

}

const initState = {products:[], product:{}}
export default function reducer(state = initState, action){
    let newState
    switch (action.type) {
        case GET_ALL:
            newState = {...state}
            newState['products'] = action.products
            return newState
        case GET_ONE:
            newState = {...state}
            newState['product'] = action.product
            return newState
        default:
            return state
    }
}