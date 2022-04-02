import axios from "axios"
import { useState, useEffect } from "react"
import Aos from 'aos'

const Home = () => {
    const [home, setHome] = useState([])
    
    useEffect(() => {
        const getHome = async () => {
            const res = await axios.get('https://portofolio-api-mfr.herokuapp.com/api/home/Home-955-60-816');
            const myHome = res.data;
            setHome(myHome);
        }
        getHome()
    }, []);

    useEffect(() => {
        Aos.init({ duration:2000 });
    },[])

    return (
            <div className="main">
                <div className="content">
                    <div className="homecontent">
                        <div className="pic">
                            {
                                <img src={home.pic_url} alt="" />
                            }
                        </div>
                        <div className="greeting">
                            <h4>
                                Hi,
                            </h4>
                            <h1>
                                I'm Muhamad Fahru Rozi
                            </h1>
                        </div>
                        <div data-aos="fade-up" data-aos-delay="2000" className="detail-home">
                            <p> 
                                {home.desc} 
                            </p>
                        </div>
                    </div>
                </div>
            </div>            
    )
}

export default Home
