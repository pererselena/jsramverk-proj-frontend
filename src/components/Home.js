import React, { useEffect, useState } from 'react';





const Home = () => {
    const [product, setProduct] = useState('');
    const [title, setTitle] = useState('');
    //console.log(product);

    useEffect(() => {
        fetch('http://localhost:1337/')
            .then(res => res.json())
            .then(function (res) {
                setTitle(res.data.title);
                setProduct(res.data.products);
            });
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
                            <button className="button buy">
                                <div className="circle">
                                    <span className="icon arrow"></span>
                                </div>
                                <p className="button-text">Köp</p>
                            </button>
                        </div>);
                    })
                    : null}
            </section>
        </main>
    );
};

export default Home;