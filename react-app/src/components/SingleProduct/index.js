import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { retrieveProduct } from "../../store/product"
import OpenModalButton from "../OpenModalButton"
import DeleteProduct from "./DeleteProduct"

export default function SingleProduct() {
    const { product_id } = useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const product = useSelector(state => state.products.product)
    const history = useHistory()

    useEffect(() => {
        dispatch(retrieveProduct(product_id))
    }, [dispatch])

    if (!product) {
        return
    }

    const updateButton = () => {
        history.push(`/products/${product_id}/edit`)
    } 

    let preview_image = "data:image/png;base64,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"

    console.log(product_id)
    return (
        <div>
            <h1>{product.name}</h1>
            {user && user?.id === product.seller?.id &&
                <div>
                    <button onClick={updateButton}>Edit Product</button>
                    <OpenModalButton
                        buttonText='Delete Product'
                        modalComponent={<DeleteProduct />}
                        product={product}
                    />
                    <button onClick={() => { alert('Feature Coming Soon!') }}>Mark as Sold</button>
                </div>}
            <div>
                {product.images?.length ? (
                    <>
                        {product.images?.map(image => (
                            <img src={image.image_url} />
                        ))}
                    </>
                ) : (<img src={preview_image} />)}
            </div>
            <div>{product.condition?.condition}</div>
            <div>{product.category?.category}</div>
            <div>$ {product.price}</div>
            <div>{product.description}</div>
        </div>
    )
}