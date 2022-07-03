// import { BrowserRouter as Route } from 'react-router-dom';
import React from "react";
import userService from "../../services/userService";
import filmService from "../../services/filmService";
import { Link } from "react-router-dom";
import { simpleService } from "../../services/simpleService";
class Actor extends React.Component {
  constructor(props) {
    super(props);
    this.id = 0;
    this.name = "";
    this.Image = "";
    this.films=[]
    this.state = {
      id: 0,
      name : "",
      Image : "",
      films:[]
    };
  }
  componentDidMount() {
    const id1 = this.props.match.params.id;
    this.id = id1;

    let us = new simpleService('actor');
    us.response('get',id1).then((x) => {
      this.name = x.name;
      this.Image = x.image;
     us.response('films',id1).then((f)=>{
         this.films = f
        this.setState({id: id1,
            films:this.films,
            name : this.name,
            Image : this.Image})
     })
    });
  }

  render() {
      console.log(this.state.films)
    return (
      <>
        <div
          style={{ marginTop: "100px" }}
          className="d-flex justify-content-center"
        >
          <div>
            
            <img
              src={this.state.Image}
              style={{
                position: "relative",
                background:
                  "url(" + this.state.Image + ") no-repeat center center   ",
                backgroundSize: "100% 100%",
                width: "20vw",
                height: "",
                borderRadius: "10px",
                boxShadow:
                  "0 0 20px rgba(255,255,255,.6),  inset 0 0 20px rgba(255,255,255,1)",
              }}
            />
           
             
          </div>

          <div style={{ marginLeft: "3vw" }}>
            <div
              style={{
                color: "white",
                fontSize: "3vw",
                width: "40vw",
                textShadow: "0.3vw 2px rgba(0,00,0,0.5)",
              }}
            >
              {this.state.name}
            </div>
            {this.state.films.map((i) => {
                return (
                  <div className="d-flex ">
                    <Link
                    to={'/films/'+i.id}
                      style={{
                        color: "white",
                        fontSize: "2vw",
                        textShadow: "0.3vw 2px rgba(0,00,0,0.5)",
                      }}
                      key={i.id}
                    >
                      {i.title}
                    </Link>
                  </div>
                );
              })}
           
          </div>
        </div>
        <div
          style={{
            color: "white",
            marginTop: "50px",
            fontSize: "3vw",
            width: "40vw",
            marginLeft: "17vw",
            textShadow: "5px 2px rgba(0,00,0,0.5)",
          }}
        >
            </div>
       </>
    );
  }
}
export default Actor;
