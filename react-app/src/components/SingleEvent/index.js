import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { deleteEvent, retrieveEventById } from "../../store/event"
import { authenticate } from "../../store/session"
import OpenModalButton from "../OpenModalButton"
import DeleteEvent from "./deleteEvent"

export default function EventPage(){
    const dispatch = useDispatch()
    const event = useSelector(state => state.event.event)
    const user = useSelector(state => state.session.user)
    const {event_id} = useParams()
    const history = useHistory()

    useEffect(() => {
        dispatch(retrieveEventById(event_id))
    }, [dispatch])

    if(!event) return

    return(
        <div className="event-page">
            {user?.id === event?.host?.id && 
                <di className='buttons'>
                    <button className="update-event">Update</button>
                    <OpenModalButton
                        buttonText='Cancel Event'
                        modalComponent={<DeleteEvent />}
                        event={event}
                    />


                </di>
            }
            <div className="event-image">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTqcztNP3vT5LmB5cYoi3SbUBcadk7vtkqPw&usqp=CAU"/>
            </div>
            <div className="title-user-cont">
                <div>{event.name}</div>
                <div className="user-cont">
                    <div>
                        Hosted By {event.host?.username}
                    </div>
                    <div>
                        User Profile IMG
                    </div>
                </div>
            </div>
            <div className="description-cont">
                {event.description}
            </div>       
        </div>
    )
}