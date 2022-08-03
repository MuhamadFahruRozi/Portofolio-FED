import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { RiDeleteBack2Fill } from "react-icons/ri"

const ProjectList = ({data, onDeletePro, user}) => {
  let navigate = useNavigate();
    return (
        <>
          <div className="card">
                {user === true ?
                  <>
                    <i className="delprolabel" onClick={() => onDeletePro(data.slug)}><RiDeleteBack2Fill /></i>
                    <i className="editprolabel">
                    <Button className="edit__btn" onClick={() => navigate(`/project/edit/${data.slug}`)}>
                      Edit
                    </Button>
                    </i>
                  </>
                  :
                  <></>
                } 
              <div className="project__body">
                <div className="project__image">
                    <img src={data.thumbImg_url} alt="" />
                </div>
                  <h3 className="project__title">{data.title}</h3>
                  <p className="project__description">{data.desc}</p>
              </div>
              <div className="btn">
                <div className="visit__link">
                  <Button className="visit__btn" onClick={() => window.open(`${data.adress}`,'_blank')} 
                  disabled={data.adress === "" || null ? true : false}>
                      Visit Website
                  </Button>
                  <Button className="code__btn" onClick={() => window.open(`${data.gitAdress}`,'_blank')}
                  disabled={data.gitAdress === "" || null ? true : false}>
                      Code
                  </Button>
                </div>
                <Button className="view__btn" onClick={() => navigate(`/project/${data.slug}`)} >View Detail</Button>
              </div>
          </div>
        </>
    )
}

export default ProjectList
