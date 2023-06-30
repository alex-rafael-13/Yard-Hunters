import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { retrieveAllConditions } from "../../store/condition"
import { retrieveUserEvents } from "../../store/event"
import { retrieveAllCategories } from "../../store/category"
import {retrieveProduct, updateSingleProduct } from "../../store/product"
import { useHistory, useParams } from "react-router-dom"

export default function UpdateProduct() {
    const userEvents = useSelector(state => state.event.userEvents)
    const categories = useSelector(state => state.categories.categories)
    const conditions = useSelector(state => state.conditions.conditions)
    const product = useSelector(state => state.products.product)
    const [loaded, setLoaded] = useState(false)
    const dispatch = useDispatch()

    const [name, setName] = useState(product.name)
    const [price, setPrice] = useState(product.price)
    const [description, setDescription] = useState(product.description)
    const [event, setEvent] = useState(0)
    const [condition, setCondition] = useState('')
    const [category, setCategory] = useState('')
    const [errors, setErrors] = useState({})
    const history = useHistory()
    const {product_id} = useParams()

    useEffect(async () => {
        dispatch(retrieveUserEvents())
        dispatch(retrieveAllConditions())
        dispatch(retrieveAllCategories())
        const storedProduct = localStorage.getItem('preFilledProduct')
        if(storedProduct){
            const parsedProduct = JSON.parse(storedProduct)
            setName(parsedProduct.name)
            setPrice(parsedProduct.price)
            setEvent(parsedProduct.event.id ? (parsedProduct.event.id): (0))
            setCondition(parsedProduct.condition.id)
            setCategory(parsedProduct.category.id)
            setDescription(parsedProduct.description)
            setLoaded(true)
        }else{
            dispatch(retrieveProduct(product_id))
            setCondition(product.condition.id)
            setCategory(product.category.id)
            setLoaded(true)
            localStorage.setItem('preFilledProduct', JSON.stringify(product))
        }
    }, [dispatch])

    const handleSubmit = e => {
        e.preventDefault()
        const updatedProduct = {
            name,
            price,
            description,
            event_id: event,
            condition_id: condition,
            category_id: category,
        } 

        console.log(updatedProduct)

        return dispatch(updateSingleProduct(product_id, updatedProduct))
            .then(async product => {
                // console.log(product)
                if (product.id) {
                    history.push(`/products/${product.id}`)
                }
                if (product.errors) {
                    setErrors(product.errors)
                    console.log(errors)
                }
            })
    }

    const labelTitle = 'label-title'
    const errMessage = 'error-message'
    return (
        <>
        {loaded && 
        
        <div>
            <h1>Updates Product:</h1>
            <form className="product-form" onSubmit={handleSubmit}>
                <label>
                    <div className={labelTitle}>
                        <div>Event Name:</div>
                        {errors.name && <div className={errMessage}>{errors.name}</div>}
                    </div>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </label>
                <label>
                    <div className={labelTitle}>
                        <div>Price:</div>
                        {errors.price && <div className={errMessage}>{errors.price}</div>}
                    </div>
                    <input
                        type="text"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    // required
                    />
                </label>
                <label>
                    <div className={labelTitle}>
                        <div>Category:</div>
                        {errors.name && <div className={errMessage}>{errors.name}</div>}
                    </div>
                    <select
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    // required
                    >
                        <option value="" disabled>--- Please Select a Category ---</option>
                        {categories?.map(category => (
                            <option key={category.id} value={category.id}>{category.category}</option>
                        ))}
                    </select>
                </label>
                <label>
                    <div className={labelTitle}>
                        <div>Condition:</div>
                        {errors.name && <div className={errMessage}>{errors.name}</div>}
                    </div>
                    <select
                        value={condition}
                        onChange={e => setCondition(e.target.value)}
                    // required
                    >
                        <option value="" disabled>--- Please Select The Condition of Your Product ---</option>
                        {conditions?.map(condition => (
                            <option key={condition.id} value={condition.id}>{condition.condition}</option>
                        ))}
                    </select>
                </label>
                <label>
                    <div className={labelTitle}>
                        <div>Event:</div>
                        {/* {errors.name && <div className={errMessage}>{errors.name}</div>} */}
                    </div>
                    <select
                        value={event}
                        onChange={e => setEvent(e.target.value)}
                    // required
                    >
                        <option value="" disabled>--- Please Select an Event If Applicable ---</option>
                        <option value={0}>Online Only</option>
                        {userEvents?.map(event => (
                            <option key={event.id} value={event.id}>{event.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    <div className={labelTitle}>
                        <div>Product Description:</div>
                        {errors.description && <div className={errMessage}>{errors.description}</div>}
                    </div>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </label>
                <div>
                    <button type="submit">Post Product</button>
                </div>
            </form>
        </div>
        }
        </>
    )
}