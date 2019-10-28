import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Home from './components/Home.js';
import Depot from './components/Depot.js';
import Buy from './components/Buy.js';
import Sell from './components/Sell.js';
import AddMoney from './components/AddMoney.js';


import SignUp from './components/Register.js';
import SignIn from './components/Login.js';
import Logo from "./images/graph.png";
import DepotImg from "./images/depot.png";
import HomeImg from "./images/home.png";


import './App.css';

class App extends Component {
    render() {
        console.log(sessionStorage.getItem("isLoggedIn"))
        return (
            <Router>
                <div className="App">
                    <header>
                        <div className="header-content">
                            <nav>
                                <Link to="/"><img src={HomeImg} alt="home" /> Hem</Link>
                                    <Link to="/depot/"><img src={DepotImg} alt="depot" /> Depot</Link>
                                <Link to="/login" className="showPassword">Logga ut</Link> <Link to="/login" className="btnPrimary">Logga in</Link> 
                            </nav>
                        </div>
                    </header>
                    <section id="flash">
                        <section className="flash">
                            <img src={Logo} alt="graph" />
                            <h1>Trading</h1>
                        </section>
                        <svg width="100%" height="100" viewBox="0 0 100 102" preserveAspectRatio="none">
                            <path d="M0 0 L50 90 L100 0 V100 H0" fill="#f4f4f4" />
                        </svg>
                    </section>
                    <Route exact path="/" component={Home} />
                    <Route path="/depot/" component={Depot} />
                    <Route path="/buy/" component={Buy} />
                    <Route path="/sell/" component={Sell} />
                    <Route path="/addmoney/" component={AddMoney} />
                    <Route exact path="/login" component={SignIn} />
                    <Route exact path="/register" component={SignUp} />

                    <footer>
                        <p className="social"> <a href="https://github.com/pererselena"><i className="fab fa-github fa-3x"></i></a> <a href="https://www.linkedin.com/in/elena-perers/"><i className="fab fa-linkedin-in fa-3x"></i></a></p>
                        <p className="copyright">Copyright &copy; Elena Perers 2019</p>
                    </footer>
                </div>

            </Router>
        );
    }
}

export default App;

