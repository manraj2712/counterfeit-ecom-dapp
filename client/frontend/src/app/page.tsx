import React, { Suspense } from 'react'

// import TopProducts from './dealcontainer/TopProducts'
// import MetaData from '../layout/MetaData';
import BannerSlider from '@/components/Home/BannerSlider';
import ProductsCarousel from "@/components/Home/ProductsCarousel";

// const SliderComponent = React.lazy(() => import('./productslider/Productslider'));


const Home = () => {
  return (
    <div className=' -z-50'>
      {/* <MetaData title={"CryptoCommerce | Home"}/> */}
      {/* benner slider  */}
      <div className='p-4 flex flex-col gap-4'>

        <BannerSlider />
        {/* deal container */}

        <Suspense fallback={<div>Loading...</div>}>
          <section>
            {/* <Dealcontainer/>  */}
            {/* <SliderComponent category={"electronics"} />
            <SliderComponent category={"women's clothing"} />
             */}
            <ProductsCarousel title="Top Selling Products" />
          </section>
        </Suspense>

      </div>

    </div>
  )
}

export default Home