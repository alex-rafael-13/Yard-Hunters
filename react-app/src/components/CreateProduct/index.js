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
    const [event, setEvent] = useState(null)
    const [condition, setCondition] = useState('')
    const [category, setCategory] = useState('')
    const [previewImage, setPreviewImage] = useState(null)
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
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', price)
        formData.append('description', description)

        if(event){
            formData.append('event_id', event)
        }
        formData.append('condition_id', condition)
        formData.append('category_id', category)
        formData.append('preview_image', previewImage)

        return dispatch(createProduct(formData))
            .then( product => {
                console.log(product)
                if (product.id) {
                    history.push(`/products/${product.id}`)
                }
                if (product.errors) {
                    setErrors(product.errors)
                }
            })
    }

    const filloutSections = 'fillout-sections'
    const sectionDetails = 'section-details'
    const detailsTitle = 'details-title'
    const labelTitle = 'label-title'
    const errMessage = 'error-message'
    console.log(previewImage)
    return (
        <div className="form-body">
            <h1>Create New Product</h1>
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
                <div className={sectionDetails}>
                    <div className={detailsTitle}>Product Images</div>
                    <div>Please include a preview image.</div>
                </div>
                <label>
                    <div className={labelTitle}>
                        <div>Preview Image:</div>
                        {errors.preview_image && <div className={errMessage}>{errors.preview_image}</div>}
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={e => setPreviewImage(e.target.files[0])}
                    />
                </label>
                <hr></hr>
                <div className="button-cont">
                    <button type="submit">Post Product</button>
                </div>
            </form>
        </div>
    )
}