import { useState, useEffect } from "react"
import axios from 'axios'
import { MdFileUpload } from 'react-icons/md'

const HomeEdit = () => {
    const [home, setHome] = useState('')
    const [gambar, setGambar] = useState('')
    const [preview, setPreview] = useState('')
    useEffect(() => {
        const getHome = async () => {
            const res = await axios.get('https://web-production-0799.up.railway.app/api/home/Home-955-60-816');
            const myHome = res.data;
            setHome(myHome.desc);
            setPreview(myHome.pic_url);
        }
        getHome()
    }
    , []);

    const changeHome = (e) => {
        e.preventDefault();
        
        const url ='https://web-production-0799.up.railway.app/api/home/Home-955-60-816';

        if(gambar === ""){
            let formData = new FormData();
            formData.append('desc', home)
            axios.put(url, formData).then(res => {
                alert("Home successfuly changed!")
            }).catch(err =>{
                console.log(err)
            })
        }else{
            let formData = new FormData();
            formData.append('image', gambar);
            formData.append('desc', home)
            axios.put(url, formData).then(res => {
                alert("Home successfuly changed!")
            }).catch(err =>{
                console.log(err)
            })
        }
    };

    const handleDesc = (e) => {
        setHome(e.target.value)
    }

    const handleFile = (e) => {
        setGambar(e.target.files[0])
        
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2) {
                setPreview(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }
    
    return (
        <div className="main">
            <div className="content">
            <form onSubmit={changeHome} encType="multipart/form-data">
                <div className="row">
                    <h1 style={{ textAlign: "center", marginTop: "10px" }}>Edit Home</h1>
                    <div className="pic">
                        {
                            <img src={preview} alt="" />
                        }
                        <div className="backoverlay">

                        </div>
                        <div className="overlay">
                            <label className="iconover" 
                            htmlFor="image">
                                <i><MdFileUpload /></i>
                            </label>
                            <input className="image" 
                            id="image" type="file" 
                            placeholder="Add Picture" 
                            onChange={handleFile} />
                        </div>
                    </div>
                </div>
                <div className="greeting">
                            <h4>
                                Hi,
                            </h4>
                            <h1>
                                I'm Muhamad Fahru Rozi
                            </h1>
                        </div>
                <div className="row isihome">
                    <div className="input-form">
                        <textarea value={home} 
                        onChange={handleDesc} 
                        className="desc" id="desc"
                        cols="75" rows="20" 
                        placeholder="Add Profile (min 10 letter)"></textarea>
                        {
                            home.length < 10 ? (
                                <input id="savehome disabled" 
                                className="savehome disabled" 
                                type="submit" 
                                value="Save" disabled/>
                            ) : (
                                <input id="savehome" 
                                className="savehome" 
                                type="submit" 
                                value="Save" />
                            )
                        }
                    </div>
                </div>
            </form>
            </div>
        </div>
        
    )
}

export default HomeEdit
