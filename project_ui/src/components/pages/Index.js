import { Link, NavLink } from "react-router-dom";
import React from "react";
import { simpleService } from "../../services/simpleService";
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.mas=[]
    this.state = {
      
      mas:[]
    };
  }
  componentDidMount() {
  
    let us = new simpleService('selection');
    us.response('Alladmin','').then((x) => {
      this.mas = x;
   
        this.setState({
          mas:this.mas,
            })
    
    });
  }

  render() {
  return (
    <div>
      <p className="m">SpeedRun.</p>
      <div className="d-flex" style={{ "margin-left": "30vw" }}>
        <Link
          to={'/registration'}          
          className="butn"
          style={{
            animation: "textgreen 2s 1",
            "font-size": "3vw",
            "text-shadow": "5px 2px rgba(0,00,0,0.5)",
            color: "#18C460",
            "text-decoration": "none",
          }}
        >
          Register
        </Link>
        <Link
          to={'/login'}
          className="butn"
          style={{
            animation: "textgreen 2s 1",
            "font-size": "3vw",
            "text-shadow": "5px 2px rgba(0,00,0,0.5)",
            color: "#18C460",
            "text-decoration": "none",
            "margin-left": "3vw",
          }}
        >
          Sign in
        </Link>
      </div>
      <div
                style={{
                  color: "white",
                  fontSize: "3vw",
                  marginLeft: "10vw",
                  marginTop:"10vw",
                  textShadow: "0.3vw 2px rgba(0,00,0,0.5)",
                }}
              >
                Selections for you:
              </div>
      <div  style={{marginTop:'50px',marginLeft:"10vw",marginRight:"10vw"}}className="d-flex justify-content-center ">
      {this.state.mas.map((i) => {
                return (

                 <Link id="box" className="card text-white " to={"/selections/"+i.id}  style={{width: "200px", margin:'20px',
                  textAlign:"center", border:'none', backgroundColor:'rgba(0, 0, 0, 0.3)'}}> {i.name}</Link>)
            })
          }
    </div>
    </div>
  );
}
}
export default Index;