import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AiFillFacebook, AiOutlineMail } from "react-icons/ai"
import { BiLeftArrow, BiRightArrow } from "react-icons/bi"
import { GiSecurityGate } from "react-icons/gi"
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
                <i><AiFillFacebook className={ link1 === false ? "media-link" : "media-link active"} onClick={onlink1}/></i>
                <i><AiOutlineMail className={ link2 === false ? "media-link" : "media-link active"} onClick={onlink2}/></i>
                <i><AiOutlineMail className={ link3 === false ? "media-link" : "media-link active"} onClick={onlink3}/></i>
                {
                    left && right === true ? 
                    <i><GiSecurityGate onClick={() => navigate(`/${pathRoute}`)} /></i> :
                    <></>
                }
                <i><BiLeftArrow className={ right === false ? "media-link lgl" : "media-link lgl set"} onClick={ocl} /></i>
                <i><BiRightArrow className={ left === false ? "media-link lgr" : "media-link lgr set"} onClick={ocr} /></i>
            </div>
            <div className="social-links">
                <div className="social-link">
                    <i><BiLeftArrow className={link1 || link2 || link3 ? "arrow-left" : ""} /></i>
                    {link1 &&
                        <a className="social-href" href="mewew">mewwwwwwwwwwwwwwwwwwwwwwwwww1</a>
                    }
                    {link2 &&
                        <a className="social-href" href="mewew">mewwwwwwwww</a>
                    }
                    {link3 &&
                        <a className="social-href" href="mewew">mewwwwwwwwwddddddddddddddddddddddd4</a>
                    }              
                    <i><BiRightArrow className={link1 || link2 || link3 ? "arrow-right" : ""} /></i>
                </div>
            </div>
        </div>
    )
}

export default Footer