// import { BrowserRouter as Route } from 'react-router-dom';
import React from "react";
import userService from "../../services/userService";
import filmService from "../../services/filmService";
import { Link } from "react-router-dom";
import { simpleService } from "../../services/simpleService";
class Lists extends React.Component {
  constructor(props) {
    super(props);
    this.id = userService.id;
    this.selections = [];
    this.state = {
      selections: [],
    };
    this.Create = this.Create.bind(this);
    this.Delete = this.Delete.bind(this);
  }
  componentDidMount() {
    let us = new simpleService("selection");
    us.response("UsersSelections", sessionStorage.getItem("id")).then((x) => {
      this.selections = x;
      this.setState({
        selections: this.selections,
      });
    });
  }
  Create() {
    let us = new simpleService("selection");

    us.POST( {
      name: document.getElementById("inp").value,
      userId: sessionStorage.getItem("id"),
    }).then((xx) =>{
      us.response("UsersSelections", sessionStorage.getItem("id")).then((x) => {
        console.log(x);
        this.setState({
          selections: x,
        });
      });
    });
    document.getElementById("inp").value=''
  }
  Delete(X){
    let us = new simpleService("selection");
    console.log();
    us.response('delete', X
    ).then((xx) =>{
      us.response("UsersSelections", sessionStorage.getItem("id")).then((x) => {
        console.log(x);
        this.setState({
          selections: x,
        });
      });
    });
  }
  render() {
    console.log(this.state.selections);
    return (
      <>
        <div className="d-flex justify-content-center">
          <div
            style={{
              color: "white",
              fontSize: "20px",
              textShadow: "0.3vw 2px rgba(0,00,0,0.5)",
              marginRight: "2vw",
            }}
          >
            Create new:{" "}
          </div>
          <div className="d-flex " style={{ "margin-right": "50px" }}>
            <input
              id="inp"
              className="form-control "
              style={{
                color: "white",
                background: "rgba(0, 0, 0, 0.3)",
                border: "none",
              }}
              type="search"
              placeholder="Name..."
              aria-label="Search"
            />
            <button className="animsearch" onClick={this.Create}>
              Create!
            </button>
          </div>
        </div>
        <div
          className="d-flex justify-content-center"
          style={{ marginTop: "100px" }}
        >
          <div>
          <div
          style={{
            color: "white",
            fontSize: "3vw",            
            textShadow: "5px 2px rgba(0,00,0,0.5)",
          }}
        >
          Your Selections {this.state.name}
        </div>
            {this.state.selections.map((x) => (
              <div style={{ margin:'10px'}} key={x.id} className="d-flex justify-content-between">
                <Link to={'/selections/'+x.id}
                  style={{
                    color: "white",
                    fontSize: "20px",
                    textShadow: "0.3vw 2px rgba(0,00,0,0.5)",
                    alignSelf: "center",
                    textAlign: "center",
                   
                  }}
                >
                  {x.name}
                </Link>
                <button className="btn btn-danger" onClick={()=>this.Delete(x.id)} style={{width:'40px',height:'40px',marginLeft:"10px", textAlign:'center'}}>X</button>
              </div>
            ))}
          </div>
        </div>
        {this.state.selections.length == 0 && (
          <div
            style={{
              color: "white",
              fontSize: "2vw",
              textShadow: "0.3vw 2px rgba(0,00,0,0.5)",
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            There are not selections
          </div>
        )}
      </>
    );
  }
}
export default Lists;
