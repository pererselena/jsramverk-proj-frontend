import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import io from "socket.io-client";
import { Line } from 'react-chartjs-2';



const Home = () => {
    const [product, setProduct] = useState('');
    const [title, setTitle] = useState('');
    const [graphData, setGraphData] = useState({});

    var apiURL = "";
    var socketUrl = "";

    if (process.env.NODE_ENV === "production") {
        apiURL = "https://trade-api.elenaperers.me";
        socketUrl = 'https://socket-trade.elenaperers.me:443';
    } else {
        apiURL = "http://localhost:1337";
        socketUrl = 'http://localhost:3005';
    }

    var dataSet = {}
    var xVal = 0;

    

    useEffect(() => {
        const saveObjectData = ((response) => {
            var datasets = [];
            var colours = ["#9B4FE6", "#F35DEE", "#660033", "#6666FF", "#DC1493"];

            for (let index = 0; index < response.length; index++) {
                const object = response[index];
                var dataset = {
                    events: [],
                    label: object.title,
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: colours[index],
                    borderColor: colours[index],
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: colours[index],
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: colours[index],
                    pointHoverBorderColor: colours[index],
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [object.startingPoint, object.startingPoint]
                }
                datasets.push(dataset);
            }
            dataSet =
                {
                    labels: ['-2', '-1'],
                    datasets: datasets
                };
            setGraphData({
                labels: ['-2', '-1'],
                datasets: datasets
            })
            console.log("datasets", dataSet);
            
        });

        const fetchData = async () => {
            const result = await fetch(apiURL)
                .then(res => res.json())
                .then(function (res) {
                    return res.data;
                });
            setTitle(result.title);
            setProduct(result.products);
            saveObjectData(result.products);
        };
        fetchData();
        var socket = io(socketUrl)
        socket.on('stocks', (products) => {
            setProduct(products);
            dataSet.labels.push(xVal.toString());

            if (dataSet.labels.length > 30) {
                dataSet.labels.shift();
            }

            for (let index = 0; index < products.length; index++) {
                const product = products[index];
                dataSet.datasets[index].data.push(product.startingPoint)
                if (dataSet.datasets[index].data.length > 30) {
                    dataSet.datasets[index].data.shift();
                }
            }
            xVal++;
            console.log("dataSet: ", dataSet);
            setGraphData(dataSet);
        });
    }, [apiURL, socketUrl]);

    return (
        <main>
            {console.log("draw DataSet:", graphData)}
            <h2>{title}</h2>
            <Line
                data={graphData}
                width={500}
                height={300}
                options={{ maintainAspectRatio: true }}
            />
            <section className="product-section">
                {product ?
                    product.map((item, i) => {
                        return (<div key={i} className="product">
                            <img src={item.imagePath} alt={item.title}></img>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            <p className="price">Pris: {Math.round(item.startingPoint * 100) / 100}</p>
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