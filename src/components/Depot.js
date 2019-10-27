import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';






const Depot = () => {
    const [items, setItems] = useState('');
    const [title, setTitle] = useState('');
    const [balance, setBalance] = useState('');
    const [name, setName] = useState('');
    const [fetchOnce, setFetechOnce] = useState(false);


    //console.log(product);
    var apiURL = "";
    var userId = sessionStorage.getItem("userId");

    if (process.env.NODE_ENV === "production") {
        apiURL = "https://trade-api.elenaperers.me"
    } else {
        apiURL = "http://localhost:1337"
    }

    useEffect(() => {
        if (!fetchOnce) {
            setFetechOnce(true)
            fetch(apiURL + "/depot/" + userId)
                .then(res => res.json())
                .then(function (res) {
                    setTitle(res.data.title);
                    setItems(res.data.items);
                    setBalance(res.data.balance);
                    setName(res.data.name);
                    console.log(res.data.items)
                });
        }
    });

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
                            <p className="price">Pris:{item.boughtPrice} </p>
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