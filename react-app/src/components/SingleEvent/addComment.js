import { useState } from "react"
import { useDispatch } from "react-redux"
import { createComment } from "../../store/event"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"


export default function AddComment({eventId}){
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    const [err, setErr] = useState({})
    const history = useHistory()

    const onSubmit = e => {
        e.preventDefault()

        const commentObj = {
            comment_body: comment
        }

        return dispatch(createComment(eventId, commentObj))
            .then(async comment => {
                if(comment.id) {
                    history.push(`/events/${eventId}`)
                    setComment('')
                    setErr({})
                }
                if(comment.errors){
                    setErr(comment.errors)
                }
            })
    }

    return (
        <form className='comment-form'onSubmit={onSubmit}>
            <textarea
                className="comment-textbox"
                placeholder="Add Your Comment..."
                value={comment}
                onChange={e => setComment(e.target.value)}
                rows='4'
            />
            {err.comment_body && <div className="error-message">{err.comment_body}</div>}
            <button type="submit">Post Comment</button>
        </form>
    )
}