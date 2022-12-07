import { useState, useEffect } from "react"
import axios from "axios"
import { FaUserCircle } from "react-icons/fa"
import { RiLockPasswordFill } from "react-icons/ri"
import { useNavigate } from "react-router-dom"

const Auth = ({ authentication }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [match, setMatch] = useState('')
    const [picture, setPicture] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const getHome = async () => {
            const res = await axios.get('https://web-production-0799.up.railway.app/api/home/Home-955-60-816');
            const myHome = res.data.pic_url;
            setPicture(myHome);
        }
        getHome()

        const user = async () => {
            const res = await axios.get('https://web-production-0799.up.railway.app/api/user/RED-11445588');
            setMatch(res.data)
        }
        user()
    },[])

    const login = (e) => {
        e.preventDefault();
        authentication();
        navigate('/homeedit')
    }

    return (
        <div className="main">
            <div className="content login">
                <div className="homecontent">
                    <div className="pic">
                        {
                            <img src={picture} alt="" />
                        }
                    </div>
                    <form onSubmit={login}>
                    <div className="login-form">
                        <div className="input-icon">
                            <i><FaUserCircle /></i>
                            <input type="text"
                            placeholder="Usename"
                            className="login-input"
                            onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="input-icon">
                            <i><RiLockPasswordFill /></i>
                            <input type="password"
                            placeholder="Password"
                            className="login-input"
                            onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        {   
                            username === match.username &&
                            password === match.password ? (
                                <input type="submit" value="Login" className="login-button"/>
                            ) : (
                                <input type="submit" value="Login" className="login-button disabled" disabled/>
                            )
                        }
                    </div>
                    </form>
                    
                </div>
            </div>
        </div>
    )
}

export default Auth
