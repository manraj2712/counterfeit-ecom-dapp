"use client";
import Image from "next/image";
import { useContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation";
import FormFeild from "../FormField";
import { StateContext } from "@/context/GlobalState";
import { prisma } from "@/providers/PrismaProvider";
import { createProduct, uploadImage } from "@/lib/actions";
import Button from "../Button";

export default function AddProductForm() {
  const { contract, account } = useContext(StateContext);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    manufacturerName: "",
    name: "",
    price: "",
    image: ""
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const id = uuidv4();
      const price = parseInt(form.price);
      const imageObj = await uploadImage(form.image!);
      await contract.addProduct(id, form.name, form.manufacturerName, form.price);
      await createProduct({ id, image: imageObj.url, manufacturer: account, manufacturerName: form.manufacturerName, name: form.name, price: price });

      alert("Product added successfully");
    } catch (e: any) {
      console.log(e);
      alert(e.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes("image")) {
      return alert("Please upload an image file");
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;
      handleStateChange({ value: result, fieldName: "image" });
    };
  };

  const handleStateChange = ({
    value,
    fieldName,
  }: {
    value: String;
    fieldName: string;
  }) => {
    setForm((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <form className="flexStart form" onSubmit={handleFormSubmit}>
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && "Choose an image for your project"}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          className="form_image-input"
          onChange={handleChangeImage}
        />
        {form.image && (
          <Image
            src={form.image}
            className="sm:p-10 object-contain z-20"
            alt="Project Poster"
            fill
          />
        )}
      </div>
      <FormFeild
        label="Name"
        placeholder="Copper Bottle"
        error="Please enter a valid title"
        setState={(value: string) => {
          handleStateChange({ value: value, fieldName: "name" });
        }}
        state={form.name}
      />
      <FormFeild
        label="Manufacturer Name"
        placeholder="CL Gupta Exports"
        error="Please enter a valid Manufacturer Name"
        setState={(value: string) => {
          handleStateChange({ value: value, fieldName: "manufacturerName" });
        }}
        state={form.manufacturerName}
      />
      <FormFeild
        label="Price"
        placeholder="1"
        error="Please enter a valid price"
        setState={(value: string) => {
          handleStateChange({ value: value, fieldName: "price" });
        }}
        state={form.price.toString()}
      />
      <div className="w-full mt-10">
        <Button
          isSubmitting={isSubmitting}
          title={
            isSubmitting
              ? "Adding Product ..." : "Add Product"
          }
          type="submit"
          leftIcon={isSubmitting ? "" : "/plus.svg"}
          handleClick={(e) => {
            handleFormSubmit(e);
          }}
        />
      </div>
    </form>
  );
}