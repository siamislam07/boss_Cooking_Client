import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate()

    const  {createUser, updateUserProfile} = useContext(AuthContext)

    const onSubmit = (data) => {
        console.log(data)
        createUser(data.email, data.password)
        .then(result=>{
            const loggedUser = result.user
            console.log(loggedUser);
            updateUserProfile(data.name, data.photoUrl)
            .then(()=>{
                console.log('profile info updated');
                reset()
                toast.success('profile has Created')
                navigate('/')
            })
            .catch(error=>{
                console.log(error);
                toast.error(error.message)
            })
        })
    }

    return (

        

        <>

            <Helmet>
                <title>Boss | Sign Up</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign up now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">

                            <div className="form-control">
                                <label className="label justify-start ">
                                    <span className="label-text border">Name</span>
                                    {errors.name && <span className="text-red-400 ">*</span>}
                                </label>

                                <input name="name" {...register("name", { required: true })} type="text" placeholder="Name" className="input input-bordered" />


                            </div>

                            <div className="form-control">
                                <label className="label justify-start ">
                                    <span className="label-text border">Photo Url</span>
                                    {errors.photoUrl && <span className="text-red-400 ">*</span>}
                                </label>

                                <input {...register("photoUrl", { required: true })} type="text" placeholder="PhotoUrl" className="input input-bordered" />


                            </div>

                            <div className="form-control">
                                <label className="label justify-start">
                                    <span className="label-text">Email</span>
                                    {errors.email && <span className="text-red-400 ">*</span>}
                                </label>

                                <input name="email" {...register("email", { required: true })} type="email" placeholder="email" className="input input-bordered" />

                            </div>

                            <div className="form-control">
                                <label className="label justify-normal">
                                    <span className="label-text">Password</span>
                                    {errors.password && <span className="text-red-400 ">*</span>}
                                </label>
                                <input type="password" {...register("password", { required: true, minLength: 6, maxLength: 12 })} name="password" placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'minLength' && <p className="text-red-400 mt-2">Password minlength: 6  must</p>}
                                {errors.password?.type === 'maxLength' && <p className="text-red-400 mt-2">Password maxLength: 12 must</p>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>

                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">SignUp</button>
                            </div>
                        </form>
                        <p className="p-3 ml-5"><small>Already have an account?<Link to="/login">Login</Link></small></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;