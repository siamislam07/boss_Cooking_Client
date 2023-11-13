import img from '../../../assets/home/chef-service.jpg'

const About = () => {
    return (
        <div>
            <div className="hero min-h-[500px] mb-16 bg-fixed" style={{ backgroundImage: `url(${img})` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md bg-white p-12  ">
                        <h1 className="mb-5 text-5xl font-bold text-black">Boss Coking</h1>
                        <p className="mb-5 text-black">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo.</p>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;