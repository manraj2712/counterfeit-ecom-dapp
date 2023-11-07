import axios from 'axios';
export const uploadImage = async (imagePath: string) => {
    try {
        const res = await fetch("/api/upload-image", {
            method: "POST",
            body: JSON.stringify({ path: imagePath }),
        });
        return res.json();
    } catch (error) {
        throw error;
    }
};


interface ProductData {
    id: string;
    manufacturer: string;
    manufacturerName: string;
    name: string;
    price: number;
    image: string;
}

export const createProduct = async (productData: ProductData) => {
    try {
        await axios.post('/api/add-product', { ...productData });
    } catch (error) {
        throw error;
    }
};


export const getAllProducts = async () => {
    try {
        const res = await fetch("/api/get-all-products");
        return res.json();
    } catch (error) {
        throw error;
    }
};

export const getProductDetailsFromDb = async (id: string) => {
    try {
        const res = await fetch(`/api/get-product-details?id=${id}`);
        return res.json();
    } catch (error) {
        throw error;
    }
};