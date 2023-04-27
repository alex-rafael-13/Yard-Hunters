import { useEffect, useState } from 'react'
import './CreateEvent.css'
import { useDispatch, useSelector } from 'react-redux'
import { retrieveTypes } from '../../store/eventType'
import { createEvent } from '../../store/event'
import { useHistory } from 'react-router-dom'

export default function CreateEvent() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [date, setDate] = useState('')
    const [sTime, setSTime] = useState('')
    const [eTime, setETime] = useState('')
    const [image, setImage] = useState(null)
    const [errors, setErrors] = useState({})
    

    const typesList = useSelector(state => state.types.types)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(retrieveTypes())
    }, [dispatch])

    const onSubmit = e => {
        e.preventDefault()

        console.log(typeof type)
        const event = {
            name,
            description,
            event_type_id: type,
            address,
            city,
            state,
            country,
            date,
            start_time: sTime,
            end_time: eTime,
            image_url: image
        }

        return dispatch(createEvent(event))
            .then(async story => {
                console.log(story)
                if (story.id) {
                    history.push(`/events/${story.id}`)
                }
                if (story.errors) {
                    setErrors(story.errors)
                }
            })
    }

    const labelTitle = 'label-title'
    const errMessage = 'error-message'

    return (
        <div>
            {/* {errors.map(error => (
                <div>{Object.values(error)}</div>
            ))} */}
            <h1>Create Event</h1>
            <form className='event-form' onSubmit={onSubmit}>
                <label>
                    <div className={labelTitle}>
                        <div>Event Name:</div>
                        {errors.name && <div className={errMessage}>{errors.name}</div>}
                    </div>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    // required
                    />
                </label>
                <label>
                    <div className={labelTitle}>
                        <div>Description</div>
                        {errors.description && <div className={errMessage}>{errors.description}</div>}
                    </div>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    // required
                    />
                </label>
                <label>
                    <div className={labelTitle}>
                        <div>Event Type:</div>
                        {errors.event_type_id && <div className={errMessage}>{errors.event_type_id}</div>}
                    </div>
                    <select
                        value={type}
                        onChange={e => setType(e.target.value)}
                    // required
                    >
                        <option>--- Please Select an Event Type ---</option>
                        {typesList?.map(type => (
                            <option key={type.id} value={type.id}>{type.type}</option>
                        ))}
                    </select>
                </label>
                <label>
                    <div className={labelTitle}>
                        <div>Address:</div>
                        {errors.address && <div className={errMessage}>{errors.address}</div>}
                    </div>
                    <input
                        type='text'
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    // required
                    />
                </label>
                <label>
                    <div className={labelTitle}>
                        <div>City:</div>
                        {errors.city && <div className={errMessage}>{errors.city}</div>}
                    </div>
                    <input
                        type='text'
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    // required
                    />
                </label>
                <label>
                    <div className={labelTitle}>
                        <div>State</div>
                        {errors.state && <div className={errMessage}>{errors.state}</div>}
                    </div>
                    <input
                        type='text'
                        value={state}
                        onChange={e => setState(e.target.value)}
                    // required
                    />
                </label>
                <label>
                    <div className={labelTitle}>
                        <div>Country:</div>
                        {errors.country && <div className={errMessage}>{errors.country}</div>}
                    </div>
                    <input
                        type='text'
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                    // required
                    />
                </label>
                <div className='date-time-cont'>
                    <label>
                        <div className={labelTitle}>
                            <div>Event Date:</div>
                            {errors.date && <div className={errMessage}>{errors.date}</div>}
                        </div>
                        <input
                            type='date'
                            value={date}
                            onChange={e => setDate(e.target.value)}
                        // required
                        />
                    </label>
                    <label>
                        <div className={labelTitle}>
                            <div>Start Time:</div>
                            {errors.start_time && <div className={errMessage}>{errors.start_time}</div>}
                        </div>
                        <input
                            type='time'
                            value={sTime}
                            onChange={e => setSTime(e.target.value)}
                        // required
                        />
                    </label>
                    <label>
                        <div className={labelTitle}>
                            <div>End Time:</div>
                            {errors.end_time && <div className={errMessage}>{errors.end_time}</div>}
                        </div>
                        <input
                            type='time'
                            value={eTime}
                            onChange={e => setETime(e.target.value)}
                        // required    
                        />
                    </label>
                    <label>
                        <div className={labelTitle}>
                            <div>Event Image (Optional):</div>
                            {errors.image_url && <div className={errMessage}>{errors.image_url}</div>}
                        </div>
                        <input
                            type='text'
                            value={image}
                            onChange={e => setImage(e.target.value)}
                        // required    
                        />
                    </label>

                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}