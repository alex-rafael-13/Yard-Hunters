import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { retrieveTypes } from '../../store/eventType'
import { retrieveEventById, updateEvent } from '../../store/event'
import { useHistory, useParams } from 'react-router-dom'
import './updateEvent.css'

export default function UpdateEvent() {
    const event = useSelector(state => state.event.event)
    const typesList = useSelector(state => state.types.types)
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)
    const { event_id } = useParams()
    
    const [type, setType] = useState(event.event_type_id)
    const [name, setName] = useState(event.name)
    const [description, setDescription] = useState(event.description)
    const [address, setAddress] = useState(event.address)
    const [city, setCity] = useState(event.city)
    const [state, setState] = useState(event.state)
    const [country, setCountry] = useState(event.country)
    const [date, setDate] = useState('')
    const [sTime, setSTime] = useState('')
    const [eTime, setETime] = useState('')
    const [errors, setErrors] = useState({})
    const [image, setImage] = useState(event.image_url)

    useEffect(() => {
        dispatch(retrieveTypes())
        const storedEvent = localStorage.getItem('preFilledEvent');
        if (storedEvent) {
            const parsedEvent = JSON.parse(storedEvent);
            setName(parsedEvent.name);
            setDescription(parsedEvent.description);
            setAddress(parsedEvent.address)
            setCity(parsedEvent.city)
            setState(parsedEvent.state)
            setCountry(parsedEvent.country)
            setType(parsedEvent.event_type_id)
            setLoaded(true);
        } else {
            dispatch(retrieveEventById(event_id)).then(() => {
            setLoaded(true);
            localStorage.setItem('preFilledEvent', JSON.stringify(event));
        });
        }
    }, [dispatch, event_id])

    const history = useHistory()

    const onSubmit = e => {
        e.preventDefault()

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

        console.log(event)

        return dispatch(updateEvent(event_id, event))
            .then(async story => {
                console.log(story)
                if (story.errors) {
                    setErrors(story.errors) 
                }
                else{
                    history.push(`/events/${story.id}`)
                }
            })
    }

        const labelTitle = 'label-title'
        const errMessage = 'error-message'
        const sectionDetails = 'section-details'
        const detailsTitle = 'details-title'

        console.log(date)

        return (
            <>
                { loaded && <div className='form-body'>
                    {/* {errors.map(error => (
                        <div>{Object.values(error)}</div>
                    ))} */}
                    <h1>Edit Event</h1>
                    <form className='event-form' onSubmit={onSubmit} encType="multipart/form-data">
                        <div className={sectionDetails}>
                            <div className={detailsTitle}>Event Details</div>
                            <div>Name your event next to giving a short description of what your event is about. Don't forget to include what type of event you are hosting plus an image if you desire!</div>
                        </div>
                        <label>
                            <div className={labelTitle}>
                                <div>Event Name:</div>
                                {errors.name && <div className={errMessage}>{errors.name}</div>}
                            </div>
                            <input
                                placeholder='Name of your event'
                                className='event-input'
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            // required
                            />
                        </label>
                        <label>
                            <div className={labelTitle}>
                                <div>Description:</div>
                                {errors.description && <div className={errMessage}>{errors.description}</div>}
                            </div>
                            <textarea
                                placeholder='Must be between 10 and 1000 characters long'
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                className='event-input' cols='5'
                                rows='9'
                                col='5'
                                // required
                                />
                        </label>
                        <div className='type-image-section'>
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
                                    <option disabled value=''>--- Please Select an Event Type ---</option>
                                    {typesList?.map(type => (
                                        <option key={type.id} value={type.id}>{type.type}</option>
                                        ))}
                                </select>
                            </label>
                            {/* <label>
                                <div className={labelTitle}>
                                    <div>Event Image:</div>
                                    {errors.preview_image && <div className={errMessage}>{errors.preview_image}</div>}
                                </div>
                                <input
                                    placeholder='(Optional)'
                                    type='file'
                                    accept='image/*'
                                    onChange={e => setImage(e.target.files[0])}
                                    // required    
                                    />
                            </label> */}
                        </div>
                        <hr />
                        <div className={sectionDetails}>
                            <div className={detailsTitle}>Where is your event taking place?</div>
                            <div>Please include the location details for your event</div>
                        </div>
                        <label>
                            <div className={labelTitle}>
                                <div>Country:</div>
                                {errors.country && <div className={errMessage}>{errors.country}</div>}
                            </div>
                            <input
                                placeholder='Country'
                                className='event-input'
                                type='text'
                                value={country}
                                onChange={e => setCountry(e.target.value)}
                                // required
                                />
                        </label>
                        <label>
                            <div className={labelTitle}>
                                <div>Address:</div>
                                {errors.address && <div className={errMessage}>{errors.address}</div>}
                            </div>
                            <input
                                placeholder='Address'
                                className='event-input'
                                type='text'
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                // required
                                />
                        </label>
                        <div className='city-state'>
                            <div>
                                <label>
                                    <div className={labelTitle}>
                                        <div>City:</div>
                                        {errors.city && <div className={errMessage}>{errors.city}</div>}
                                    </div>
                                    <input
                                        placeholder='City'
                                        className='event-input'
                                        type='text'
                                        value={city}
                                        onChange={e => setCity(e.target.value)}
                                        // required
                                        />
                                </label>
                            </div>
                            <div>
                                <label>
                                    <div className={labelTitle}>
                                        <div>State:</div>
                                        {errors.state && <div className={errMessage}>{errors.state}</div>}
                                    </div>
                                    <input
                                        placeholder='State'
                                        className='event-input'
                                        type='text'
                                        value={state}
                                        onChange={e => setState(e.target.value)}
                                        // required
                                        />
                                </label>
                            </div>
                        </div>
                        <hr></hr>
                        <div className={sectionDetails}>
                            <div className={detailsTitle}>When is your event taking place?</div>
                            <div>Please include the time and date for when your event is taking place</div>
                        </div>
                        <label>
                            <div className={labelTitle}>
                                <div>Event Date:</div>
                                {errors.date && <div className={errMessage}>{errors.date}</div>}
                            </div>
                            <input
                                className='date-input'
                                type='date'
                                value={date}
                                onChange={e => setDate(e.target.value)}
                                // required
                                />
                        </label>
                        <div className='time-cont'>
                            <label>
                                <div className={labelTitle}>
                                    <div>Start Time:</div>
                                    {errors.start_time && <div className={errMessage}>{errors.start_time}</div>}
                                </div>
                                <input
                                    className='time-input'
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
                                    className='time-input'
                                    type='time'
                                    value={eTime}
                                    onChange={e => setETime(e.target.value)}
                                    // required    
                                    />
                            </label>
        
                        </div>
                        <hr></hr>
                        <div className='button-cont'>
                            <button type='submit'>Submit</button>
                        </div>
                    </form>
                </div>}
            </>
        )
    }