import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import Item from '../item/Item'
import axios from "axios";

const NewCollections = () => {

    const [new_collection, setNew_Collection] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/new-collection")
            .then(res => {
                const product = res.data.data;
                setNew_Collection(product);
                console.log("asjbajsb", product);
            })
            .catch(error => {
                console.log(error);
            });
        // fetch("http://localhost:8000/product")
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setAll_Product(data.data)
        //     });
    }, [])

    return (
        <div className='new-collections'>
            <h1>NEW COLLECTIONS</h1>
            <hr />
            <div className="collections">
                {new_collection.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
        </div>
    )
}

export default NewCollections
