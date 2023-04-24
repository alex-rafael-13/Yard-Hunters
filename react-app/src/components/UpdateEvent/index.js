import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { retrieveTypes } from '../../store/eventType'
import { retrieveEventById, updateEvent } from '../../store/event'
import { useHistory, useParams } from 'react-router-dom'

export default function UpdateEvent() {
    const event = useSelector(state => state.event.event)
    const typesList = useSelector(state => state.types.types)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(retrieveTypes())
        dispatch(retrieveEventById(event_id)).then(() => setLoaded(true))
    }, [dispatch])

    const [name, setName] = useState(event.name)
    const [description, setDescription] = useState(event.description)
    const [type, setType] = useState('')
    const [address, setAddress] = useState(event.address)
    const [city, setCity] = useState(event.city)
    const [state, setState] = useState(event.state)
    const [country, setCountry] = useState(event.country)
    const [date, setDate] = useState(event.date)
    const [sTime, setSTime] = useState(event.start_time)
    const [eTime, setETime] = useState(event.end_time)
    const [loaded, setLoaded] = useState(false)

    const { event_id } = useParams()
    const history = useHistory()


    const onSubmit = async e => {
        e.preventDefault()

        //Get type ID for chosen type
        let chosenType
        typesList?.forEach(t => {
            if (t.type === type) {
                chosenType = t
            }
        })

        console.log(chosenType)

        const updatedEvent = {
            name,
            description,
            event_type_id: chosenType.id,
            address,
            city,
            state,
            country,
            date,
            start_time: sTime,
            end_time: eTime
        }

        const eventResponse = await dispatch(updateEvent(event.id, updatedEvent))

        history.push(`/events/${eventResponse.id}`)
    }

    return (
        <>
            {loaded && (
                <div>
                    <h1>Edit Event</h1>
                    <form className='event-form'>
                        <label>
                            Event Name:
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </label>
                        <label>
                            Description:
                            <textarea
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </label>
                        <label>
                            Event Type:
                            <select
                                value={type}
                                onChange={e => setType(e.target.value)}
                            >
                                {typesList?.map(type => (
                                    <option key={type.id}>{type.type}</option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Address:
                            <input
                                type='text'
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                            />
                        </label>
                        <label>
                            City:
                            <input
                                type='text'
                                value={city}
                                onChange={e => setCity(e.target.value)}
                            />
                        </label>
                        <label>
                            State:
                            <input
                                type='text'
                                value={state}
                                onChange={e => setState(e.target.value)}
                            />
                        </label>
                        <label>
                            Country:
                            <input
                                type='text'
                                value={country}
                                onChange={e => setCountry(e.target.value)}
                            />
                        </label>
                        <div>
                            <label>
                                Date:
                                <input
                                    type='date'
                                    value={date}
                                    onChange={e => setDate(e.target.value)}
                                />
                            </label>
                            <label>
                                Start Time:
                                <input
                                    type='time'
                                    value={sTime}
                                    onChange={e => setSTime(e.target.value)}
                                />
                            </label>
                            <label>
                                End Time:
                                <input
                                    type='time'
                                    value={eTime}
                                    onChange={e => setETime(e.target.value)}
                                />
                            </label>

                        </div>
                        <button onClick={onSubmit}>Submit</button>
                    </form>
                </div>
            )}
        </>
    )
}