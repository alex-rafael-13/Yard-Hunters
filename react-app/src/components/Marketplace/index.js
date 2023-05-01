import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { retrieveAllProducts } from "../../store/product"
import ProductCard from "./productCard"
import './products.css'

export default function Marketplace(){
    const products = useSelector(state => state.products.products)
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        dispatch(retrieveAllProducts()).then(() => setLoaded(true))
    }, [dispatch])

    return (
        <div className="product-list">
            {loaded &&
            <>
            {products.map(product => (
                <ProductCard product={product} key={product.id}/>
            ))}
            </>
            }
        </div>
    )
}