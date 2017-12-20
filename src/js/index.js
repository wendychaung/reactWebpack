import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Switch,Route} from 'react-router-dom';

import "../scss/public.scss";

import Forms from "../components/form";
import Home from "../components/home";
import Headertop from "../components/header";
import List from "../components/list";
import Uploads from "../components/uploads";

const Main=()=>(
    <main>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/list" component={List}/>
            <Route  path="/forms" component={Forms}/>
            <Route  path="/uploads" component={Uploads}/>
        </Switch>
    </main>
);
const App=()=>(
    <div className="maincontent">
        <Headertop />
        <Main />
    </div>
);
ReactDOM.render(
    <HashRouter>
        <App />
    </HashRouter>,
    document.getElementById("root")
);