import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { resetSingle, retrieveEvents } from "../../store/event"
import EventPost from "./eventPost"
import './EventList.css'


export default function EventList(){
    const dispatch = useDispatch()
    const events = useSelector(state => state.event.events)

    useEffect(() => {
        dispatch(retrieveEvents())
        dispatch(resetSingle())
    }, [dispatch])


    if(!events) return

    return(
        <div className="event-list">
            {events.map(event => (
                <EventPost key={event.id} event={event} />
            ))}
        </div>
    )
}