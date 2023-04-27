import { useEffect, useState } from 'react'
import './CreateEvent.css'
import { useDispatch, useSelector } from 'react-redux'
import { retrieveTypes } from '../../store/eventType'
import { createEvent } from '../../store/event'
import { useHistory } from 'react-router-dom'

export default function CreateEvent(){
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
    const [errors, setErrors] = useState([])

    const typesList = useSelector(state => state.types.types)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(retrieveTypes())
    }, [dispatch])

    const onSubmit = e => {
        e.preventDefault()

        //Get type ID for chosen type
        let chosenType
        if(type.length > 0){
            typesList?.forEach(t => {
                if(t.type === type){
                    chosenType = t.id
                }   
            })
        }

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
            end_time: eTime
        }

        return dispatch(createEvent(event))
        .then(async story => {
            console.log(story)
            if(story.id){
                    history.push(`/events/${story.id}`)
            }
            else if(story.errors){
                setErrors(story.errors)
                console.log(errors)
            }
        })
    }

    return(
        <div>
            {errors.map(error => (
                <div>{error}</div>
            ))}
            <h1>Create Event</h1>
            <form className='event-form'>
                <label>
                    Event Name:
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Event Type:
                    <select
                        value={type}
                        onChange={e => setType(e.target.value)}
                        required
                    >
                        <option>--- Please Select an Event Type ---</option>
                        {typesList?.map(type => (
                            <option key={type.id} value={type.id}>{type.type}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Address:
                    <input
                        type='text' 
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        required
                    />
                </label>
                <label>
                    City:
                    <input 
                        type='text'
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        required
                    />
                </label>
                <label>
                    State:
                    <input 
                        type='text'
                        value={state}
                        onChange={e => setState(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Country:
                    <input 
                        type='text'
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        required
                    />
                </label>
                <div>
                    <label>
                        Date:
                        <input 
                            type='date'
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Start Time:
                        <input 
                            type='time'
                            value={sTime}
                            onChange={e => setSTime(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        End Time:
                        <input 
                            type='time'
                            value={eTime}
                            onChange={e => setETime(e.target.value)}
                            required    
                        />
                    </label>

                </div>
                <button onClick={onSubmit}>Submit</button>
            </form>
        </div>
    )
}