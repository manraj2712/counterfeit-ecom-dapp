"use client";
import { useState } from "react";
import { DropDown, Table } from "@/components";
import { useRouter } from "next/navigation";
import { Role } from "@/types";

function Services() {

    const router = useRouter();
    const [role, setRole] = useState("Customer");
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
                    router.push("/add-product");
                }} className="cursor-pointer bg-blue-600 px-16 h-[12rem] flex items-center justify-center rounded-md">
                    <p className="text-white font-bold text-2xl">Add Product</p>
                </div>
                <div className="bg-blue-600 h-[12rem] px-16 flex items-center justify-center rounded-md">
                    <p className="text-white font-bold text-2xl">Add Product</p>
                </div>
                <div className="bg-blue-600 h-[12rem] px-16 flex items-center justify-center rounded-md">
                    <p className="text-white font-bold text-2xl">Add Product</p>
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
    console.log("changed");
    console.log(role);
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