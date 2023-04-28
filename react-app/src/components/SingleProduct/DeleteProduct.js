import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal"
import { useHistory, useParams } from "react-router-dom"

import { Modal } from "../../context/Modal"
import { deleteProduct } from "../../store/product"

export default function DeleteProduct(){
    const {closeModal} = useModal()
    const dispatch = useDispatch()
    const history = useHistory()
    const product = useSelector(state => state.products.product)


    const handleDelete = async () => {
        const response = await dispatch(deleteProduct(product.id))

        if(response.err){
            alert(response.err)
        }
        console.log(response)

        closeModal()
        history.push('/marketplace')
    }

    return (
        <div>
            <h3>Delete Product?</h3>
            <div>Are you sure you want to delete this product?</div>
            <div>
                <button onClick={handleDelete}>Yes</button>
                <button onClick={closeModal}>No</button>
            </div>
        </div>
    )
}