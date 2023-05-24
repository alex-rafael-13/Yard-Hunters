import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { retrieveUserEvents } from "../../store/event"
import { retrieveAllConditions } from "../../store/condition"
import { retrieveAllCategories } from "../../store/category"
import { createProduct } from "../../store/product"
import { useHistory } from "react-router-dom"
import './createProduct.css'

export default function CreateProduct() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [event, setEvent] = useState(0)
    const [condition, setCondition] = useState('')
    const [category, setCategory] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [errors, setErrors] = useState({})
    const userEvents = useSelector(state => state.event.userEvents)
    const categories = useSelector(state => state.categories.categories)
    const conditions = useSelector(state => state.conditions.conditions)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(async () => {
        dispatch(retrieveUserEvents())
        dispatch(retrieveAllConditions())
        dispatch(retrieveAllCategories())
    }, [dispatch])


    const handleSubmit = e => {
        e.preventDefault()
        const newProduct = {
            name,
            price,
            description,
            event_id: event,
            condition_id: condition,
            category_id: category,
            preview_image: previewImage
        } 

        return dispatch(createProduct(newProduct))
            .then(async product => {
                console.log(product)
                if (product.id) {
                    history.push(`/products/${product.id}`)
                }
                if (product.errors) {
                    setErrors(product.errors)
                }
            })
    }

    const labelTitle = 'label-title'
    const errMessage = 'error-message'
    console.log(event)
    return (
        <div className="form-body">
            <h1>Create New Product</h1>
            <form className="product-form" onSubmit={handleSubmit}>
                <label>
                    <div className={labelTitle}>
                        <div>Product Name:</div>
                        {errors.name && <div className={errMessage}>{errors.name}</div>}
                    </div>
                    <input
                        className="product-input"
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
                    <div>
                        $
                        <input
                            className="product-input"
                            type="text"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        // required
                        />
                    </div>
                </label>
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
                        <option value="" disabled>--- Please Select The Condition of Your Product ---</option>
                        {conditions?.map(condition => (
                            <option key={condition.id} value={condition.id}>{condition.condition}</option>
                        ))}
                    </select>
                </label>
                <label>
                    <div className={labelTitle}>
                        <div>Event:</div>
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
                <label>
                    <div className={labelTitle}>
                        <div>Product Description:</div>
                        {errors.description && <div className={errMessage}>{errors.description}</div>}
                    </div>
                    <textarea
                        className="product-input"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        rows='9'
                    />
                </label>
                <label>
                    <div className={labelTitle}>
                        <div>Preview Image:</div>
                        {errors.preview_image && <div className={errMessage}>{errors.preview_image}</div>}
                    </div>
                    <input
                        type="text"
                        value={previewImage}
                        onChange={e => setPreviewImage(e.target.value)}
                    />
                </label>
                <div>
                    <button type="submit">Post Product</button>
                </div>
            </form>
        </div>
    )
}