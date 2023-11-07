import { Modal, AddProduct } from "@/components";
export default function CreateProject() {
    return (
        <Modal>
            <h3 className="md:text-5xl text-3xl font-extrabold text-left max-w-5xl w-full">Add New Product</h3>
            <AddProduct />
        </Modal>
    );
}