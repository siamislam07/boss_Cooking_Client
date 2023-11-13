import { Helmet } from "react-helmet-async";
import About from "../About/About";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import PopularMenu from "../PopularMenu/PopularMenu";
import Testimonials from "../Testimonials/Testimonials";
import Featured from "./Featured/Featured";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Boss Cooking | Home</title>
            </Helmet>
            <Banner />
            <Category />
            <About />
            <PopularMenu />
            <Featured />
            <Testimonials />
        </div>
    );
};

export default Home;