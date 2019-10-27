import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import io from "socket.io-client";







const Depot = () => {
    const [items, setItems] = useState('');
    const [title, setTitle] = useState('');
    const [balance, setBalance] = useState('');
    const [name, setName] = useState('');


    var apiURL = "";
    var userId = sessionStorage.getItem("userId");

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
            const result = await fetch(apiURL + "/depot/" + userId)
                .then(res => res.json())
                .then(function (res) {
                    return res.data;
                });
            setTitle(result.title);
            setBalance(result.balance);
            setName(result.name);
            var socket = io(socketUrl)
            socket.on('stocks', (products) => {
                console.log("items", result.items);
                result.items.map((item) => {
                    products.map((product => {
                        if (product._id === item.product._id) {
                            item.product = product;
                            return product;
                        }
                        return item;
                    }))
                    return item;
                })
                setItems(result.items);
            });
        };
        fetchData();
        
    }, [apiURL, userId, socketUrl]);
    
    var isLoggedIn = sessionStorage.getItem("isLoggedIn")
    if (isLoggedIn === "false") {
        return <Redirect to="/login/" />;
    }

    return (
        <main>
            <h2>{title}</h2>
            <section className="userInfo">
                <h3>{name}</h3>
                <p>Saldo: {balance}</p>
                <Link to={{
                    pathname: "/addmoney",
                }}>
                    <button className="btnPrimary">Överföring</button>
                </Link>
                
            </section>
            <section className="depot-section">
                {items ?
                    items.map((item, i) => {
                        return (<div key={i} className="items">
                            <h3>{item.product.title}</h3>
                            <p>{item.product.description}</p>
                            <p className="price">Köpt för:{item.boughtPrice} </p>
                            <p className="price">Nuvarande pris:{item.product.startingPoint} </p>
                            <p>Antal: {item.amount}</p>
                            <Link to={{
                                pathname: "/Sell",
                                state: {
                                    productId: item._id,
                                    productName: item.title,
                                    price: 10
                                }
                            }}>
                                <button className="button buy">
                                    <div className="circle">
                                        <span className="icon arrow"></span>
                                    </div>
                                    <p className="button-text">Sälj</p>
                                </button>
                            </Link>
                            
                        </div>);
                    })
                    : null}
            </section>
        </main>
    );
};

export default Depot;