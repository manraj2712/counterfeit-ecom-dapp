"use client";
import { StateContext } from "@/context/GlobalState";
import { Product, Role } from "@/types";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AssignForm from "./Forms/AssignForm";
import { toast } from "react-toastify";
import { ethers } from "ethers";

const findProductsForManufacturer = async (contract: any) => {
    if (contract) {
        const res = await contract.findProductsForManufacturer();
        return res;
    }
    else {
        toast.error("Please connect to metamask");
        return [] as Array<Product>;
    }
}

const findProductsForCustomer = async (contract: any) => {
    if (contract) {
        try {

            const res = await contract.findProductsForCustomer();
            return res;
        }
        catch (err: any) {
            toast.error(err.message.slice(0, 100));
            return [] as Array<Product>;
        }
    }
    else {
        toast.error("Please connect to metamask");
        return [] as Array<Product>;
    }
}
const findProductsForRetailer = async (contract: any) => {
    if (contract) {

        try {
            const res = await contract.findProductsForRetailer();
            return res;
        }
        catch (err: any) {
            toast.error(err.message.slice(0, 100));
            return [] as Array<Product>;
        }
    }
    else {
        toast.error("Please connect to metamask");
        return [] as Array<Product>;
    }
}
const findProductsForDistributor = async (contract: any) => {
    if (contract) {
        try {
            const res = await contract.findProductsForDistributor();
            return res;
        }
        catch (err: any) {
            toast.error(err.message.slice(0, 100));
            return [] as Array<Product>;
        }
    }
    else {
        toast.error("Please connect to metamask");
        return [] as Array<Product>;
    }
}

const purchaseDistributor = async (contract: any, id: string, amount: { value: bigint }) => {
    if (contract) {
        try {
            const res = await contract.purchaseDistributor(id, amount);
            await res.wait();
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
const purchaseRetailer = async (contract: any, id: string, amount: { value: bigint }) => {
    if (contract) {
        try {
            const res = await contract.purchaseRetailer(id, amount);
            await res.wait();
            toast.success("Transaction Successful");
        }
        catch (err: any) {
            toast.error(err.message.slice(0, 100));
        }
    }
}
function Table({ role }: { role: Role }) {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<Array<Product>>([]);
    const { contract } = useContext(StateContext);
    const router = useRouter();
    useEffect(() => {
        setIsLoading(true);
        switch (role) {
            case Role.CUSTOMER:
                findProductsForCustomer(contract).then((res) => {
                    setIsLoading(false);
                    setProducts(res);
                });
                break;
            case Role.DISTRIBUTOR:
                findProductsForDistributor(contract).then((res) => {
                    setIsLoading(false);
                    setProducts(res);
                });
                break;
            case Role.RETAILER:
                findProductsForRetailer(contract).then((res) => {
                    setIsLoading(false);
                    setProducts(res);
                });
                break;
            case Role.MANUFACTURER:
                findProductsForManufacturer(contract).then((res) => {
                    setIsLoading(false);
                    setProducts(res);
                });
                break;
            default:
                break;
        }
    }, [contract, role]);
    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="items-start justify-between md:flex">
                <div className="max-w-lg">
                    <h3 className="text-neutral-800 text-xl font-bold sm:text-2xl">
                        Your Products
                    </h3>
                    <p className="text-neutral-600 mt-2">
                        Here is a list of products you have..
                    </p>
                </div>
                {role === Role.MANUFACTURER && <div className="mt-3 md:mt-0 cursor-pointer">
                    <p onClick={() => {
                        router.push("/add-product");
                    }} className="inline-block px-4 py-2 text-white duration-150 font-medium bg-yellow-400 hover:bg-blue-600 active:bg:bg-neutral-900 md:text-sm rounded-lg">
                        Add Product
                    </p>
                </div>}
            </div>
            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-neutral-50 text-neutral-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-6">Name</th>
                            <th className="py-3 px-6">Status</th>
                            <th className="py-3 px-6">Manufacturer</th>
                            <th className="py-3 px-6">Distributor</th>
                            <th className="py-3 px-6">Retailer</th>
                            <th className="py-3 px-6">Price</th>
                            <th className="py-3 px-6">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-neutral-600 divide-y">
                        {isLoading ? <tr><td>Loading...</td></tr> : products.map(product => {
                            return (
                                <tr key={product.id}>
                                    <td className="py-3 px-6 whitespace-nowrap">{product.name}</td>
                                    <td className="py-3 px-6 whitespace-nowrap">{product.status}</td>
                                    <td className="py-3 px-6 whitespace-nowrap">{product.manufacturerName}</td>
                                    <td className="py-3 px-6 whitespace-nowrap">{product.distributorName || "-"}</td>
                                    <td className="py-3 px-6 whitespace-nowrap">{product.retailerName || "-"}</td>
                                    <td className="py-3 px-6 whitespace-nowrap">{`${product.price} ETH`}</td>
                                    <td>
                                        {
                                            <GetAction role={role} product={product} contract={contract} />
                                        }
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table


function GetAction({ role, product, contract }: { role: Role, product: Product, contract: any }) {

    console.log(product.retailerName);

    const [actionFormOpen, setActionFormOpen] = useState(false);
    if (role === Role.DISTRIBUTOR && product.status === "Assigned to Distributor")
        return (<div className="mt-3 md:mt-0 cursor-pointer">
            <p onClick={() => {
                purchaseDistributor(contract, product.id, { value: ethers.parseEther((parseInt(product.price.toString()) * 0.01).toString()) })
            }} className="inline-block px-2 py-1 text-white duration-150 font-medium bg-blue-700 hover:bg-blue-600 active:bg:bg-blue-900 md:text-sm rounded-lg">
                Make Payment
            </p>
        </div>)
    else if (role === Role.DISTRIBUTOR && product.status === "Sold to Distributor") {
        return (
            <div className="mt-3 md:mt-0 cursor-pointer">
                <p onClick={() => {
                    setActionFormOpen(true);
                }} className="inline-block px-2 py-1 text-white duration-150 font-medium bg-blue-700 hover:bg-blue-600 active:bg:bg-blue-900 md:text-sm rounded-lg">
                    Assign Retailer
                </p>
                <AssignForm product={product} open={actionFormOpen} setOpen={setActionFormOpen} role={role} />
            </div>
        )
    }
    else if (role === Role.MANUFACTURER && product.status === "Manufactured")
        return (<div className="mt-3 md:mt-0 cursor-pointer">
            <p onClick={() => {
                setActionFormOpen(true);
            }} className="inline-block px-2 py-1 text-white duration-150 font-medium bg-blue-700 hover:bg-blue-600 active:bg:bg-blue-900 md:text-sm rounded-lg">
                Assign Distributor
            </p>
            <AssignForm product={product} open={actionFormOpen} setOpen={setActionFormOpen} role={role} />
        </div>)
    else if (role === Role.RETAILER && product.status === "Assigned to Retailer")
        return (<div className="mt-3 md:mt-0 cursor-pointer">
            <p onClick={() => {
                purchaseRetailer(contract, product.id, { value: ethers.parseEther((parseInt(product.price.toString()) * 0.01).toString()) })
            }} className="inline-block px-2 py-1 text-white duration-150 font-medium bg-blue-700 hover:bg-blue-600 active:bg:bg-blue-900 md:text-sm rounded-lg">
                Make Payment
            </p>
        </div>)
    else
        return <>-</>
}