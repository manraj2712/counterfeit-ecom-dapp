import React from 'react'
import { CircularProgress } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Link from 'next/link';
import { Product } from '@/types';


const ProductComponent = ({ product, index }: { product: Product, index: number }) => {

    return (
        <div className=' border p-2 m-3 border-neutral-200'>

            <span
                onClick={() => { }}
                className={`${' text-gray-300'}  cursor-pointer mb-3 w-full flex justify-end`}>
                <FavoriteIcon className="text-neutral-300"/>
            </span>
            <Link href={`/product/${product.id}`}>
                <div key={index} className='p-2 gap-2 capitalize flex flex-col justify-center items-center'>
                    <div className=' flex flex-col relative justify-center items-center'>
                        <img loading='lazy' className='h-32  hover:scale-[1.07] transition-all' src={product.image?.toString()} alt={`${product.name} Image`} />
                        <CircularProgress className=' absolute -z-50' />
                    </div>
                    <div className=' p-2 flex flex-col gap-3 justify-center items-start'>
                        <h1 className=' font-medium my-2 text-base'>{product.name.slice(0, 40) + "...."}</h1>
                        <div className=' flex gap-4 items-center'>
                            <div
                                className=' font-medium flex gap-2 w-fit items-center text-sm bg-green-700 text-white py-[.1rem] px-2 rounded-sm'>
                                <h2>{
                                    // random rating
                                    Math.floor(Math.random() * (5 - 1 + 1)) + 1
                                }</h2>
                                <StarIcon className="text-base"/>
                            </div>
                            <h1 className=' text-gray-500 text-sm font-bold'>({
                                // random number of reviews
                                Math.floor(Math.random() * (10000 - 1 + 1)) + 1
                            })</h1>
                        </div>

                        <h1 className=' font-bold text-base'>{product.price.toString()} ETH
                            <del className=' mx-2 text-gray-500 font-bold text-sm' >{(parseInt(product.price.toString()) * 2)} ETH</del>
                            <span className=' text-green-600 text-base'>
                                {"50"}%
                            </span>
                        </h1>
                    </div>
                </div>
            </Link>



        </div>
    )
}

export default ProductComponent