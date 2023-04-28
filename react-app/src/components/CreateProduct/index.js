import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { retrieveUserEvents } from "../../store/event"


export default function CreateProduct() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [event, setEvent] = useState('')
    const [condition, setCondition] = useState('')
    const [category, setCategory] = useState('')
    const [errors, setErrors] = useState([])
    const userEvents = useSelector(state => state.event.userEvents)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(retrieveUserEvents())
    }, [dispatch])

    const labelTitle = 'label-title'
    const errMessage = 'error-message'
    return (
        <div>
            <h1>Create New Product:</h1>
            <form className="product-form">
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
                        <div>Event:</div>
                        {errors.name && <div className={errMessage}>{errors.name}</div>}
                    </div>
                    <select
                        value={event}
                        onChange={e => setEvent(e.target.value)}
                    // required
                    >
                        <option>--- Please Select an Event If Applicable---</option>
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
            </form>
        </div>
    )
}