import { RiDeleteBack2Fill } from 'react-icons/ri'
const WebSkills = ({isibed, isifed, onDeleteFED, onDeleteBED, user}) => {
    return (
        <div className="skills">
            <div className="skill-group">
                <div className="skill-title">
                    <h4>Front-End</h4>
                </div>
                <div className="skill-logo">
                    {isifed.map((fed) => (
                        <div className="single-skill" key={fed.slug}>
                            <img src={fed.pic_url} alt="" />
                            {/* <label key={fed._id} htmlFor="feddel" className="dellabel"><RiDeleteBack2Fill /></label> */}
                            {user && <i className='dellabel' onClick={() => onDeleteFED(fed.slug)}><RiDeleteBack2Fill /></i>}
                            {/* <button className="feddel" id="feddel" onClick={() => console.log(fed._id)}>del</button> */}
                        </div>
                    ))}
                </div>
            </div>
            <hr />
            <div className="skill-group">
                <div className="skill-title">
                <h4>Back-End</h4>
                </div>
                <div className="skill-logo">
                {isibed.map((bed) => (
                        <div className="single-skill" key={bed.slug}>
                            <img src={bed.pic_url} alt="" />
                            {user && <i className='dellabel' onClick={() => onDeleteBED(bed.slug)}><RiDeleteBack2Fill /></i>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default WebSkills