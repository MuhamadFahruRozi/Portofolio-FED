import WebSkills from "./WebSkills"
import {useState, useEffect} from 'react'
import axios from 'axios'
import Aos from 'aos'

const About = () => {
    const [about, setAbout] = useState('')
    const [fed, setFed] = useState([])
    const [bed, setBed] = useState([])
    const [portrait, setPortrait] = useState('')

    useEffect(() => {
        const getAbout = async () => {
            const res = await axios.get('https://web-production-0799.up.railway.app/api/about/About-144-867-936');
            setAbout(res.data.about);
            setFed(res.data.fed);
            setBed(res.data.bed)
        }
        getAbout();
        const getHome = async () => {
            const res = await axios.get('https://web-production-0799.up.railway.app/api/home/Home-955-60-816');
            const myHome = res.data.pic_url;
            setPortrait(myHome);
        }
        getHome()
    },[])

    useEffect(() => {
        Aos.init({ duration:2000 });
    },[])

    return (
        <div className="main">
            <div className="content">
                <div className="aboutme">
                    <div className="webskills">
                        <WebSkills isifed={fed} isibed={bed}/>
                    </div>
                    <hr className="res-border"/>
                    <a href="https://drive.google.com/file/d/1_CDc_pBofdPRw_t9GKR5YQrxiFcYVJJ2/view" 
                    target="_blank" rel="noreferrer" className="resume-button">
                    <div className="resume">
                    Resume    
                    </div>
                    </a>
                    <hr className="res-border"/>
                    <div className="detail">
                        <h1 style={{textAlign:"center", paddingBottom:"20px" }}>About me</h1>
                        <div  data-aos="fade-left" data-aos-delay="2000">
                            <p>
                                <img className="portrait" alt="" src={portrait} />
                                {about.desc}
                            </p>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
