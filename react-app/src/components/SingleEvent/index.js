import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useHistory, useParams } from "react-router-dom"
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
        console.log(event)
    }, [dispatch])

    const updateButton = () => {
        history.push(`/events/${event_id}/edit`)
    }

    if(!event) return

    return(
        <div className="event-page">
            {user?.id === event?.host?.id && 
                <div className='buttons'>
                    <button className="update-event" onClick={updateButton}>Update</button>
                    <OpenModalButton
                        buttonText='Cancel Event'
                        modalComponent={<DeleteEvent />}
                        event={event}
                    />
                </div>
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
            <hr/>
            <div>
                <h2>Products Being Sold:</h2>
                {event.product_list?.map(product => (
                    <NavLink key={product.id} to={`/products/${product.id}`}>
                        <div>
                            <div>{product.name}</div>
                            <img src={product.preview_image}/>
                            <div>$ {product.price}</div>
                        </div>
                    </NavLink>
                ))}    
            </div>       
        </div>
    )
}