import React, { useEffect, useState } from "react";
import './Popular.css'
import Item from '../item/Item'
import axios from "axios";

const Popular = () => {

    const [data_product, setData_Product] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/women")
            .then(res => {
                const product = res.data.data;
                setData_Product(product);
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
        <div className="popular">
            <h1>POPULAR IN WOMEN</h1>
            <hr />
            <div className="popular-item">
                {data_product.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
        </div>
    )
}

export default Popular;