import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AiFillFacebook, AiFillLinkedin } from "react-icons/ai"
import { BiLeftArrow, BiRightArrow } from "react-icons/bi"
import { GiSecurityGate } from "react-icons/gi"
import { SiGmail } from "react-icons/si"

const Footer = ({ pathRoute }) => {
    const [left, setLeft] = useState(false)
    const [right, setRight] = useState(false)
    const [link1, setLink1] = useState(false)
    const [link2, setLink2] = useState(false)
    const [link3, setLink3] = useState(false)

    const ocl = () => {
        setLeft(!left)
    }

    const ocr = () => {
        setRight(!right)
    }

    const onlink1 = () => {
        setLink1(!link1)
        setLink2(false)
        setLink3(false)
    }

    const onlink2 = () => {
        setLink1(false)
        setLink2(!link2)
        setLink3(false)
    }

    const onlink3 = () => {
        setLink1(false)
        setLink2(false)
        setLink3(!link3)
    }

    let navigate = useNavigate();
    
    return (
        <div className="footer">
            <div className="socialmedia">
                <i><AiFillFacebook className={ link1 === false ? "media-link fb" : "media-link fb on"} onClick={onlink1}/></i>
                <i><SiGmail className={ link2 === false ? "media-link email" : "media-link email on"} onClick={onlink2}/></i>
                <i><AiFillLinkedin className={ link3 === false ? "media-link linkedin" : "media-link linkedin on"} onClick={onlink3}/></i>
                {
                    left && right === true ? 
                    <i><GiSecurityGate className="gate" onClick={() => navigate(`/${pathRoute}`)} /></i> :
                    <></>
                }
                <i><BiLeftArrow className={ right === false ? "media-link lgl" : "media-link lgl set"} onClick={ocl} /></i>
                <i><BiRightArrow className={ left === false ? "media-link lgr" : "media-link lgr set"} onClick={ocr} /></i>
            </div>
            <div className="social-links">
                <div className="social-link">
                    <i><BiLeftArrow className={link1 || link2 || link3 ? "arrow-left" : ""} /></i>
                    {link1 &&
                        <a className="social-href" target="_blank" rel="noreferrer" href="https://web.facebook.com/profile.php?id=100080110477430">@Muhamad Fahru Rozi</a>
                    }
                    {link2 &&
                        <a className="social-href" href="#0">muh.fahrurozi.13618@gmail.com</a>
                    }
                    {link3 &&
                        <a className="social-href" target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/muhamad-fahru-rozi-603466224">www.linkedin.com/in/muhamad-fahru-rozi-603466224</a>
                    }              
                    <i><BiRightArrow className={link1 || link2 || link3 ? "arrow-right" : ""} /></i>
                </div>
            </div>
        </div>
    )
}

export default Footer