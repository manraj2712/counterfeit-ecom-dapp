
"use client"
import React, { useEffect, useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductComponent from './Product';
import { CircularProgress } from '@mui/material';
import { Product } from '@/types';
import { getAllProducts } from '@/lib/actions';



export const PreviousBtn = () => {
    return (
        <div className="" onClick={() => { }}>
            <ArrowBackIosIcon style={{ color: 'blue' }} fontSize='medium' />
        </div>
    )
}

export const NextBtn = () => {
    return (
        <div className="" onClick={() => { }}>
            <ArrowForwardIosIcon style={{ color: 'blue' }} fontSize='medium' />
        </div>
    )
}

const ProductsCarousel = ({ title }: { title: string }) => {
    const [products, setProducts] = useState<Array<Product>>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const val = products ? Math.min(products.length, 5) : 5;

    // console.log(products);
    var settings = {
        autoplay: true,
        autoplaySpeed: 2000,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: val,
        slidesToScroll: 1,
        initialSlide: 1,
        prevArrow: <PreviousBtn />,
        nextArrow: <NextBtn />,
    };

    // const addwishlist = (elem)=>{
    //   dispatch(AddWish(elem))
    // } 



    useEffect(() => {
        setLoading(true)
        getAllProducts().then((res) => {
            setProducts(res)
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setLoading(false)
        })
    }, [])


    return (
        <div className='flex mt-4 bg-white border-3 shadow-sm'>
            <div className=' flex-1 py-2 overflow-hidden'>
                <div className=' border-b p-4'>
                    <h1 className=' text-xl font-bold capitalize'>{title}</h1>

                </div>
                <div className='p-3 flex justify-center'>
                    {!loading ?
                        <div className=' w-full '>


                            <Slider {...settings}>
                                {
                                    products && products.map((elem, index) => {

                                        return (
                                            <ProductComponent key={index} product={elem} index={index} />
                                        )
                                    })

                                }
                            </Slider>
                        </div>
                        : <CircularProgress className=' text-center' />
                    }
                </div>


            </div>
        </div>
    )
}

export default ProductsCarousel