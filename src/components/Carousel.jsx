import React from "react";
import "../styles/carousel.css";

// Splide
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";

const Carousel = ({ data }) => {
    console.log(data);
    return (
        <div className="carasoul">
            <div className="tpover"></div>
            {data.isLive ? (
                <Link to={data.gameLink}>
                    <button className="is-live-render"> Play Now </button>
                </Link>
            ) : (
                <h2 className="is-live-render"> Coming Soon </h2>
            )}
            <div className="play-game-btn"></div>
            <Splide
                options={{
                    rewind: true,
                    gap: "1rem"
                }}
                className="spl"
            >
                <SplideSlide>
                    <img src={`https://picsum.photos/1000/500`} alt="mage 1" />
                </SplideSlide>
                <SplideSlide>
                    <img src="https://picsum.photos/1001/500" alt="mage 2" />
                </SplideSlide>
                <SplideSlide>
                    <img src="https://picsum.photos/999/500" alt="mage 3" />
                </SplideSlide>
            </Splide>
        </div>
    );
};

export default Carousel;
