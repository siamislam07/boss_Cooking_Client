import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PayMentHistory = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: payments =[] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return  res.data
        }
    })

    return (
        <div className="mt-24">
            <h2 className="text-3xl my-6">Total Payment: {payments.length}</h2>
            <div className="overflow-x-auto rounded-lg">
                <table className="table ">
                    <thead className="bg-orange-600 text-lg ">
                        <tr>
                            <th>#</th>
                            <th>Price</th>
                            <th>Transaction Id</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, i)=><tr key={payment._id}>
                            <th>{i + 1}</th>
                            <th>${payment.price}</th>
                            <th>{payment.transactionId}</th>
                            <th>{payment.status}</th>
                        </tr>)}
                        
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default PayMentHistory;