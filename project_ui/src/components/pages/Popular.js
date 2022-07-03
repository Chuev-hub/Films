// import { BrowserRouter as Route } from 'react-router-dom';
import React from "react";
import userService from "../../services/userService";
import filmService from "../../services/filmService";
import { Link } from "react-router-dom";
import { simpleService } from "../../services/simpleService";
class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mas: [],
    };
  }
  componentDidMount() {
    let t = new filmService();
    t.getAll().then((x) => {
      this.setState({ mas: x });
    });
  }

  render() {
    return (
      <>
        <div
          style={{
            marginTop: "100px",
            marginLeft: "10vw",
            marginLeft: "10vw",
            marginRight: "10vw",
          }}
          className="d-flex justify-content-center flex-wrap"
        >
          <form className="d-flex justify-content-center flex-wrap" style={{ "margin-right": "20px" }}>
            <span
              style={{
                color: "white",
                fontSize: "20px",
                marginRight: "1vw",
                textShadow: "0.3vw 2px rgba(0,00,0,0.5)",
                marginTop:"15px"
              }}
            >
              Rating
            </span>
            <input
              type="number"
              className="form-control "
              style={{
                color: "white",
                background: "rgba(0, 0, 0, 0.3)",
                border: "none",
                width: "70px", marginTop:"15px"
              }}
            />
            <span
              style={{
                color: "white",
                fontSize: "20px",
                marginRight: "1vw",
                marginLeft: "1vw",
                textShadow: "0.3vw 2px rgba(0,00,0,0.5)", marginTop:"15px"
              }}
            >
              -
            </span>
            <input
              type="number"
              className="form-control "
              style={{
                color: "white",
                background: "rgba(0, 0, 0, 0.3)",
                border: "none",
                width: "70px", marginTop:"15px"
              }}
            />
            <span
              style={{
                color: "white",
                fontSize: "20px",
                marginRight: "1vw",
                marginLeft: "1vw",

                textShadow: "0.3vw 2px rgba(0,00,0,0.5)", marginTop:"15px"
              }}
            >
              Date
            </span>
            <input
              type="number"
              className="form-control "
              style={{
                color: "white",
                background: "rgba(0, 0, 0, 0.3)",
                border: "none",
                width: "70px", marginTop:"15px"
              }}
            />
            <span
              style={{
                color: "white",
                fontSize: "20px",
                marginRight: "1vw",
                marginLeft: "1vw",
                textShadow: "0.3vw 2px rgba(0,00,0,0.5)", marginTop:"15px"
              }}
            >
              -
            </span>
            <input
              type="number"
              className="form-control "
              style={{
                color: "white",
                background: "rgba(0, 0, 0, 0.3)",
                border: "none",
                width: "70px", marginTop:"15px"
              }}
            />
            <select
              class="form-select bg-dark text-light"
              style={{ border: "none", marginTop:"15px", width: "100px", marginLeft: "1vw" }}
            >
              <option selected>Genres</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <button style={{   marginTop:"15px"  }} className=" animsearch" type="submit">
              Accept
            </button>
            <span
            style={{
              color: "white",
              fontSize: "20px",
              marginRight: "1vw",
              marginLeft: "1vw",
              textShadow: "0.3vw 2px rgba(0,00,0,0.5)", marginTop:"15px"
            }}
          >
            |
          </span>
          <select
            class="form-select bg-dark text-light"
            style={{ border: "none", marginTop:"15px", width: "100px",  marginTop:"15px",marginLeft: "1vw" }}
          >
            <option selected value="1">
              Newest
            </option>
            <option value="2">Oldest</option>
          </select>
          </form>
          
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
export default Popular;
