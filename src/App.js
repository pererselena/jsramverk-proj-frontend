import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Home from './components/Home.js';
import Depot from './components/Depot.js';

import SignUp from './components/Form.js';
import SignIn from './components/Form-lgn.js';


import './App.css';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <header>
                        <div className="header-content">
                            <section className="flash">
                                <h1>JSRamverk</h1>
                            </section>
                            <nav>
                                <Link to="/">Hem</Link>
                                <Link to="/depot/">Depot</Link>
                                <Link to="/login">Logga in</Link>
                            </nav>
                        </div>
                    </header>
                    <Route exact path="/" component={Home} />
                    <Route path="/depot/" component={Depot} />
                />
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

