import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useHistory, useParams } from "react-router-dom"
import { deleteEvent, retrieveEventById } from "../../store/event"
import { authenticate } from "../../store/session"
import OpenModalButton from "../OpenModalButton"
import DeleteEvent from "./deleteEvent"
import './singleEvent.css'
import UpdatePreviewImage from "./updateImagePreview"
import CommentBody from "./commentBody"
import AddComment from "./addComment"

export default function EventPage() {
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()
    const event = useSelector(state => state.event.event)
    const user = useSelector(state => state.session.user)
    const { event_id } = useParams()
    const history = useHistory()


    useEffect(() => {
        localStorage.removeItem('preFilledEvent')
    }, []);

    useEffect(() => {
        dispatch(retrieveEventById(event_id)).then(() => setIsLoaded(true))
    }, [dispatch])

    const updateButton = () => {
        history.push(`/events/${event_id}/edit`)
    }

    let imgUrl
    if (event.image_url) {
        imgUrl = event.image_url
    } else {
        imgUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTqcztNP3vT5LmB5cYoi3SbUBcadk7vtkqPw&usqp=CAU'
    }

    if (!event) return

    return (
        <>
            {isLoaded && (
                <>
                    <div className="event-page">
                        {user && user?.id === event?.host?.id &&
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
                            <img src={imgUrl} alt='Event Image' />
                            {user && user?.id === event?.host?.id &&
                                <OpenModalButton
                                    buttonText='Update Preview Image'
                                    modalComponent={<UpdatePreviewImage />}
                                    event={event}
                                    className='update-image-but'
                                />
                            }
                        </div>
                        <div className="title-user-cont">
                            <div className="event-title">{event.name}</div>
                            <div className="user-cont">
                                <div>
                                    Hosted By {event.host?.username}
                                </div>
                                {/* <div>
                                User Profile IMG
                            </div> */}
                            </div>
                        </div>
                        <div className="description-cont">
                            {event.description}
                        </div>
                        <hr />
                        <div className="comment-cont">
                            {event.comment_amount > 0 && (
                            <>
                                <div className="comment-title">Comments:</div>
                                <CommentBody comments={event.comments}/>
                                <hr></hr>
                            </>
                            )}
                        <div className="add-comment">
                            {user && <AddComment eventId={event.id}/>}
                        </div>
                        </div>
                    </div>
                    <div className="side-info">
                        <h2>Products Being Sold:</h2>
                        <div className="product-list">
                            {event.product_list?.length ? (
                                <>
                                    {event.product_list?.map(product => (
                                        <NavLink className='product-a' key={product.id} to={`/products/${product.id}`}>
                                            <div className="product-card">
                                                <div>{product.name}</div>
                                                <div className="product-img-cont">
                                                    <img src={product.preview_image} />
                                                </div>
                                                <div>$ {product.price}</div>
                                            </div>
                                        </NavLink>
                                    ))}
                                </>
                            ) : (<h3>No Products Have Yet Been Listed</h3>)}
                        </div>
                    </div>
                </>
            )}
        </>
    )
}