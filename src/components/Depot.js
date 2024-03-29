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
        socketUrl = 'https://socket-trade.elenaperers.me';
    } else {
        apiURL = "http://localhost:1338";
        socketUrl = 'http://localhost:3010';
    }

    var isLoggedIn = sessionStorage.getItem("isLoggedIn")
    var socket = io(socketUrl);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(apiURL + "/depot/" + userId, {
                method: 'GET',
                headers: {
                    'x-access-token': sessionStorage.getItem("token"),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(function (res) {
                    return res.data;
                });
            setTitle(result.title);
            setBalance(result.balance);
            setName(result.name);
            socket.on('stocks', (products) => {
                console.log("items", result.items);
                result.items.map((item) => {
                    products.map((product => {
                        if (product._id === item.product._id) {
                            item.product.startingPoint = product.startingPoint;
                            return product;
                        }
                        return item;
                    }))
                    return item;
                })
                setItems(result.items);
            });
        };
        if (isLoggedIn === "true") {
            fetchData();
        }
        return function cleanup() {
            socket.close();
        }
    }, [apiURL, userId, socket, isLoggedIn]);

    
    if (isLoggedIn !== "true") {
        return <Redirect to="/login/" />;
    }

    return (
        <main className="depot-wrapper">
            <h2>{title}</h2>
            <section className="userInfo">
                <section className="user-fixed">
                    <h3>{name}</h3>
                    <p>Saldo: {Math.round(100 * balance) / 100}</p>
                    <Link to={{
                        pathname: "/addmoney",
                    }}>
                        <button className="btnPrimary">Överföring</button>
                    </Link>
                </section>
                
            </section>
            <section className="depot-section">
                {items ?
                    items.map((item, i) => {
                        return (<div key={i} className="items">
                            <h3>{item.product.title}</h3>
                            <p>{item.product.description}</p>
                            <p className="price">Köpt för:{Math.round(100 * item.boughtPrice) / 100} </p>
                            <p className="price">Nuvarande pris:{Math.round(item.product.startingPoint * 100) / 100} </p>
                            <p>Antal: {item.amount}</p>
                            <Link to={{
                                pathname: "/Sell",
                                state: {
                                    productId: item._id,
                                    productName: item.title,
                                    price: item.product.startingPoint
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