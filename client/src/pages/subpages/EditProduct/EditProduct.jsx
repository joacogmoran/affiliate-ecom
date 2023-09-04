import React from "react";

// components
import EditProductForm from '../../../components/forms/EditProdForm/EditProdForm';


export default function EditProduct () {
    return <main className={container}>
        <EditProductForm/>
    </main>
};

// style
const container = 'flex flex-col gap-5 h-full py-5 px-2';