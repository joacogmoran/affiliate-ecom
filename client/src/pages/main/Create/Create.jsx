import React from "react";

// actions
import CreateProdForm from "../../../components/forms/CreateProdForm/CreateProdForm";


export default function Create () {
    return <main className={container}>
        <CreateProdForm/>
    </main>
};


// style
const container = 'flex flex-col h-full py-5 px-2';