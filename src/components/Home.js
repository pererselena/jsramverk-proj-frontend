import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';





const Home = () => {
    const [product, setProduct] = useState('');
    const [title, setTitle] = useState('');
    const [fetchOnce, setFetechOnce] = useState(false);

    var apiURL = "";

    if (process.env.NODE_ENV === "production") {
        apiURL = "https://trade-api.elenaperers.me"
    } else {
        apiURL = "http://localhost:1337"
    }

    async function fetchData() {
        if (!fetchOnce) {
            setFetechOnce(true)
            await fetch(apiURL)
                .then(res => res.json())
                .then(function (res) {
                    setTitle(res.data.title);
                    setProduct(res.data.products);
                });
        }

    }

    useEffect(() => {
        fetchData();
    });

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
                            <p className="price">Pris: </p>
                            <Link to={{
                                pathname: "/Buy",
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