import WebSkills from "./WebSkills"
import {useState, useEffect} from 'react'
import axios from 'axios'

const About = () => {
    const [about, setAbout] = useState('')
    const [fed, setFed] = useState([])
    const [bed, setBed] = useState([])

    useEffect(() => {
        const getAbout = async () => {
            const res = await axios.get('https://portofolio-api-mfr.herokuapp.com/api/about/About-144-867-936');
            console.log(res);
            setAbout(res.data.about);
            setFed(res.data.fed);
            setBed(res.data.bed)
        }
        getAbout();
    },[])

    return (
        <div className="main">
            <div className="content">
                <div className="aboutme">
                    <div className="webskills">
                        <WebSkills isifed={fed} isibed={bed}/>
                    </div>
                    <a href="https://drive.google.com/file/d/1kMFmrlZqeqwGjV5sROgKtZl9549O5vHz/view?usp=sharing" 
                    target="_blank" rel="noreferrer" className="resume-button">
                    <div className="resume">
                    Resume    
                    </div>
                    </a>
                    <div className="detail">
                        <h1 style={{textAlign:"center", paddingBottom:"20px" }}>About me</h1>
                        <p>
                            {about.desc}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
