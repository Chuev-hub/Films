import { Link, NavLink } from "react-router-dom";
import React from "react";
import { simpleService } from "../../services/simpleService";
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.mas = [];
    this.state = {
      isadmin: "" + sessionStorage.getItem("isAdmin"),
    };
  }
  componentDidMount() {}

  render() {
    return (
      <div style={{marginTop:"100px"}}>
          {this.state.isadmin === "true" && 
           <div>
 <div className="d-flex justify-content-center">
     <div>
     <div>
     <Link to='addfilm'
              style={{
                color: "white",
                fontSize: "3vw",
                textShadow: "5px 2px rgba(0,00,0,0.5)",
              }}
            >
              Add film
            </Link>
            </div><div>
            <Link to='addactor'
              style={{
                color: "white",
                fontSize: "3vw",
                textShadow: "5px 2px rgba(0,00,0,0.5)",
              }}
            >
              Add Actor
            </Link>
            </div><div>
            <Link to='addgenre'
              style={{
                color: "white",
                fontSize: "3vw",
                textShadow: "5px 2px rgba(0,00,0,0.5)",
              }}
            >
              Add Genre
            </Link>
            </div><div>

            <Link to='addcompany'
              style={{
                color: "white",
                fontSize: "3vw",
                textShadow: "5px 2px rgba(0,00,0,0.5)",
              }}
            >
              Add Company
            </Link>
            </div><div>
            <Link to='adddirector'
              style={{
                color: "white",
                fontSize: "3vw",
                textShadow: "5px 2px rgba(0,00,0,0.5)",
              }}
            >
              Add Director
            </Link>
            </div><div>
            <Link to='addproducer'
              style={{
                color: "white",
                fontSize: "3vw",
                textShadow: "5px 2px rgba(0,00,0,0.5)",
              }}
            >
              Add Producer
            </Link>
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
export default Admin;
