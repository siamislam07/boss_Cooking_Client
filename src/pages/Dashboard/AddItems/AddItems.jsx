import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { toast } from "react-toastify";
import Category from "../../Home/Category/Category";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddItems = () => {
    const { register, handleSubmit, reset } = useForm()
    const axiosPublic  = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const onSubmit = async(data) => {
        console.log(data);
        // image upload to imagebb then get an url
        const imageFile = {image: data.image[0]}
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers:{
                'content-type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            // now send the munu item data the server with the image
            const menuItem = {
                name: data.name,
                category : data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            // 
            const menuRes = await axiosSecure.post('/menu', menuItem)
            console.log(menuRes.data);
            if (menuRes.data.insertedId) {
                reset()
                toast.success(`${data.name} is Added to the Menu`)
            }
        }
        console.log('with image url',res.data);
    }
    return (
        <div>
            <SectionTitle heading="Add An Item" subHeading="What's New?"></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Recipe Name <span className="text-red-800">*</span></span>
                        </label>
                        <input
                            {...register('name', {required: true})}
                            required
                            type="text" placeholder="Type here" className="input input-bordered  w-full " />
                    </div>

                    <div className="flex  gap-6">
                        {/* category */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Category Name <span className="text-red-800">*</span></span>
                            </label>
                            <select defaultValue="default" {...register('category', {required: true})}
                                className="select select-bordered w-full " >
                                <option disabled value="Default">Select A Category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>

                            </select>
                        </div>
                        {/* price */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Price Name <span className="text-red-800">*</span></span>
                            </label>
                            <input
                                {...register('price', {required: true})}
                                type="number" placeholder="Price " className="input input-bordered  w-full " />
                        </div>


                    </div>

                    {/* recipe details */}
                    <div className="form-control w-full my-5">
                        <label className="label">
                            <span className="label-text">Recipe Details <span className="text-red-800">*</span></span>
                        </label>
                        <textarea {...register('recipe')} className="textarea textarea-bordered h-2/4  resize-none" rows="6"></textarea>
                    </div>

                    <div className="form-control w-full my-5">
                        <input {...register('image', {required: true})} type="file" className="file-input w-full max-w-xs" id="" />
                    </div>

                    <button className="btn btn-outline">
                        Add Item <FaUtensils/>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;