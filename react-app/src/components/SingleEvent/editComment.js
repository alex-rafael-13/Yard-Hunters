import { useState } from "react"
import { useModal, closeModal } from "../../context/Modal"
import { useDispatch, useSelector } from "react-redux"
import { updateComment } from "../../store/event"

export default function EditComment({comment}){
    const {closeModal} = useModal()
    const event = useSelector(state => state.event.event)
    const dispatch = useDispatch()

    const [commentBody, setCommentBody] = useState(comment.comment_body)
    const [err, setErr] = useState({})

    const handleSubmit = e => {
        e.preventDefault()

        const commentObj = {
            comment_body: commentBody
        }

        return dispatch(updateComment(comment.id, commentObj, event.id))
            .then(async comment => {
                if(comment.id){
                    setErr({})
                    closeModal()
                }
                if(comment.errors){
                    setErr(comment.errors)
                }
            }
        )


    }

    return(
        <form>
            <h3>Edit Comment:</h3>
            {err.comment_body && <div className="error-message">{err.comment_body}</div>}
            <textarea 
                value={commentBody}
                onChange={e => setCommentBody(e.target.value)}
                cols='75'
                rows='5'
            />
            <div>
                <button onClick={handleSubmit}>Update Comment</button>
                <button onClick={closeModal}>Cancel</button>
            </div>
        </form>

    )
}