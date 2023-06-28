import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


export default function UpdatePreviewImage(){
    const {closeModal} = useModal()
    const dispatch = useDispatch()
    const history = useHistory()
    const event = useSelector(state => state.event.event)
    
    return (

        <>Test</>
    )
}
