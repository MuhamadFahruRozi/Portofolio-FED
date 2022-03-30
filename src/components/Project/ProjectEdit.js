import { useState, useEffect } from "react"
import axios from 'axios'
import { useParams } from "react-router-dom";

const ProjectNew = () => {
    const [projectID, setProjectID] = useState('')
    const [title, setTitle] = useState('')
    const [thumb, setThumb] = useState('')
    const [preThumb, setPreThumb] = useState('')
    const [gitActive, setGitActive] = useState("false")
    const [gitAdress, setGitAdress] = useState('')
    const [active, setActive] = useState("false")
    const [adress, setAdress] = useState('')
    const [description, setDesciption] = useState('')
    const [proImages, setProImages] = useState('')
    const [prevImages, setPrevImages] = useState('')

    const idetail = useParams();

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`http://localhost:3000/api/projects/${idetail.slug}`)
            console.log(res.data)
            const myData = res.data.Project;
            const myImages = res.data.Image;
            setProjectID(myData.project_id)
            setTitle(myData.title)
            setPreThumb(myData.thumbImg_url)
            setGitActive("true")
            setGitAdress(myData.gitAdress)
            setActive("true")
            setAdress(myData.adress)
            setProjectID(myData.project_id)
            setDesciption(myData.desc)
            setPrevImages(myImages)
        }
        getData();
    }, [idetail])

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

    const handleImages = (e) => {
        const files = e.target.files;
        const selectedFilesArray = Array.from(files)

        const imagesArray = selectedFilesArray.map((gbr) => {
            return URL.createObjectURL(gbr)
        });

        setProImages(selectedFilesArray)
        setPrevImages(imagesArray)
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

        const url =`http://localhost:3000/api/projects/${idetail.slug}`;

        let formData = new FormData();
        formData.append('title', title)
        formData.append('gitAdress', gitAdress)
        formData.append('adress', adress)
        formData.append('desc', description)
        if(thumb !== ""){
            formData.append('thumbImg', thumb);    
        }
        axios.put(url, formData).then(res => {
            console.log(res)
            alert("Project successfuly changed!")
        }).catch(err =>{
            console.log(err)
        })

        // if(proImages !== ""){
        //     proImages.forEach((pic) => {
        //         formData.append('images', pic)
        //     })
        // }
        // formData.append('thumbImg', thumb);
        // formData.append('desc', description)
        // images.forEach((pic) => {
        //     formData.append('images', pic)
        // })
        
        console.log({description, title, projectID, adress, gitAdress, thumb, proImages})
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
                        value={projectID}
                        placeholder="Project ID (min 5 letter)" disabled/>
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
                        value={title}
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
                        value={description}
                        placeholder="About Project (min 10 letter)" required></textarea>
                    </div>
                </div>
                <div className="row new-image">
                    <div className="input-form thumbnail">
                        <label htmlFor="project-thumb" className="imageLabel">Choose Project Thumbnail</label>
                        <input type="file" 
                        onChange={handleFile}  
                        className="project-thumb" 
                        id="project-thumb" />
                    </div>
                    <div className="all-upload-images">
                        <div className="preview thumbnail">
                        {
                            preThumb && 
                            <img 
                            src={preThumb} 
                            alt=""
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
                        multiple />
                    </div>
                    <div className="upload-image-button">
                            {
                                prevImages.length > 0 &&
                                (prevImages.length > 12 ? (
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
                        prevImages &&
                        prevImages.map((gbr, index) => {
                            return(
                                <div key={index} className="preview">
                                    <img
                                    src={gbr.pic_url} alt="" 
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
                    {/* {
                        previewImages.length === 0 ||
                        previewImages.length > 12 ||
                        preThumb.length === 0 ||
                        projectID.length < 5 ||
                        title.length < 5 ||
                        description.length < 10 ? (
                            <input type="submit" value="Upload Project" className="save-project disabled" disabled/>
                        ) : ( */}
                            <input type="submit" value="Upload Project" className="save-project"/>
                        {/* )
                    } */}
                </div>
            </form>
            </div>
        </div>
    )
}

export default ProjectNew
