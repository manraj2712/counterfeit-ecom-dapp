import "./navbar.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link';

const Primarydropdown = ({ setTogglePrimary }: { setTogglePrimary: (e: boolean) => void }) => {
    const nav = [
        {
            title: "My Profile",
            icon: <AccountCircleIcon />,
            redirect: "/profile"
        },
        // {
        //     title: "Flipkart plus zone",
        //     icon: <AddCircleOutlineIcon />,
        //     redirect: ""
        // }, {
        //     title: "orders",
        //     icon: <AddCardIcon />,
        //     redirect: "account/orders"
        // }, {
        //     title: "whislist",
        //     icon: <FavoriteIcon />,
        //     redirect: "/wishlist"
        // }, {
        //     title: "rewards",
        //     icon: <EmojiEventsIcon />,
        //     redirect: ""
        // },
        // {
        //     title: "Gift cards",
        //     icon: <RedeemIcon />,
        //     redirect: ""
        // },
    ]


    return (
        <div className=' dropdown absolute w-60 -left-16 top-12 bg-white shadow-2xl rounded flex-col text-sm'>
            {

                nav.map((elem, index) => {
                    return (
                        <Link key={index} href={elem.redirect}>
                            <div onClick={() => {
                                setTogglePrimary(false)
                            }} className='p-4 border-b font-semibold hover:bg-slate-100  gap-4 text-primary flex items-center'>
                                <div>{elem.icon}</div>
                                <h6 className=' text-[#212121]'>{elem.title}</h6>
                            </div>
                        </Link>

                    )
                })
            }
        </div>
    )
}

export default Primarydropdown