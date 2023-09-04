import React, { useState } from 'react';

// redux
import {useSelector} from 'react-redux';

// components
import ProductCard from '../ProductCard/ProductCard';
import Pagination from '../Pagination/Pagination';


// code
export default function ProductFactory () {
    const {arr} = useSelector(state => state.userReducer);
    const [page, setPage] = useState(1);
    const itemsPerPage = 8;

    let cantPages = Math.ceil(arr.length/itemsPerPage);
    let lastItem = page * itemsPerPage;
    let firstItem = lastItem - itemsPerPage;
    
    let render = arr.slice(firstItem, lastItem);

    if (!arr) return <></>
    return (
        <>
            <Pagination pagination={setPage} page={page} minPage={1} maxPage={cantPages}/>
            <div className={container}>
                {
                    !render.length? <></>
                    : render.map(
                        (item, index) => {
                            return <ProductCard key={index}
                                id={item.id} image={item.imageUrl}
                                name={item.name} description={item.shortDesc}
                                link={item.link}
                            />
                        }
                    )
                }
            </div>
        </>
    )
};


// style
const container = `flex flex-wrap justify-between gap-5 w-full`;