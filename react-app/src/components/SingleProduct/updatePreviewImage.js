import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";


export default function UpdatePreviewImage(){
    const {closeModal} = useModal()
    const dispatch = useDispatch()
    const history = useHistory()
    const product = useSelector(state => state.products.product)
    console.log(product)

    const [image, setImage] = useState(null)
    const [errors, setErrors] = useState({})

    const onSubmit = async () => {
        const formData = new FormData()
        formData.append('image_file', image)

        await dispatch(async () => {
            const response = await fetch(`/api/products/${product.id}/manage/preview`, {
                method: "PUT",
                body: formData 
            });

            return response
        })
            .then(() => {
                closeModal()
                history.push(`/products/${product.id}`)
            }
            )
            .catch( async res => {
                const data = await res.json()
                if(data && data.erros){
                    setErrors(data.errors)
                }
            })
    }
    
    return (
        <div>
            <h1>Update Preview Image</h1>
            <form className="update-preview-form" onSubmit={onSubmit} encType="multipart/form-data">
                <div>Upload new image:</div>
                <input
                    placeholder='(Optional)'
                    type='file'
                    accept='image/*'
                    onChange={e => setImage(e.target.files[0])}    
                />
                <button type="submit" disabled={image ? false : true}>Update Image</button>
            </form>
        </div>
    )
}
