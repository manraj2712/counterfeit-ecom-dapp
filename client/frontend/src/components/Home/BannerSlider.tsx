"use client"
import React from 'react'
import Slider from 'react-slick'
import Banner from "@/assets/bannner.jpg";
import Banner1 from "@/assets/banner1.webp";
import Banner2 from "@/assets/banner2.png";
import Banner3 from "@/assets/banner3.png"
import Banner4 from "@/assets/banner4.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './carousel.css'
import Image from 'next/image'


export const PreviousBtn = ({ className, onClick }: { className: string, onClick: () => void }) => {
    return (
        <div className={className} onClick={onClick}>
            <ArrowBackIosIcon style={{ color: 'blue' }} fontSize='medium' />
        </div>
    )
}

export const NextBtn = ({ className, onClick }: { className: string, onClick: () => void }) => {
    return (
        <div className={className} onClick={onClick}>
            <ArrowForwardIosIcon style={{ color: 'blue' }} fontSize='medium' />
        </div>
    )
}

const BannerSlider = () => {


    var settings = {
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PreviousBtn className='' onClick={() => { }} />,
        nextArrow: <NextBtn className='' onClick={() => { }} />,
    };


    return (
        <div className=" w-full rounded-sm relative overflow-hidden">
            <Slider {...settings}>
                <Image loading='lazy' className=' h-72  object-cover' src={Banner} alt="" />
                <Image loading='lazy' className=' h-72  object-cover' src={Banner1} alt="" />
                <Image loading='lazy' className=' h-72  object-cover' src={Banner2} alt="" />
                <Image loading='lazy' className=' h-72  object-cover' src={Banner3} alt="" />
                <Image loading='lazy' className=' h-72  object-cover' src={Banner4} alt="" />
            </Slider>

        </div>
    )
}

export default BannerSlider