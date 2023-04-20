import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { retrieveEventById } from "../../store/event"
import { authenticate } from "../../store/session"

export default function EventPage(){
    const dispatch = useDispatch()
    const event = useSelector(state => state.event.event)
    const user = useSelector(state => state.session.user)
    const {event_id} = useParams()

    useEffect(() => {
        dispatch(retrieveEventById(event_id))
    }, [dispatch])

    if(!event) return

    return(
        <div className="event-page">
            {user?.id === event?.host?.id && 
                <di className='buttons'>
                    <button>Update</button>
                    <button>Delete</button>
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