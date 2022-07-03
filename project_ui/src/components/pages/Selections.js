// import { BrowserRouter as Route } from 'react-router-dom';
import React from "react";
import userService from "../../services/userService";
import filmService from "../../services/filmService";
import { Link } from "react-router-dom";
import { simpleService } from "../../services/simpleService";
class Selection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mas: [],
      name: "",
    };
  }
  componentDidMount() {
    const id1 = this.props.match.params.id;
    this.id = id1;

    let t = new simpleService("selection");
    t.response("films", id1).then((x) => {
        t.response("get", id1).then((xx) => {
            this.setState({ mas: x,name:xx.name });
          });
    });
  }

  render() {
    console.log(this.state.mas);
    return (
      <>
        <div
          style={{
            color: "white",
            fontSize: "3vw",
            width: "40vw",
            marginLeft: "17vw",
            textShadow: "5px 2px rgba(0,00,0,0.5)",
          }}
        >
          Selection {this.state.name}
        </div>
        <div
          style={{
            marginTop: "100px",
            marginLeft: "10vw",
            marginLeft: "10vw",
            marginRight: "10vw",
          }}
          className="d-flex justify-content-center flex-wrap"
        >
          {this.state.mas.map((i) => {
            return (
              <div
                className="card text-white "
                style={{
                  width: "200px",
                  margin: "20px",
                  border: "none",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                }}
              >
                <img
                  className="card-img-top"
                  style={{
                    boxShadow:
                      "0 0 20px rgba(255,255,255,.6),  inset 0 0 20px rgba(255,255,255,1)",
                  }}
                  src={i.image}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <Link
                    className="card-title"
                    style={{
                      color: "white",
                      fontSize: "20px",
                      textShadow: "0.3vw 2px rgba(0,0,0,0.2)",
                      textDecoration: "none",
                    }}
                    to={"/films/" + i.id}
                  >
                    {i.title}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
export default Selection;
