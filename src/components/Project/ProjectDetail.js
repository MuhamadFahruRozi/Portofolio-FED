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
            const res = await axios.get(`https://portofolio-api-mfr.herokuapp.com/api/projects/${idetail.slug}`)
            console.log(res.data)
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
                    {/* <pre> */}
                    {detail.desc}
                    {/* </pre> */}
                </div>
            <Carousel slides={image} key={image.pic_id} />
            </div>
        </div>
    )
}

export default ProjectDetail
