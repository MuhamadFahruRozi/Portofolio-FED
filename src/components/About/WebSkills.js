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
                            <img className="skill-image" src={fed.pic_url} alt="" />
                            {user && <i className='dellabel' onClick={() => onDeleteFED(fed.slug)}><RiDeleteBack2Fill /></i>}
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
                            <img className="skill-image" src={bed.pic_url} alt="" />
                            {user && <i className='dellabel' onClick={() => onDeleteBED(bed.slug)}><RiDeleteBack2Fill /></i>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default WebSkills