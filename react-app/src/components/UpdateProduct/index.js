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
            setEvent(parsedProduct.event ? (parsedProduct.event.id): (0))
            setCondition(parsedProduct.condition.id)
            setCategory(parsedProduct.category.id)
            setDescription(parsedProduct.description)
            setLoaded(true)
        }else{
            dispatch(retrieveProduct(product_id))
            setCondition(product.condition.id)
            setCategory(product.category.id)
            setEvent(product.event ? (product.event.id) : (0))
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

        // console.log(updatedProduct)

        return dispatch(updateSingleProduct(product_id, updatedProduct))
            .then(async product => {
                // console.log(product)
                if (product.id) {
                    history.push(`/products/${product.id}`)
                }
                if (product.errors) {
                    setErrors(product.errors)
                    // console.log(errors)
                }
            })
    }

    const filloutSections = 'fillout-sections'
    const sectionDetails = 'section-details'
    const detailsTitle = 'details-title'
    const labelTitle = 'label-title'
    const errMessage = 'error-message'
    return (
        <>
        {loaded &&
        
            <div className="form-body">
                <h1>Update Product</h1>
                <form className="product-form" onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className={sectionDetails}>
                        <div className={detailsTitle}>Product Details</div>
                        <div>What are you selling? What category best describes the product? What is its condition?</div>
                    </div>
                    <label>
                        <div className={labelTitle}>
                            <div>Product Name:</div>
                            {errors.name && <div className={errMessage}>{errors.name}</div>}
                        </div>
                        <input
                            placeholder="Name of your product"
                            className="product-input"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </label>
                    <div className="category-condition">
                        <label>
                            <div className={labelTitle}>
                                <div>Category:</div>
                                {errors.category_id && <div className={errMessage}>{errors.category_id}</div>}
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
                                {errors.condition_id && <div className={errMessage}>{errors.condition_id}</div>}
                            </div>
                            <select
                                value={condition}
                                onChange={e => setCondition(e.target.value)}
                            // required
                            >
                                <option value="" disabled>--- Please Select Condition ---</option>
                                {conditions?.map(condition => (
                                    <option key={condition.id} value={condition.id}>{condition.condition}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <hr></hr>
                    <div className={sectionDetails}>
                        <div className={detailsTitle}>Set a Price for Your Product</div>
                        <div>Set a base price that best suites your product and its condition.</div>
                    </div>
                    <label>
                        <div className={labelTitle}>
                            {errors.price && <div className={errMessage}>{errors.price}</div>}
                        </div>
                        <div className="price">
                            <div>$</div>
                            <input
                                placeholder="Set price (USD)"
                                className="product-input"
                                type="text"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            // required
                            />
                        </div>
                    </label>
                    <hr></hr>
                    <div className={sectionDetails}>
                        <div className={detailsTitle}>Where is Your Product Available?</div>
                        <div>Is this product available to a certain event you are hosting?</div>
                    </div>
                    <label>
                        <div className={labelTitle}>
                            {errors.event_id && <div className={errMessage}>{errors.event_id}</div>}
                        </div>
                        <select
                            value={event}
                            onChange={e => setEvent(e.target.value)}
                        // required
                        >
                            <option disabled>--- Please Select an Event If Applicable ---</option>
                            <option selected value={0}>Online Only</option>
                            {userEvents?.map(event => (
                                <option key={event.id} value={event.id}>{event.name}</option>
                            ))}
                        </select>
                    </label>
                    <hr></hr>
                    <div className={sectionDetails}>
                        <div className={detailsTitle}>Describe Your Product</div>
                        <div>Please add any extra information the buyer might need to know. If your open to negotiate the price of your item, this is a great place to announce it!</div>
                    </div>
                    <label>
                        <div className={labelTitle}>
                            {errors.description && <div className={errMessage}>{errors.description}</div>}
                        </div>
                        <textarea
                            placeholder="Description must be between 10 and 500 characters"
                            className="product-input"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            rows='9'
                        />
                    </label>
                    <hr></hr>
                    <div className="button-cont">
                        <button type="submit">Update</button>
                    </div>
                </form>
            </div>
        }
        </>
    )
}