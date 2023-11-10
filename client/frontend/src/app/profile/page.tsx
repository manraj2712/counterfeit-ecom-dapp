"use client";
import { useState } from "react";
import { DropDown, Table } from "@/components";
import { useRouter } from "next/navigation";
import { Role } from "@/types";
import FindProduct from "@/components/Forms/FindProduct";

function Services() {

    const router = useRouter();
    const [role, setRole] = useState("Customer");
    const [open, setOpen] = useState(false);
    console.log(open);
    return (
        <>
            <div className="flex justify-end mr-10 mt-14">
                <DropDown options={[
                    {
                        title: "Customer", onTap: (role: string) => {
                            setRole(role);
                        }
                    },
                    {
                        title: "Manufacturer", onTap: (role: string) => {
                            setRole(role);
                        }
                    },
                    {
                        title: "Distributor", onTap: (role: string) => {
                            setRole(role);
                        }
                    },
                    {
                        title: "Retailer", onTap: (role: string) => {
                            setRole(role);
                        }
                    },
                ]} />
            </div>
            <div className="grid grid-cols-3 auto-cols-max gap-3 m-10 gap-y-14 justify-items-center pt-10">

                <div onClick={() => {
                    setRole("Manufacturer");
                    router.push("/add-product");
                }} className="cursor-pointer bg-blue-600 px-16 h-[12rem] flex items-center justify-center rounded-md">
                    <p className="text-white font-bold text-2xl">Add Product</p>
                </div>
                <div
                    onClick={() => {
                        router.push("/");
                    }}
                    className="bg-blue-600 h-[12rem] px-16 flex items-center justify-center rounded-md cursor-pointer">
                    <p className="text-white font-bold text-2xl">Explore Products</p>
                </div>
                <div
                    className="bg-blue-600 h-[12rem] px-16 flex items-center justify-center rounded-md cursor-pointer">
                    <p onClick={
                        () => {
                            setOpen((e) => true);
                        }

                    } className="text-white font-bold text-2xl">Track Product</p>
                    <FindProduct open={open} setOpen={(e) => {
                        setOpen((e) => false);
                    }} />
                </div>
            </div>
            <div className="pt-20 mb-10">
                <Table role={
                    getRoleFromSelectedRole(role)
                } />
            </div>
        </>
    )
}

function getRoleFromSelectedRole(role: string): Role {
    role = role.toLowerCase();
    switch (role) {
        case "customer":
            return Role.CUSTOMER
        case "distributor":
            return Role.DISTRIBUTOR
        case "retailer":
            return Role.RETAILER
        case "manufacturer":
            return Role.MANUFACTURER
        default:
            return Role.CUSTOMER
    }
}



export default Services;