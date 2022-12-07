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
            const res = await axios.get('https://web-production-0799.up.railway.app/api/projects')
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
        axios.delete(`https://web-production-0799.up.railway.app/api/projects/${delpro}`);
        const remainingProList = prolist.filter((result) => result.slug !== delpro)
        setProlist(remainingProList)
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
