import { FaEdit, FaTrash } from "react-icons/fa";
import useMenu from "../../../Hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageItems = () => {
    const [menu, , refetch] = useMenu()
    const axiosSecure = useAxiosSecure()

    const handleDeleteItem = (item) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {

                const res = await axiosSecure.delete(`/menu/${item._id}`)

                console.log(res.data);
                if (res.data.deletedCount > 0) {
                    refetch()
                    Swal.fire(
                        'Deleted!',
                        `${item.name} has been deleted`,
                        'success'
                    )
                }

            }
        })
    }

    return (
        <div>

            <SectionTitle heading="Manage All  Items" subHeading="Hurry Up"></SectionTitle>
            <div>
                <div className="overflow-x-auto rounded-t-xl ">
                    <table className="table ">
                        {/* head */}
                        <thead className="bg-orange-400 text-lg ">
                            <tr>
                                <th>#</th>
                                <th className="hover:underline hover:duration-300 hover:text-white ">Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                menu.map((item, index) => <tr key={item._id}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>${item.price}</td>
                                    <td>

                                        <Link to={`/dashboard/updateItem/${item._id}`}>
                                            <button

                                                className="btn  btn-lg bg-orange-500 hover:bg-orange-700"><FaEdit className="text-white text-xl" />
                                            </button>
                                        </Link>

                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteItem(item)}
                                            className="btn btn-ghost btn-lg border border-black rounded-2xl"><FaTrash className="text-red-600 " />
                                        </button>
                                    </td>
                                </tr>)
                            }


                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItems;