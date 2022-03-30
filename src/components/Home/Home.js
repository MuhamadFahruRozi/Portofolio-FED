import axios from "axios"
import { useState, useEffect } from "react"

const Home = ( { passHomeData }) => {
    const [home, setHome] = useState([])
    
    useEffect(() => {
        const getHome = async () => {
            const res = await axios.get('https://portofolio-api-mfr.herokuapp.com/api/home/Home-955-60-816');
            console.log(res);
            const myHome = res.data;
            setHome(myHome);
        }
        getHome()
    }
    // {
    //     const fetchNor = async () => {
    //         const res = await axios.get('http://localhost:5000/api/home');
    //         console.log(res);
    //         setNor(res.data);
    //     }
    //     fetchNor();
    // }
    , []);

    return (
            <div className="main">
                <div className="content">
                    <div className="homecontent">
                        <div className="pic">
                            {
                                <img src={home.pic_url} alt="" />
                                // <img src="" />
                            }
                            {/* <img src={passHomeData.profilePicture} alt="" /> */}
                            {/* {passHomeData.profilePicture} */}
                            {/* <img src="gs://portofolio-ca562.appspot.com/zzzz.png" alt="" /> */}
                        </div>
                        <div className="detail">
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
