import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import io from "socket.io-client";



const Home = () => {
    const [product, setProduct] = useState('');
    const [title, setTitle] = useState('');

    var apiURL = "";
    var socketUrl = "";

    if (process.env.NODE_ENV === "production") {
        apiURL = "https://trade-api.elenaperers.me";
        socketUrl = 'https://socket-trade.elenaperers.me:443';
    } else {
        apiURL = "http://localhost:1337";
        socketUrl = 'http://localhost:3005';
    }


    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(apiURL)
                .then(res => res.json())
                .then(function (res) {
                    return res.data;
                });
            setTitle(result.title);
            setProduct(result.products);
        };
        fetchData();
        var socket = io(socketUrl)
        socket.on('stocks', (products) => {
            console.log(products);
            setProduct(products);
        });
    }, [apiURL, socketUrl]);

    return (
        <main>
            <h2>{title}</h2>
            <section className="product-section">
                {product ?
                    product.map((item, i) => {
                        return (<div key={i} className="product">
                            <img src={item.imagePath} alt={item.title}></img>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            <p className="price">Pris: {item.startingPoint}</p>
                            <Link to={{
                                pathname: "/Buy",
                                state: {
                                    productId: item._id,
                                    productName: item.title,
                                    price: item.startingPoint
                                }
                            }}>
                                <button className="button buy">
                                    <div className="circle">
                                        <span className="icon arrow"></span>
                                    </div>
                                    <p className="button-text">Köp</p>
                                </button>
                            </Link>

                        </div>);
                    })
                    : null}
            </section>
        </main>
    );
};

export default Home;