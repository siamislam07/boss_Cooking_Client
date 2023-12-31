import { CardElement, CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCart from "../../../Hooks/useCart";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const CheckOutForm = () => {

    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const { user } = useAuth()
    const [transactionId, setTransactionId] = useState('')

    const stripe = useStripe()
    const elements = useElements()
    const axiosSecure = useAxiosSecure()
    const [cart] = useCart()
    const navigate = useNavigate()
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: totalPrice })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret)
            })
    }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)
        if (card == null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment eror', error);
            setError(error.message)
        }
        else {
            console.log('payment method', paymentMethod);
            setError('')
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                }
            }
        })
        if (confirmError) {
            console.log('confirm error', confirmError);
        }
        else {
            console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id)

                // save payment in database
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId),
                    status: 'Pending'
                }
                const res = await axiosSecure.post('/payments', payment)
                console.log('payments saved', res.data);
                if (res?.data?.paymentResult?.insertedId) {
                    toast.success('Thank you for the taka poysha')
                    navigate('/dashboard/paymentHistory')
                }
            }
        }

    }



    return (

        <form className="mx-auto max-w-md p-8 bg-white shadow-lg rounded-lg " onSubmit={handleSubmit}>

            <div className="mb-4">
                <label htmlFor="cardNumber" className="block text-gray-700 text-lg font-bold mb-2">Card Number</label>
                <CardElement
                className="my-10"
                    id="cardNumber"
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
            </div>

            <button
                className="w-full bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={!stripe || !clientSecret}
            >
                Pay Now
            </button>

            <p className="text-red-700 mt-4">{error}</p>
            {transactionId && <p className="text-green-700 font-bold mt-2">Your TransactionId is: {transactionId}</p>}

        </form>
    );
};

export default CheckOutForm;