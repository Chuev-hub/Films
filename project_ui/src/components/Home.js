// import { BrowserRouter as Route } from 'react-router-dom';
import React from 'react';
import { Route,  BrowserRouter as Router, Switch } from 'react-router-dom'
import Index from './pages/Index';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Film from './pages/Film';
import './css/index.css'
import Actor from './pages/Actor';
import Directors from './pages/Directors';
import Producer from './pages/Producer';
import Popular from './pages/Popular';
import Selection from './pages/Selections';
import Lists from './pages/Lists';
import Changepass from './pages/changepass/changepass';
import Test from '../services/test';
import userService from '../services/userService';
import Admin from './pages/Admin';
import AddFilm from './pages/AddFilm';
import AddActor from './pages/AddActor';
import AddCompany from './pages/AddCompany';
import AddDirector from './pages/AddDirector';
import AddProducer from './pages/AddProducer';
import AddGenre from './pages/AddGenre';

class Home extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
     
      }
     
    
  }
  render(){
    if(sessionStorage.getItem('isLogin') == 'true')
      setInterval(() => userService.retoken(), 299990)
    return ( <>
      <Router>
          <Switch>
            <Route exact path='/' component={() =><Index ></Index>} ></Route>
            <Route path='/login' component={Login}></Route> 
            <Route path='/lists' component={Lists}></Route> 
            <Route path='/addfilm' component={AddFilm}></Route>
            <Route path='/addactor' component={AddActor}></Route>
            <Route path='/addcompany' component={AddCompany}></Route>
            <Route path='/adddirector' component={AddDirector}></Route>
            <Route path='/addgenre' component={AddGenre}></Route>
            <Route path='/addproducer' component={AddProducer}></Route>
            <Route path='/registration' component={Registration}></Route>
            <Route path='/actors/:id' component={Actor}></Route>
            <Route path='/directors/:id' component={Directors}></Route>
            <Route path='/producers/:id' component={Producer}></Route>
            <Route path='/Populars' component={Popular}></Route>
            <Route path='/selections/:id' component={Selection}></Route> 
            <Route path="/films/:id" component={Film}/> 
            <Route path="/changepass" component={Changepass}/> 
            <Route path="/admin" component={Admin}/> 
          </Switch>
      </Router></>
    );
  }
    

}
export default Home;