import { Nav } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { AiOutlineHome  } from "react-icons/ai"
import { GiDiploma } from "react-icons/gi"
import { FaProjectDiagram } from "react-icons/fa"
import { BsChevronDoubleRight, BsChevronDoubleLeft } from "react-icons/bs"
import { BiLogOutCircle } from "react-icons/bi"
import { useState } from "react"

const Sidebar = ({ authentication }) => {
    const [show, setShow] = useState(false)
    const navigate = useNavigate()

    const toggleOn = () => {
        setShow(true)
    }

    const toggleOff = () => {
        setShow(false)
    }

    const logout = () => {
        authentication()
        navigate('/')
    }

    return (
        <div className={ show === false ? "sidebar-showoff" : "sidebar-showon"}>
            <div className="sidebar-group">
                <h4>Edit</h4>
                <Nav>
                    <ul className="nav__sidebar">
                        <li><i><AiOutlineHome /></i><Link to="/homeedit" >Home</Link></li>
                        <li><i><GiDiploma /></i><Link to="/aboutedit" >About</Link></li>
                        <li><i><FaProjectDiagram /></i><Link to="/project/add" >Project</Link></li>
                        <li onClick={logout}><i ><BiLogOutCircle /></i><Link to="/">Log Out</Link></li>
                    </ul>
                </Nav>
            </div>
            {show === false ? 
                <i className="toggle-on" onClick={toggleOn}><BsChevronDoubleRight /></i>
                : 
                <i className="toggle-off" onClick={toggleOff}><BsChevronDoubleLeft /></i>
            }    
        </div>
    )
}

export default Sidebar

















