"use client"

import { StateContext } from "@/context/GlobalState"
import { getProductDetailsFromDb } from "@/lib/actions";
import { Product } from "@/types";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react"
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import SellIcon from '@mui/icons-material/Sell';
import { toast } from "react-toastify";
import ProductsCarousel from "@/components/Home/ProductsCarousel";
import LifeCycleStepper from "@/components/LifecycleStepper";
import QRCode from "react-qr-code";
import { ethers } from "ethers";

const purchaseCustomer = async (contract: any, id: string, amount: { value: bigint }) => {
    if (contract) {
        try {
            await contract.purchaseCustomer(id, amount);
            toast.success("Transaction Successful");
        }
        catch (err: any) {
            toast.error(err.message.slice(0, 100));
        }
    }
    else {
        toast.error("Please connect to metamask");
    }
}

const getProductDetails = async (contract: any, id: string, onNotFound: () => void) => {
    if (contract) {
        const res = await contract.products(id);
        if (res.id === '') {
            onNotFound();
            throw new Error("Product not found");
        }
        const product = await getProductDetailsFromDb(id);

        // convert price from string to bigint

        const productDetails: Product = {
            name: res.name,
            id: res.id,
            manufacturer: res.manufacturer,
            manufacturerName: res.manufacturerName,
            price: BigInt(res.price),
            status: res.status,
            customer: res.customer,
            distributor: res.distributor,
            distributorName: res.distributorName,
            retailer: res.retailer,
            retailerName: res.retailerName,
            image: product.image
        }
        return productDetails;
    }
    else {
        toast.error("Please connect to metamask");
        return {} as Product;
    }
}

function ProductDetails() {
    const { contract } = useContext(StateContext);
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState<Product | null>(null);
    const [productNotFound, setProductNotFound] = useState(false);

    const { id } = useParams();
    useEffect(() => {
        if (!id || !contract) return;
        getProductDetails(contract, id as string, () => { setProductNotFound(true) }).then((res) => {
            setProduct(res);
        }).catch((err) => {
            toast.error(err.message);
        }).finally(() => {
            setLoading(false);
        })
    }, [contract, id]);

    return (
        (product && !loading) ?
            <div className=' flex flex-col'>
                <div className=' p-3 flex bg-white  '>

                    {/* <left part start> */}
                    <div className=' w-[35%]  flex-1 flex flex-col p-6'>
                        {/* img container */}

                        <div className=' top-20 sticky'>
                            <img loading='lazy' className='hover:scale-105 cursor-pointer transition-all mx-auto w-80' src={product?.image} alt="" />
                            <div className=' my-8 flex items-center gap-4 justify-between'>
                                {/* <button
                                    onClick={() => { }}
                                    className={`bg-[#fb641b] rounded w-full text-lg font-bold text-white py-3`}>
                                    <ShoppingCartIcon /> Add to cart
                                </button> */}
                                <button
                                    disabled={product.status != "Sold to Retailer"}
                                    onClick={() => {
                                        if (product.status != "Sold to Retailer") {
                                            toast.error("Product not available to buy");
                                            return;
                                        }
                                        purchaseCustomer(contract, product.id, { value: ethers.parseEther((parseInt(product.price.toString()) * 0.01).toString()) });
                                    }}
                                    className={`w-full bg-[#fb641b] rounded text-lg font-bold py-3 text-white disabled:bg-neutral-300 disabled:cursor-not-allowed `}><ShoppingBagIcon className="text-md" /> Buy Now
                                </button>
                            </div>
                        </div>

                    </div>
                    {/* <!-- right container starts > */}
                    <div className=' p-4 px-8 w-[65%]'>
                        {/* <!-- Heading container> */}
                        <div className=' flex flex-col gap-2'>
                            {/* <!--Heading> */}
                            <h1 className=' capitalize text-xl text-[#212121] font-semibold'>{product.name}
                            </h1>
                            {/* <!--Heading> */}
                            {/* <!--rating> */}
                            <div className=' flex gap-4 items-center'>
                                <div className=' font-bold flex gap-2 w-fit items-center text-sm bg-green-700 text-white py-[.1rem] px-2 rounded-sm'>
                                    <h2>{
                                        // random rating
                                        (Math.random() * 5).toFixed(1)
                                    }</h2>
                                    <StarIcon className="text-base" />
                                </div>
                                <h1 className=' text-neutral-600 text-sm font-medium'>
                                    {
                                        // random number of ratings
                                        (Math.random() * 10000).toFixed(0)
                                    } Ratings & {
                                        // random number of reviews
                                        (Math.random() * 100).toFixed(0)
                                    } Reviews
                                </h1>
                            </div>
                            {/* <!--Heading> */}

                            <h1 className=' text-sm font-bold text-green-600 '>Special Price</h1>
                            <h1 className=' font-bold text-2xl tracking-wide'>{product.price.toString()} ETH

                                <del className=' mx-4 text-neutral-600 font-semibold text-sm' > {parseInt(product.price.toString()) * 2} ETH</del>
                                <span className=' text-green-600 text-base'>
                                    {50}%
                                </span>
                            </h1>

                        </div>
                        {/* <!-- Heading container> */}
                        <div className="mb-10 mt-7 flex align-middle">
                            <QRCode value={process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/${product.id}` : `http://localhost:3000/${product.id}`} height={"10px"} width={"10px"} />
                            <LifeCycleStepper product={product} />
                        </div>
                        {/* <!-- offer continer> */}
                        <div className=' border my-4 border-neutral-200'>
                            <h1 className=' border-b border-neutral-200 p-3 text-lg font-bold capitalize tracking-wide text-neutral-700'>Available offers</h1>
                            <ul className='flex flex-col p-4 gap-3'>
                                <li className=' flex gap-3 items-center'>
                                    <SellIcon className=' text-green-600' />
                                    <p>Buy this Product and Get Extra ₹500 Off </p>
                                </li>
                                <li className=' flex gap-3 items-center'>
                                    <SellIcon className=' text-green-600' />
                                    <p>Buy this Product and Get Extra 10% cashback </p>
                                </li>
                                <li className=' flex gap-3 items-center'>
                                    <SellIcon className=' text-green-600' />
                                    <p>Bank OfferFlat ₹200 off on HDFC Bank Credit/Debit Card on 3 months EMI Txns, Min Txn Value ₹10,000</p>
                                </li>
                                <li className=' flex gap-3 items-center'>
                                    <SellIcon className=' text-green-600' />
                                    <p>Partner OfferSign-up for Flipkart Pay Later & get free Times Prime Benefits worth ₹10,000* </p>
                                </li>

                            </ul>
                        </div>
                        {/* <!-- offer continer> */}


                    </div>
                </div>
                <ProductsCarousel title="Related Products" />
            </div>
            : productNotFound ? <div className='flex justify-center items-center h-screen'>
                <p className='text-2xl font-bold'>Product Not Found</p>
            </div> : <div className='flex justify-center items-center h-screen'>
                <p className='text-2xl font-bold'>Loading...</p>
            </div>
    )
}


export default ProductDetails