import { useDispatch, useSelector } from "react-redux"
import { useModal, closeModal } from "../../context/Modal"
import { useHistory, useParams } from "react-router-dom"
import { deleteEvent } from "../../store/event"
import { Modal } from "../../context/Modal"

export default function DeleteEvent(){
    const {closeModal} = useModal()
    const dispatch = useDispatch()
    const history = useHistory()
    const event = useSelector(state => state.event.event)


    const handleDelete = async () => {
        const response = await dispatch(deleteEvent(event?.id))
        console.log(response)

        if(response.errors){
            alert(response.err)
        }

        closeModal()
        history.push('/')
    }

    return (
        <div>
            <h3>Cancel Event?</h3>
            <div>Are you sure you want to cancel event?</div>
            <div>
                <button onClick={handleDelete}>Yes</button>
                <button onClick={closeModal}>No</button>
            </div>
        </div>
    )
}