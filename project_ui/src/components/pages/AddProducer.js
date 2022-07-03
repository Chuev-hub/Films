import { Link, NavLink } from "react-router-dom";
import React from "react";
import { simpleService } from "../../services/simpleService";
class AddProducer extends React.Component {
  constructor(props) {
    super(props);
    this.mas = [];
    this.state = {
      isadmin: "" + sessionStorage.getItem("isAdmin"),
    };
  }
  componentDidMount() {}
  Add(){ 
    let us = new simpleService("producer");

    us.POST( {
      name: document.getElementById("n").value,
      image:document.getElementById("i").value,
    }).then(()=>{
       document.getElementById("n").value=''
      document.getElementById("i").value=''
    })
    
  }
  render() {
    return (
      <div style={{marginTop:"100px"}}>
          {this.state.isadmin === "true" && 
           <div>
           <div className="d-flex justify-content-center">
           <div> <div 
              style={{
                color: "white",
                fontSize: "3vw",
                textShadow: "5px 2px rgba(0,00,0,0.5)",
              }}
            >
              Add Producer:
            </div>

            <div className="d-flex justify-content-center mt-4">
          <div style={{ width: "200px", textAlign: "center" }}>
           
            <div className="input-group mb-3">
              <input
              id="n"
                onChange={event => {this.setState({login: event.target.value})}}
                type="text"
                placeholder="Name"
                className="form-control "
                style={{
                  color: "white",
                  background: "rgba(0, 0, 0, 0.3)",
                  border: "none",
                }}
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              ></input>
            </div>


            
            <div className="input-group mb-3">
              <input
              id="i"
              onChange={event => this.setState({email: event.target.value})}
                type="text"
                placeholder="Url Image"
                className="form-control "
                style={{
                  color: "white",
                  background: "rgba(0, 0, 0, 0.3)",
                  border: "none",
                }}
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              ></input>
            </div>
            
      
          
            <button
              className="btn butn"
              style={{
                "font-size": "25px",
                "text-shadow": "5px 2px rgba(0,00,0,0.5)",
                color: "#18C460",
                "text-decoration": "none",
                alignSelf: "center",
                margin: "auto",
                marginTop: "5px",
                marginLeft: "94px",
              }}
              onClick={() => {this.Add()}}
            >
              Add!
            </button>
          </div>
        </div>

          </div>
          </div>
           </div>
          }
        {this.state.isadmin === "false" && (
          <div className="d-flex justify-content-center">
            <div
              style={{
                color: "white",
                fontSize: "3vw",
                width: "40vw",
                textShadow: "5px 2px rgba(0,00,0,0.5)",
              }}
            >
              You are not admin
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default AddProducer;
