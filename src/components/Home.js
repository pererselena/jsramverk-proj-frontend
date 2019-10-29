import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Line } from 'react-chartjs-2';

import io from 'socket.io-client';

var graphData = {};
var xVal = 0;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            objects: [],
            shouldRedraw: false
        };

        if (process.env.NODE_ENV === "production") {
            this.apiURL = "https://trade-api.elenaperers.me";
            this.socketUrl = 'https://socket-trade.elenaperers.me';
        } else {
            this.apiURL = "http://localhost:1338";
            this.socketUrl = 'http://localhost:3010';
        }
    }

    componentWillUnmount() {
        this.socket.close();
        xVal = 0;
    }

    componentDidMount() {
        const maxValues = 30;
        this.getObjects();

        this.socket = io(this.socketUrl);
        this.socket.on('stocks', (items) => {
            this.setState({
                objects: items
            });
            graphData.labels.push(xVal.toString());
            if (graphData.labels.length > maxValues) {
                graphData.labels.shift();
            }
            var index = 0;

            items.forEach(function (item) {
                graphData.datasets[index].data.push(item.startingPoint);
                if (graphData.datasets[index].data.length > maxValues) {
                    graphData.datasets[index].data.shift();
                }
                index++;
            }, this);
            xVal++;
            this.setState({
                shouldRedraw: true
            });

            console.log("socket: ", graphData)
        });
    }

    getObjects() {
        fetch(this.apiURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 'x-access-token':
                    sessionStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(res => this.saveObjectData(res.data));
    }

    saveObjectData(data) {
        var datasets = [];
        var colours = ["#9B4FE6", "#F35DEE", "#660033", "#6666FF", "#DC1493"];

        this.setState({
            objects: data.products,
            title: data.title
        });
        var index = 0;

        data.products.forEach(function (object) {
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
            };
            index++;
            datasets.push(dataset);
        });

        graphData =
            {
                labels: ['-2', '-1'],
                datasets: datasets
            };
    }

    render() {
        const animOff = { animation: false };
        const objects = this.state.objects.map(function (item, i) {
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
        }, this);

        return (
            <main>
                <h2>{this.state.title}</h2>
                <div className="priceChart">
                    <h2>Prisförändringar på produkter</h2>
                    <Line data={graphData} redraw={this.state.shouldRedraw} options={animOff} />
                </div>
                <section className="product-section">
                    {objects}
                </section>
            </main>
        );
    }
}
export default Home;
