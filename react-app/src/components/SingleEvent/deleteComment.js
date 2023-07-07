import { useDispatch, useSelector } from "react-redux"
import { useModal, closeModal } from "../../context/Modal"
import { useHistory, useParams } from "react-router-dom"
import { deleteComment } from "../../store/event"
import { Modal } from "../../context/Modal"

export default function DeleteComment({commentId}){
    const {closeModal} = useModal()
    const dispatch = useDispatch()
    const history = useHistory()
    const event = useSelector(state => state.event.event)

    const handleDelete = async () => {
        const response = await dispatch(deleteComment(commentId, event.id))
        console.log(response)

        if(response.errors){
            alert(response.err)
        }

        closeModal()
    }

    return (
        <div>
            <h3>Delete Comment?</h3>
            <div>Are you sure you want to delete your comment?</div>
            <div>
                <button onClick={handleDelete}>Yes</button>
                <button onClick={closeModal}>No</button>
            </div>
        </div>
    )
}