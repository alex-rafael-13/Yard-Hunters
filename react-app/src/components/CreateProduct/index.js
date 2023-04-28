import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { retrieveUserEvents } from "../../store/event"
import { retrieveAllConditions } from "../../store/condition"
import { retrieveAllCategories } from "../../store/category"


export default function CreateProduct() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [event, setEvent] = useState(0)
    const [condition, setCondition] = useState('')
    const [category, setCategory] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [errors, setErrors] = useState([])
    const userEvents = useSelector(state => state.event.userEvents)
    const categories = useSelector(state => state.categories.categories)
    const conditions = useSelector(state => state.conditions.conditions)
    const dispatch = useDispatch()

    useEffect(async () => {
        dispatch(retrieveUserEvents())
        dispatch(retrieveAllConditions())
        dispatch(retrieveAllCategories())
    }, [dispatch])


    const handleSubmit = e => {
        e.preventDefault()
        const product = {
            name,
            price,
            description,
            event_id: event,
            condition_id: condition,
            category_id: category,
            previewImage
        } 

        console.log(product)
    }

    const labelTitle = 'label-title'
    const errMessage = 'error-message'
    return (
        <div>
            <h1>Create New Product:</h1>
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
                        {errors.price && <div className={errMessage}>{errors.name}</div>}
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
                        {conditions?.map(event => (
                            <option key={event.id} value={event.id}>{event.condition}</option>
                        ))}
                    </select>
                </label>
                <label>
                    <div className={labelTitle}>
                        <div>Event:</div>
                        {errors.name && <div className={errMessage}>{errors.name}</div>}
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
                        {errors.description && <div className={errMessage}>{errors.name}</div>}
                    </div>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </label>
                <label>
                    <div className={labelTitle}>
                        <div>Preview Image:</div>
                        {errors.name && <div className={errMessage}>{errors.name}</div>}
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