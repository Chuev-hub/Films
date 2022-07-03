import NavBar from "./components/NavBar";
import React from "react";
import { Route,  BrowserRouter as Router, Switch } from 'react-router-dom'
import Home from "./components/Home";

class App extends React.Component {
  
  constructor(props)
  {
    super(props)
    
  }
  render(){
    return (
     
      <div className="App">
      <header className="App-header">
      <NavBar></NavBar>
      </header>
    
      <Home></Home>


  

    </div>
    );
  }
    

}
export default App;

