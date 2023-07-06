import { NavLink } from "react-router-dom";

export default function EventPost({ event }) {

    let imgUrl
    if(event.image_url){
        imgUrl = event.image_url
    } else{
        imgUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTqcztNP3vT5LmB5cYoi3SbUBcadk7vtkqPw&usqp=CAU'
    }

    return (
        <NavLink to={`/events/${event.id}`}>
            <div className="event-post">
                <div className="event-header">
                    <div className="event-name"> {event.name}</div>
                    <div>Hosted by {event.host.username}</div>
                </div>
                <div className="img-cont">
                    <img src={imgUrl} alt="event image" />
                </div>
                <div className="host-event-type-cont">
                    <div className="date-time-cont">
                        <div> {event.date} </div>
                        <div>
                            from {event.start_time} to {event.end_time}
                        </div>
                    </div>
                    <div className="type-comment-cont">
                        <div>{event.event_type}</div>
                        <div className="comment">{event.comment_amount > 0 ? (event.comment_amount === 1 ?(<>{event.comment_amount} Comment</>):(<>{event.comment_amount} Comments</>)):(<>Be the First to Comment!</>)}</div>
                    </div>
                </div>
            </div>
        </NavLink>
    )
}