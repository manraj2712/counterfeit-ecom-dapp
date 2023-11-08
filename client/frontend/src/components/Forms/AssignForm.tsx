import { StateContext } from "@/context/GlobalState";
import { ethers } from "ethers";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import CloseIcon from '@mui/icons-material/Close';
import { Product, Role } from "@/types";

function AssignForm({ product, open, setOpen, role }: { role: Role, product: Product, open: boolean, setOpen: (e: boolean) => void }) {
    const [form, setForm] = useState({
        distributorName: "",
        distributorAddress: ethers.ZeroAddress,
        retailerName: "",
        retailerAddress: ethers.ZeroAddress,
    });

    const { contract } = useContext(StateContext);

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
            if (role === Role.MANUFACTURER) {
                const tx = await contract.setDistributor(form.distributorName, product.id, form.distributorAddress);
                toast.info("Distributor assigned successfully");
            }
            else if (role === Role.DISTRIBUTOR) {
                const tx = await contract.setRetailer(form.retailerName, product.id, form.retailerAddress);
                toast.info("Retailer assigned successfully");
            }
        } catch (err) {
            console.log(err);
        }
    }
    return open ? (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={() => { setOpen(false) }}>
            </div>
            <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                    <div className="flex justify-end">
                        <CloseIcon onClick={() => {
                            setOpen(false);
                        }} />
                    </div>
                    <div className="max-w-sm mx-auto py-3 text-center">
                        <h4 className="text-lg font-medium text-gray-800">
                            {product.name}
                        </h4>
                        <p className="text-[15px] text-gray-600">
                            {product.id}
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="relative mt-7">
                                <input minLength={3} type="text" placeholder={role === Role.MANUFACTURER ? "Distributor Name" : "Retailer Name"} className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border-neutral-500 border-[1px] focus:border-blue-600 shadow-sm rounded-lg" onChange={(e) => {
                                    handleInputChange({ value: e.target.value, fieldName: role === Role.MANUFACTURER ? "distributorName" : "retailerName" });
                                }}></input>
                            </div>
                            <div className="relative mt-5">
                                <input pattern="0x[a-fA-F0-9]{40}" type="text" placeholder={role === Role.MANUFACTURER ? "Distributor Account Address" : "Retailer Account Address"} className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-blue-600 shadow-sm rounded-lg" onChange={(e) => {
                                    handleInputChange({ value: e.target.value, fieldName: role === Role.MANUFACTURER ? "distributorAddress" : "retailerAddress" });
                                }}></input>
                            </div>
                            <button onClick={handleSubmit} className="block w-full mt-5 py-3 px-4 font-medium text-sm text-center text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg rind-offset-2 rind-blue-600 focus:ring-2">
                                Assign Distributor
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    ) : <></>
}

export default AssignForm