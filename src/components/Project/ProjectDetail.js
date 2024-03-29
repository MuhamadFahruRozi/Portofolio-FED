import Carousel from "./Carousel"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProjectDetail = () => {
    const [detail, setDetail] = useState('');
    const [image, setImage] = useState([])
    const idetail = useParams();
    
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`https://web-production-0799.up.railway.app/api/projects/${idetail.slug}`)
            setDetail(res.data.Project)
            setImage(res.data.Image)
        }
        getData();
    }, [idetail])

    return (
        <div className="main">
            <div className="content">
                <h2 className="project-title">{detail.title}</h2>
                <div className="thumbnail-project">
                    <img src={detail.thumbImg_url} alt="" />
                </div>
                <div className="detail">
                    <div>
                        {detail.desc}
                    </div>
                    <div className="url-div">
                        URL:
                        <input type="text" className="url-visit-detail" value={detail.adress} />
                        <div className="url-visit-button" onClick={() => window.open(`${detail.adress}`,'_blank')}>
                            Visit Website
                        </div>
                    </div>
                </div>
            <Carousel slides={image} key={image.pic_id} />
            </div>
        </div>
    )
}

export default ProjectDetail
