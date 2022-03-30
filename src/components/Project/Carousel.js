import "./Carousel.css";
import {MdOutlineArrowBackIos, MdOutlineArrowForwardIos} from "react-icons/md" 
import { useState } from "react";


const Carousel = ({ slides }) => {
    const [gambar, setGambar] = useState(0);
    const panjang = slides.length;

    const nextSlide = () => {
        setGambar( gambar === panjang - 1 ? 0 : gambar + 1);
    }

    const prevSlide = () => {
        setGambar( gambar === 0 ? panjang - 1 : gambar - 1);
    }

    if(!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }

    if(!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }

    return (

        <div className="carousel">
        {/* <section className="slider" style={{ textAlign: "center"}}> */}
            <MdOutlineArrowBackIos className="left-arrow" onClick={prevSlide} />
            <MdOutlineArrowForwardIos className="right-arrow" onClick={nextSlide} />
            {slides.map((sd, index) => {
                return (
                    <div key={sd.pic_id} className={index === gambar ? "slide-active" : "slide"}>
                    {index === gambar && (
                    <>
                        <img src={sd.pic_url} alt="" className="detail-images" />
                        <h1 className="title">{sd.title}</h1>
                    </>
                    )}
                    </div>
                    // className={index === gambar ? "slide active" : "slide"} key={index}
                )
            })}
        {/* </section>         */}
        </div>
    )
}

export default Carousel
