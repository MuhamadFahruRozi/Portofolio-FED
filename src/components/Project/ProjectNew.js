import { useState } from "react"
import axios from 'axios'

const ProjectNew = () => {
    const [projectID, setProjectID] = useState('')
    const [title, setTitle] = useState('')
    const [thumb, setThumb] = useState('')
    const [gitActive, setGitActive] = useState("false")
    const [gitAdress, setGitAdress] = useState('')
    const [active, setActive] = useState("false")
    const [adress, setAdress] = useState('')
    const [description, setDesciption] = useState('')
    const [preThumb, setPreThumb] = useState('')
    const handleFile = (e) => {
        setThumb(e.target.files[0])

        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2) {
                setPreThumb(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    const [images, setImages] = useState([])
    const [previewImages, setPreviewImages] = useState([])
    const handleImages = (e) => {
        const files = e.target.files;
        const selectedFilesArray = Array.from(files)

        const imagesArray = selectedFilesArray.map((gbr) => {
            return URL.createObjectURL(gbr)
        });

        setImages(selectedFilesArray)
        setPreviewImages(imagesArray)
    }

    const gitLineOption = (e) => {
        setGitActive(e.target.value)
        setGitAdress("")
    }

    const lineOption = (e) => {
        setActive(e.target.value)
        setAdress("")
    }

    const AddProject = (e) => {
        e.preventDefault();
    
        let formData = new FormData();
        formData.append('project_id', projectID);
        formData.append('title', title)
        formData.append('gitAdress', gitAdress)
        formData.append('adress', adress)
        formData.append('thumbImg', thumb);
        formData.append('desc', description)
        images.forEach((pic) => {
            formData.append('images', pic)
        })
        

        const url ='https://portofolio-api-mfr.herokuapp.com/api/projects';

        axios.post(url, formData).then(res => {
            alert("Project successfuly added!")
        }).catch(err =>{
            console.log(err)
        })
    };

    return (
        <div className="main">
            <div className="content">
            <form onSubmit={AddProject} encType="multipart/form-data">
                <div className="row">
                    <div className="name-label">
                        <label>Project ID</label><label className="must-input">*</label>
                    </div>
                    <div className="input-form project">
                        <input type="text" 
                        onChange={(e) => setProjectID(e.target.value)} 
                        name="project-id" 
                        id="project-id" 
                        placeholder="Project ID (min 5 letter)" required/>
                    </div>
                </div>
                <div className="row">
                    <div className="name-label">
                        <label>Title</label><label className="must-input">*</label>
                    </div>
                    <div className="input-form project">
                        <input type="text" 
                        onChange={(e) => setTitle(e.target.value)} 
                        name="project-title" 
                        id="project-title" 
                        placeholder="Project Title (min 5 letter)" required/>
                    </div>
                </div>
                <div className="row">
                    <div className="name-label">
                        <label>Github Code Adress</label>
                    </div>
                    <div className="input-form project adress">
                        <select name="git-option" id="git-option" value={gitActive} onChange={gitLineOption} >
                            <option value="false" >Offline</option>
                            <option value="true" >Online</option>
                        </select>
                        <input type="text" 
                        onChange={(e) => setGitAdress(e.target.value)} 
                        name="project-git-adress" 
                        id="project-git-adress"
                        value={gitAdress} 
                        placeholder="Github Adress" 
                        disabled={
                            gitActive === "true" ? false : true
                        }/>
                    </div>
                </div>
                <div className="row">
                    <div className="name-label">
                        <label>Website Adress</label>
                    </div>
                    <div className="input-form project adress">
                        <select name="line-option" id="line-option" value={active} onChange={lineOption} >
                            <option value="false" >Offline</option>
                            <option value="true" >Online</option>
                        </select>
                        <input type="text" 
                        onChange={(e) => setAdress(e.target.value)} 
                        name="project-adress" 
                        id="project-adress"
                        value={adress} 
                        placeholder="Website Adress" 
                        disabled={
                            active === "true" ? false : true
                        }/>
                    </div>
                </div>
                <div className="row">
                    <div className="name-label">
                        <label>Description</label><label className="must-input">*</label>
                    </div>
                    <div className="input-form project">
                        <textarea 
                        onChange={(e) => setDesciption(e.target.value)} 
                        className="project-desc" 
                        id="project-desc" 
                        cols="70" rows="20" 
                        placeholder="About Project (min 10 letter)" required></textarea>
                    </div>
                </div>
                <div className="row new-image">
                    <div className="input-form thumbnail">
                        <label htmlFor="project-thumb" className="imageLabel">Choose Project Thumbnail</label>
                        <input type="file" 
                        onChange={handleFile}  
                        className="project-thumb" 
                        id="project-thumb" required/>
                    </div>
                    <div className="all-upload-images">
                        <div className="preview thumbnail-images">
                        {
                            preThumb && 
                            <img 
                            src={preThumb} 
                            alt=""
                            className="prev-images-new"
                            height="200" 
                            width="200" />
                        }
                        </div>
                    </div>
                </div>
                <div className="row new-image">
                    <div className="input-form">
                        <label htmlFor="project-images" 
                        className="imageLabel">
                            Choose Project Images
                        </label>
                        <input type="file" 
                        onChange={handleImages} 
                        name="project-images" 
                        id="project-images"
                        multiple required />
                    </div>
                    <div className="upload-image-button">
                            {
                                previewImages.length > 0 &&
                                (previewImages.length > 12 ? (
                                    <p className="over-upload">
                                        You can upload up to 12 images! <br/>
                                    </p>
                                ) : (
                                    <></>
                                ))
                            }
                    </div>
                    <div className="all-upload-images">
                    {
                        previewImages &&
                        previewImages.map((gbr, index) => {
                            return(
                                <div key={index} className="preview all-images">
                                    <img
                                    src={gbr} alt="" 
                                    className="prev-images-new"
                                    height="200" 
                                    width="200"
                                    />
                                    <p>{index+1}</p>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
                <div className="newProject-upload-button">
                    {
                        previewImages.length === 0 ||
                        previewImages.length > 12 ||
                        preThumb.length === 0 ||
                        projectID.length < 5 ||
                        title.length < 5 ||
                        description.length < 10 ? (
                            <input type="submit" value="Upload Project" className="save-project disabled" disabled/>
                        ) : (
                            <input type="submit" value="Upload Project" className="save-project"/>
                        )
                    }
                </div>
            </form>
            </div>
        </div>
    )
}

export default ProjectNew
