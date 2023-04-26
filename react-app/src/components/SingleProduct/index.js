import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { retrieveProduct } from "../../store/product"

export default function SingleProduct(){
    const {product_id} = useParams()
    const dispatch = useDispatch()
    const product = useSelector(state => state.products.product)

    useEffect(() => {
        dispatch(retrieveProduct(product_id))
    }, [dispatch])

    if(!product){
        return
    }

    console.log(product_id)
    return(
        <div>
            <h1>{product.name}</h1>
            <div>
                {product.images?.map(image => (
                    <img src={image.image_url}/>
                ))}
            </div>
            <div>{product.condition?.condition}</div>
            <div>{product.category?.category}</div>
            <div>$ {product.price}</div>
            <dv>{product.description}</dv>

        </div>
    )
}