import ProjectList from "./ProjectList"
import Pagination from "../Pagination/Pagination";
import { useState, useEffect } from "react";
import axios from "axios";

const Project = ({user}) => {
    const [prolist, setProlist] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [projectPerPage] = useState(4)
    useEffect(() => {
        const getlist = async () => {
            const res = await axios.get('https://portofolio-api-mfr.herokuapp.com/api/projects')
            console.log(res.data)
            setProlist(res.data)
        }
        getlist();
    }, [])

    const indexLastProject = currentPage * projectPerPage;
    const indexFirstProject = indexLastProject - projectPerPage;
    const currentProject = prolist.slice(indexFirstProject, indexLastProject);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const onDeletePro = (delpro) => {
        const res = axios.delete(`https://portofolio-api-mfr.herokuapp.com/api/projects/${delpro}`);
        const remainingProList = prolist.filter((result) => result.slug !== delpro)
        setProlist(remainingProList)
        console.log(res)
    }
    return (
        <div className="main">
            <div className="content">
                <div className="project_cards">
                    {
                        currentProject.map((project) => 
                        ( <ProjectList key={project.project_id} 
                            data={project} 
                            onDeletePro={onDeletePro}
                            user={user}  /> 
                        ))
                        // prolist.map((project) => ( <ProjectList key={project.project_id} id={project._id} img={project.thumbImg_url} title={project.title} description={project.desc} onDeletePro={onDeletePro} /> ))
                    }
                </div>
                <Pagination projectPerPage={projectPerPage} totalProject={prolist.length} 
                paginate={paginate} currentPage={currentPage}
                setCurrentPage={setCurrentPage} />
            </div>
        </div>

    )
}

export default Project
