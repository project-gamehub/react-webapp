import React from "react";
import "../styles/carousel.css";
import { NO_BANNER_FOUND_URL } from "../utils/constant";

// Splide
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link, useParams } from "react-router-dom";

const Carousel = ({ data }) => {
    const { gameslug } = useParams();
    return (
        <div className="carasoul">
            <div className="tpover"></div>
            {data.comingSoon ? (
                <h2 className="play-button"> Coming Soon </h2>
            ) : (
                <button type="button" className="play-button">
                    <Link className="play-button-link" to={"/play/" + gameslug}>
                        Play Now
                    </Link>
                </button>
            )}
            <Splide
                options={{
                    rewind: true,
                    gap: "1rem"
                }}
                className="spl"
            >
                {data.banners && data.banners.length > 0 ? (
                    data.banners.map((bannerLink, idx) => {
                        return (
                            <SplideSlide>
                                <img
                                    className="banner"
                                    src={bannerLink}
                                    alt={`Banner ${idx}`}
                                />
                            </SplideSlide>
                        );
                    })
                ) : (
                    <SplideSlide>
                        <img
                            className="banner"
                            src={NO_BANNER_FOUND_URL}
                            alt={`No banner found`}
                        />
                    </SplideSlide>
                )}
            </Splide>
        </div>
    );
};

export default Carousel;
