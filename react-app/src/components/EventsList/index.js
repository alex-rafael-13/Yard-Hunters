import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { resetSingle, retrieveEvents } from "../../store/event"
import EventPost from "./eventPost"
import './EventList.css'


export default function EventList(){
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false);
    const events = useSelector(state => state.event.events)

    useEffect(() => {
        dispatch(retrieveEvents()).then(() => setIsLoaded(true))
        dispatch(resetSingle())
    }, [dispatch])


    if(!events) return

    return(  
        <>
            {isLoaded && (
                <div className="event-list">
                    {events.map(event => (
                        <EventPost key={event.id} event={event} />
                    ))}
                </div>
            )}
        </>
    )
}