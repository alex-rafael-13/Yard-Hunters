
export default function EventPost({ event }) {
    return (
        <div className="event-post">
            <div className="event-header">
                <div className="user-image">
                    User Image
                </div>
                <div>{event.host.username}</div>
                <div> {event.name}</div>
            </div>
            <div className="img-cont">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTqcztNP3vT5LmB5cYoi3SbUBcadk7vtkqPw&usqp=CAU" alt="event image" />
            </div>
            <div className="host-event-type-cont">
                <div className="date-time-cont">
                    <div> {event.date} </div>
                    <div>
                        from {event.start_time} to {event.end_time}
                    </div>
                </div>
                <div>{event.event_type}</div>
            </div>
        </div>
    )
}