import { useState, useEffect, useRef } from "react"
import axios from "axios"
import WebSkills from "./WebSkills"
import { BiImageAdd } from "react-icons/bi"


const AboutEdit = ({ user }) => {
    const [about, setAbout] = useState('')
    const [fed, setFed] = useState([])
    const [bed, setBed] = useState([])
    // const [resInput, setResInput] = useState(0)
    const [refresh, setRefresh] = useState(0)

    // if(resInput !== resInput+1){
    //     setRefresh(data => data+1)
    // }

    // if(resInput === 1){
        
    //     // const interval = setInterval(() => {
    //     //     getAbout();

    //     // }, 2 * 1000)
    // }
    const timerender = useRef(null)
    useEffect(() => {
        const getAbout = async () => {
            const res = await axios.get('https://portofolio-api-mfr.herokuapp.com/api/about/About-144-867-936');
            console.log(res);
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
        // const name = "FED-"+Math.floor(Math.random() * 100 + 1)
        // console.log(name)
        const files = e.target.files;
        const selectedFilesArray = Array.from(files)

        const imageArray = selectedFilesArray.map((gbr) => {
            return URL.createObjectURL(gbr)
        });

        // const imageUpload = imageArray.map( async (up) => {
        //     return await fetch(up);
        // })

        // const reader = new FileReader();
        // reader.onload = () => {
        //     if(reader.readyState === 2) {
        //         setPrevFed(reader.result)
        //     }
        // }
        // reader.readAsDataURL(e.target.files[0])
        
        // setPrevFed((prevImages) => prevImages.concat(imageArray))
        // setNewFed((prevImages) => prevImages.concat(selectedFilesArray))
        setPrevFed(imageArray)
        setNewFed(selectedFilesArray)

        // const getBlob = () => {
        //     const config = { responseType: 'blob' };
        //     const blobUrl = prevFed;
        //     const bl = axios.get(blobUrl, config).then(response => {
        //         new File([response.data], __filename);       
        //     });
        //     setNewFed(bl.data)
        // }
        // getBlob();
    }
    console.log(prevFed)
    console.log(newFed)
    
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
    console.log(prevBed)
    console.log(newBed)
    
    
    const onSubmitFED = async (e) => {
        e.preventDefault()
        // if(!prevFed) {
        //     alert('Please input Front-End skills')
        // }
        
        let formData = new FormData();
        newFed.forEach((data) => {
            formData.append('image', data)
        })
        // newFrontEnd => formData.append('image', newFrontEnd
        // formData.append('image', newFed);
        const url ='https://portofolio-api-mfr.herokuapp.com/api/about/fed';

        const upload = axios.post(url, formData).then(res => {
            alert("Front-End skill(s) successfuly added!")
            console.log(res);
        }).catch(err =>{
            console.log(err)
        })
        // .then(setRefresh(old => old+1))
        // const selectedFilesArray = Array.from(newFed)
        // const fedArray = selectedFilesArray.map((gbr) => {
        //     return URL.createObjectURL(gbr)
        // });
        // setFed(...fed, fedArray)
        timerender.current = setTimeout(() => setRefresh(data => data+1), 6000);        
        console.log(upload)
    }

    const onSubmitBED = async (e) => {
        e.preventDefault()
        
        let formData = new FormData();
        newBed.forEach((data) => {
            formData.append('image', data)
        })
        
        const url ='https://portofolio-api-mfr.herokuapp.com/api/about/bed';

        const upload = axios.post(url, formData).then(res => {
            alert("Back-End skill(s) successfuly added!")
            console.log(res)
        }).catch(err =>{
            console.log(err)
        })
        
        timerender.current = setTimeout(() => setRefresh(data => data+1), 6000);
        console.log(upload)
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
            console.log(res)
            alert("Bio successfuly changed!")
        }).catch(err =>{
            console.log(err)
        })
        timerender.current = setTimeout(() => setRefresh(data => data+1), 6000);
    }

    const deleteFed = (delfed) => {
        const res = axios.delete(`https://portofolio-api-mfr.herokuapp.com/api/about/fed/${delfed}`);
        const remainingFed = fed.filter((result) => result.slug !== delfed)
        setFed(remainingFed)
        console.log(res)
    }

    const deleteBed = (delbed) => {
        const res = axios.delete(`https://portofolio-api-mfr.herokuapp.com/api/about/bed/${delbed}`);
        const remainingBed = bed.filter((result) => result.slug !== delbed)
        setBed(remainingBed)
        console.log(res)
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
                                        {/* <span>
                                            Please delete <b>{prevFed.length - 12}</b> image{prevFed.length-12 === 1 ? "" : "s"}
                                        </span> */}
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
                                            {/* <button onClick={() => setPrevFed(prevFed.filter((e) => e !== gbr))} >
                                                delete
                                            </button> */}
                                            {/* <p>{index+1}</p> */}
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
                                        {/* <span>
                                            Please delete <b>{prevBed.length - 12}</b> image{prevBed.length-12 === 1 ? "" : "s"}
                                        </span> */}
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
                                            // height="200" 
                                            width="250px"
                                            />
                                            {/* <button onClick={() => setPrevBed(prevBed.filter((e) => e !== gbr))} >
                                                delete
                                            </button> */}
                                            {/* <p>{index+1}</p> */}
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
