
"use client";
import { useContext, useEffect, useState } from 'react'
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Badge } from '@mui/material';
import Link from 'next/link';
import { StateContext } from '@/context/GlobalState';
import Primarydropdown from './PrimaryDropdown';
import Secondarydropdown from './SecondaryDropdown';



const Header = () => {

  const [toggleprimary, setToggleprimary] = useState(false)
  const [togglesecondary, setToggleSecondary] = useState(false)


  const primarytoggle = () => {
    setToggleprimary(!toggleprimary)
  }
  const secondarytoggle = () => {
    setToggleSecondary(!togglesecondary)
  }


  useEffect(() => {
    setToggleprimary(false)
    setToggleSecondary(false)
  }, [])

  const { connectWallet, contract, provider, signer, account } = useContext(StateContext);

  return (
    <div className=' sticky z-50 px-7 py-3 top-0 p-1.5 capitalize w-full justify-between gap-10 flex items-center text-white bg-blue-500 '>

      {/* bg-[#923ca1] */}

      {/* logo and search container starts */}
      <div className=' flex gap-8  justify-around items-center '>
        <div className='italic font-bold'>
          <Link href={'/'}><h1 className='font-extrabold text-[1.32rem]'>CryptoCommerce</h1></Link>
          <h6 className=' text-xs'>No <span className=' text-yellow-300'>Counterfeit <StarOutlineIcon fontSize='small' /></span>  </h6>
        </div>
      </div>
      {/* logo and search container ends */}

      {/* right container start */}
      <div className=' flex items-center gap-10 font-bold relative'>
        {
          (contract && provider && signer) ?
            <div onClick={primarytoggle} className=' cursor-pointer flex gap-1'>
              <h1 className='capitalize'> {account}</h1>
              <span className=' relative  cursor-pointer'>
                {toggleprimary ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </span>
            </div>
            :
            <>
              <button onClick={primarytoggle} className=' px-10 py-1 bg-white font-semibold rounded-sm text-blue-500'>
                Login
              </button>
            </>

        }
        {toggleprimary && <Primarydropdown toggleprimary={toggleprimary} />}

        {/* <span onClick={secondarytoggle} className=' relative  cursor-pointer'>More
          <span className=' px-1'>
            {togglesecondary ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </span>
        </span> */}

        {/* {togglesecondary && <Secondarydropdown />} */}


      </div>
      {/* right container end */}

    </div>
  )
}

export default Header