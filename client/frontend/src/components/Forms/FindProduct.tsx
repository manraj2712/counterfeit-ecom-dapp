import { useState, useContext } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from "next/navigation";

function FindProduct({ open, setOpen }: { open: boolean, setOpen: (e: boolean) => void }) {
    const [form, setForm] = useState({
        productId: "",
    });

    const router = useRouter();


    const handleInputChange = ({
        value,
        fieldName,
    }: {
        value: string;
        fieldName: string;
    }) => {
        setForm((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            router.push(`/product/${form.productId}`);
        } catch (err) {
            console.log(err);
        }
    }
    return open ? (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={() => { 
                console.log("clicked outside");
                setOpen(false) }}>
            </div>
            <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                    <div className="flex justify-end">
                        <CloseIcon onClick={() => {
                            console.log("clicked");
                            setOpen(false);
                        }} />
                    </div>
                    <div className="max-w-sm mx-auto py-3 text-center">
                        <h4 className="text-lg font-medium text-gray-800">
                            Find Product
                        </h4>
                        <p className="text-[15px] text-gray-600">
                            Enter product id to find product
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="relative mt-7">
                                <input minLength={3} type="text" placeholder="40dea64d-497a-4aca-83c3-56e28434098b" className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border-neutral-500 border-[1px] focus:border-blue-600 shadow-sm rounded-lg" onChange={(e) => {
                                    handleInputChange({ value: e.target.value, fieldName: "productId" });
                                }}></input>
                            </div>
                            <button onClick={handleSubmit} className="block w-full mt-5 py-3 px-4 font-medium text-sm text-center text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg rind-offset-2 rind-blue-600 focus:ring-2">
                                Find Product
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    ) : <></>
}

export default FindProduct