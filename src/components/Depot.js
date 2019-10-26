import React, { useEffect, useState } from 'react';





const Depot = () => {
    const [items, setItems] = useState('');
    const [title, setTitle] = useState('');
    const [balance, setBalance] = useState('');
    const [name, setName] = useState('');

    //console.log(product);
    var apiURL = "";
    var userId = sessionStorage.getItem("userId");

    if (process.env.NODE_ENV === "production") {
        apiURL = "https://trade-api.elenaperers.me"
    } else {
        apiURL = "http://localhost:1337"
    }

    useEffect(() => {
        fetch(apiURL + "/depot/" + userId)
            .then(res => res.json())
            .then(function (res) {
                setTitle(res.data.title);
                setItems(res.data.items);
                setBalance(res.data.balance);
                setName(res.data.name);
            });
    });

    return (
        <main>
            <h2>{title}</h2>
            <section className="userInfo">
                <h3>{name}</h3>
                <p>Saldo: {balance}</p>
                <button className="btnPrimary">Överföring</button>
            </section>
            <section className="depot-section">
                {items ?
                    items.map((item, i) => {
                        return (<div key={i} className="items">
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            <p className="price">Pris: </p>
                            <button className="button buy">
                                <div className="circle">
                                    <span className="icon arrow"></span>
                                </div>
                                <p className="button-text">Sälj</p>
                            </button>
                        </div>);
                    })
                    : null}
            </section>
        </main>
    );
};

export default Depot;