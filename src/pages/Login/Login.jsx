import { useContext, useEffect,  useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha, } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';


const Login = () => {
    // const captchaRef = useRef(null)
    const [disabled, setDisabled] = useState(true)

    const { signIn } = useContext(AuthContext)

    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || "/"

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = e => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value
        console.log(email);
        console.log(password);
        signIn(email, password)
            .then(result => {
                const user = result.user
                console.log(user);
                toast.success('Login Successful')
                navigate(from,{replace: true})
            })
    }


    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }


    }

    return (
        <>
        <Helmet>
                <title>Boss | Login</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card  md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="Captcha" className="input input-bordered placeholder:pl-[112px] placeholder:hover:text-9xl " required />
                                {/* <button onClick={handleValidateCaptcha} className='btn btn-outline mt-4'>Validate</button> */}
                            </div>
                            <div className="form-control mt-6">
                                <button disabled={disabled} className="btn btn-primary" type="submit">Login</button>
                            </div>
                        </form>
                        <p><small>New Here? <Link to="/signup">Create an Account</Link></small></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;