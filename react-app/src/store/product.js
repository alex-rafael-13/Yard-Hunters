const GET_ONE = 'products/GET_ONE'

const setProduct = (product) => {
    return {
        type: GET_ONE,
        product
    }
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
        case GET_ONE:
            newState = {...state}
            newState['product'] = action.product
            return newState
        default:
            return state
    }
}