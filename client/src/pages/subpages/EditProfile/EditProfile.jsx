import React from "react";

// components
import EditProfileForm from "../../../components/forms/EditProfileForm/EditProfileForm";


export default function EditProfile () {
    return <main className={container}>
        <EditProfileForm/>
    </main>
};

// style
const container = 'flex flex-col items-center gap-5 h-full py-5 px-2';