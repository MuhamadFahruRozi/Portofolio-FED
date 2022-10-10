import { useState, useEffect, useRef } from "react"
import axios from "axios"
import WebSkills from "./WebSkills"
import { BiImageAdd } from "react-icons/bi"


const AboutEdit = ({ user }) => {
    const [about, setAbout] = useState('')
    const [fed, setFed] = useState([])
    const [bed, setBed] = useState([])
    const [refresh, setRefresh] = useState(0)

    const timerender = useRef(null)
    useEffect(() => {
        const getAbout = async () => {
            const res = await axios.get('https://portofolio-api-mfr.herokuapp.com/api/about/About-144-867-936');
            setAbout(res.data.about.desc);
            setFed(res.data.fed);
            setBed(res.data.bed)
        }
        getAbout();
        return () => clearTimeout(timerender.current);
    },[refresh])

    const [prevFed, setPrevFed] = useState([])
    const [newFed, setNewFed] = useState([])
    const handleFileFED = (e) => {
        const files = e.target.files;
        const selectedFilesArray = Array.from(files)

        const imageArray = selectedFilesArray.map((gbr) => {
            return URL.createObjectURL(gbr)
        });

        setPrevFed(imageArray)
        setNewFed(selectedFilesArray)
    }
    
    const [prevBed, setPrevBed] = useState([])
    const [newBed, setNewBed] = useState([])
    const handleFileBED = (e) => {
        const files = e.target.files;
        const selectedFilesArray = Array.from(files)

        const imageArray = selectedFilesArray.map((gbr) => {
            return URL.createObjectURL(gbr)
        });

        setPrevBed(imageArray)
        setNewBed(selectedFilesArray)
    }
    
    const onSubmitFED = async (e) => {
        e.preventDefault()
        
        let formData = new FormData();
        newFed.forEach((data) => {
            formData.append('image', data)
        })
        
        const url ='https://portofolio-api-mfr.herokuapp.com/api/about/fed';

        axios.post(url, formData).then(res => {
            alert("Front-End skill(s) successfuly added!")
        }).catch(err =>{
            console.log(err)
        })
        
        timerender.current = setTimeout(() => setRefresh(data => data+1), 6000);
    }

    const onSubmitBED = async (e) => {
        e.preventDefault()
        
        let formData = new FormData();
        newBed.forEach((data) => {
            formData.append('image', data)
        })
        
        const url ='https://portofolio-api-mfr.herokuapp.com/api/about/bed';

        axios.post(url, formData).then(res => {
            alert("Back-End skill(s) successfuly added!")
        }).catch(err =>{
            console.log(err)
        })
        
        timerender.current = setTimeout(() => setRefresh(data => data+1), 6000);
    }

    const onSubmitBio = (e) => {
        e.preventDefault()
        if(!about) {
            alert('Please input your bio')
        }

        let formData = new FormData();
        formData.append('desc', about);
        
        const url ='https://portofolio-api-mfr.herokuapp.com/api/about/About-144-867-936';

        axios.put(url, formData).then(res => {
            alert("Bio successfuly changed!")
        }).catch(err =>{
            console.log(err)
        })
        timerender.current = setTimeout(() => setRefresh(data => data+1), 6000);
    }

    const deleteFed = (delfed) => {
        axios.delete(`https://portofolio-api-mfr.herokuapp.com/api/about/fed/${delfed}`);
        const remainingFed = fed.filter((result) => result.slug !== delfed)
        setFed(remainingFed)
    }

    const deleteBed = (delbed) => {
        axios.delete(`https://portofolio-api-mfr.herokuapp.com/api/about/bed/${delbed}`);
        const remainingBed = bed.filter((result) => result.slug !== delbed)
        setBed(remainingBed)
    }

    return (
            <div className="main">
                <div className="content">
                    <h1 className="edit-title">Edit About</h1>
                    <div className="aboutme">
                        <WebSkills isifed={fed} isibed={bed} onDeleteFED={deleteFed} onDeleteBED={deleteBed}  user={user}/>
                    </div>
                <form onSubmit={onSubmitFED}>
                    <div className="row new-image">
                        <div className="input-form">
                            <label htmlFor="new-fed" for="new-fed" className="imageLabel">
                                <BiImageAdd />
                                {/* &nbsp; */}
                                Add Front-End Skills
                            </label>
                            <input type="file" 
                            id="new-fed" 
                            className="new-fed" 
                            onChange={handleFileFED}
                            multiple
                            max-uploads="1"
                            accept="image/jpg, image/jpeg, image/png, image/jpg, image/webp, image/gif" />
                        </div>
                        <div className="upload-image-button">
                            {
                                prevFed.length > 0 &&
                                (prevFed.length > 3 ? (
                                    <p className="over-upload">
                                        You can upload up to 3 images! <br/>
                                    </p>
                                ) : (
                                    <button className="upload-button" onClick={() => {
                                        console.log("Upload Images")
                                    }}>
                                    Upload {prevFed.length} Image{prevFed.length === 1 ? "" : "s"}
                                    </button>
                                ))
                            }
                        </div>
                        <div className="all-upload-images">
                            {
                                prevFed &&
                                prevFed.map((gbr, index) => {
                                    return(
                                        <div key={index} className="preview">
                                            <img
                                            src={gbr} alt="" 
                                            width="250px"
                                             />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </form>
                <form onSubmit={onSubmitBED}>
                    <div className="row new-image">
                        <div className="input-form">
                        <label htmlFor="new-bed" for="new-bed" className="imageLabel">
                                <BiImageAdd />
                                {/* &nbsp; */}
                                Add Back-End Skills
                            </label>
                            <input type="file" 
                            id="new-bed" 
                            className="new-bed" 
                            onChange={handleFileBED}
                            multiple
                            accept="image/jpg, image/jpeg, image/png, image/jpg, image/webp, image/gif" />
                        </div>
                        <div className="upload-image-button">
                            {
                                prevBed.length > 0 &&
                                (prevBed.length > 3 ? (
                                    <p className="over-upload">
                                        You can upload up to 3 images! <br/>
                                    </p>
                                ) : (
                                    <button className="upload-button" onClick={() => {
                                        console.log("Upload Images")
                                    }}>
                                    Upload {prevBed.length} Image{prevBed.length === 1 ? "" : "s"}
                                    </button>
                                ))
                            }
                        </div>
                        <div className="all-upload-images">
                            {
                                prevBed &&
                                prevBed.map((gbr, index) => {
                                    return(
                                        <div key={index} className="preview">
                                            <img
                                            src={gbr} alt="" 
                                            width="250px"
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </form>
                <form onSubmit={onSubmitBio}>
                    <div className="row bio">
                        <h1 style={{textAlign:"center", paddingBottom:"20px" }}>About me</h1>
                        <div className="input-form">
                        <textarea value={about} onChange={(e) => setAbout(e.target.value)} 
                        className="isiBio" id="isiBio" placeholder="Add Bio (min 10 letter)" />
                        </div>
                    </div>
                    {
                        about.length < 10 ? (
                            <input id="save-about disabled" 
                            className="save-about disabled" 
                            type="submit" 
                            value="Save" disabled/>
                        ) : (
                            <input id="save-about" 
                            className="save-about" 
                            type="submit" 
                            value="Save" />
                        )
                    }
                </form>
                </div>
            </div>
    )
}

export default AboutEdit
