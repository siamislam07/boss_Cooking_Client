import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";



const FoodCard = ({ item }) => {
    const { image, price, recipe, name, _id} = item
    const { user } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const axiosSecure = useAxiosSecure()
    const [, refetch] = useCart()


    const handleAddToCart = () => {
        if (user && user.email) {
            // send cart item to the database

            const cartItem = {
                menuId :_id,
                email: user.email,
                name,
                image,
                price,
            }
            axiosSecure.post('/carts', cartItem)
            .then(res =>{
                console.log(res.data);
                if(res.data.insertedId){
                    toast.success(`${name} Added to your Cart`)
                }
                // refetch cart
                refetch()
            })
        }
        else {
            Swal.fire({
                title: 'You Are Not Logged In',
                text: "Please login to add to the cart",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', {state: {from: location}})
                }
            })
        }
    }
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className="absolute right-0 mr-4 mt-4 px-4 rounded-md bg-slate-800 text-white">${price}</p>
            <div className="card-body text-center items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button
                        onClick={handleAddToCart}
                        className="btn btn-outline bg-slate-100 border-rose-400 border-0 border-b-4">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;