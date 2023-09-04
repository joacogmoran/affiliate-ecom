import React from "react";


// code
export default function Pagination ({ page, maxPage, minPage }) {
    return (
        <div className={container}>
            <button className={btn}>back</button>
            <div className={text}>{page}</div>
            <button className={btn}>next</button>
        </div>
    )
};

// style
const container = `flex w-full`;
const btn = `bg-black rounded py-1 px-2 w-full uppercase text-white`;
const text = `bg-gray-200 w-full py-1 px-2 text-center font-bold`;