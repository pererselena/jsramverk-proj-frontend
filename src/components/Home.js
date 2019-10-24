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
            <article className="me-article">
                {product ?
                    product.map((item, i) => {
                        return (<div key={i} className="product">
                            <img src={item.imagePath}></img>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>);
                    })
                    : null}
            </article>
        </main>
    );
};

export default Home;