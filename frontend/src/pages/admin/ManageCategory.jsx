import axios from "axios"
import Modal from "../../components/Modal"
import useAuth from "../../hooks/useAuth"
import { useEffect, useRef, useState } from "react"

function ManageCategory() {
    const { categories, getCategories } = useAuth()
    const [selectedCategory, setSelectedCategory] = useState({})
    const [categoryForm, setCategoryForm] = useState(false)
    const [status, setStatus] = useState(false)
    const [info, setinfo] = useState('')
    const [products, setProducts] = useState([])
    const categoryCreateFormRef = useRef()

    async function handleCreateCategory(e) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        axios.post('/set_category', formData).then(response => {
            if (response.data.status === 200) {
                categoryCreateFormRef.current.reset()
                setCategoryForm(false)
                getCategories()
                setSelectedCategory(response.data.category)
            } else setinfo(response.data.message)
        }).catch(error => console.log(error))
    }

    useEffect(() => {
        if (selectedCategory.name) {
            axios.get('/products?catId=' + selectedCategory.id).then(response => {
                if (response.data.status === 200) {
                    setProducts(response.data.products)
                }
            }).catch(error => console.log(error))
        }
    }, [selectedCategory])

    return (
        <div className="container mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center text-wrap gap-3">
                    {
                        categories.map((category, index) => <span key={index} className={`text-gray-400 bold cursor-pointer ${selectedCategory.name === category.name ? "text-orange-400" : ''}`} onClick={() => setSelectedCategory(category)}>{category.name}</span>)
                    }
                </div>
                <button className="bg-orange-500 text-white px-3 py-1 border" onClick={() => setCategoryForm(!categoryForm)}>Add Category</button>
                <Modal title={'Create category'} onClose={() => setCategoryForm(false)} isOpen={(categoryForm)}>
                    <form className={`flex flex-col gap-2`} onSubmit={handleCreateCategory} method='post' encType='multipart/form-data' ref={categoryCreateFormRef}>
                        <input required type="text" className="p-4 my-2 border" placeholder='Name' name='name' />
                        <textarea required name="description" id="description" className="p-4 my-2 border" placeholder='Description'></textarea>
                        <input type="file" name="banner" required />
                        <button className="bg-orange-500 px-8 py-2 focus:bg-orange-700 text-white">{status ? 'Submitting...' : 'Submit'}</button>
                        <p>{info}</p>
                    </form>
                </Modal>
            </div>
            {selectedCategory.name ? (
                <>
                    <div className="flex items-center justify-end gap-2 mt-4">
                        <button className="bg-yellow-500 text-white px-3 py-1 border" onClick={() => setCategoryForm(!categoryForm)}>Update Category</button>
                        <button className="bg-orange-500 text-white px-3 py-1 border" onClick={() => setCategoryForm(!categoryForm)}>Add Product</button>
                    </div>
                    {!products.length && <p className="my-40 text-center">No product available</p>}
                </>
            ) : null}
            {!selectedCategory.name && <p className="my-40 text-center">No category selected</p>}
        </div>
    )
}

// const CategoryCreateModal = ({ place, handleUpdate, setPlaceEditModal, placeEditModal, status, info }) => {
//     return (
//         <Modal title={place.title} onClose={() => setPlaceEditModal(false)} isOpen={(placeEditModal)}>
//             <form className={`flex flex-col gap-2`} onSubmit={handleUpdate} method='post' encType='multipart/form-data'>
//                 <input required type="text" className="p-4 my-2 border" placeholder='Title' name='title' defaultValue={place.title} />
//                 <input required type="number" className="p-4 my-2 border" placeholder='Price' name='price' defaultValue={place.price} />
//                 <input required type="number" className="p-4 my-2 border" placeholder='Days' name='days' defaultValue={place.days} />
//                 <input required type="text" className="p-4 my-2 border" placeholder='Location' name='location' defaultValue={place.location} />
//                 <input type="file" className="my-2" name='src' />
//                 <textarea required name="description" id="" className="p-4 my-2 border" placeholder='Description' defaultValue={place.description}></textarea>
//                 <button className="bg-orange-500 px-8 py-2 focus:bg-orange-700">{status ? 'Submitting...' : 'Submit'}</button>
//                 <p>{info}</p>
//             </form>
//         </Modal>
//     )
// }
export default ManageCategory