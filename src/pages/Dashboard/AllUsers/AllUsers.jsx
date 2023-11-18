import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import axios from "axios";
import { FaTrash, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure()

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get("/users")
            return res.data
        }
    })

    const handleMakeAdmin = user => {
            axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res =>{
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch()
                    toast.success(`${user.name} is an Admin Now!`)
                }
            })
    }

    const handleDelete = user => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }

    return (
        <div className="mt-24">
            <div className="flex justify-evenly my-5">
                <h2 className="text-3xl  font-bold uppercase">all users</h2>
                <h2 className="text-3xl font-bold uppercase">total usersL: {users.length}</h2>
            </div>
            <div className="overflow-x-auto rounded-t-2xl">
                <table className="table table-zebra w-full ">
                    {/* head */}
                    <thead className="bg-[#d29f55] ">
                        <tr className="text-lg">
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, i) => <tr key={user._id}>
                                <th>{i + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role ==='admin'? <p className="text-lg text-orange-700 underline">Admin</p> :<button
                                        onClick={() => handleMakeAdmin(user)}
                                        className="btn  btn-lg bg-orange-500"><FaUsers className="text-white text-xl" />
                                    </button>}
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(user)}
                                        className="btn btn-ghost btn-lg border border-black rounded-2xl"><FaTrash className="text-red-600 " />
                                    </button>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;