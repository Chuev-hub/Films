import { Link, NavLink } from "react-router-dom";
import React from "react";
import { simpleService } from "../../services/simpleService";
class AddFilm extends React.Component {
  constructor(props) {
    super(props);
    this.actors = [];
    this.genres = [];
    this.producers = [];
    this.directors = [];
    this.companies = [];
    this.state = {
      isadmin: "" + sessionStorage.getItem("isAdmin"),
      actors: [],
      genres: [],
      producers: [],
      directors: [],
      companies: [],
      Adedactors: [],
      Adedgenres: [],
      Adedproducers: [],
      Adeddirectors: [],
      Adedcompanies: [],
    };
    this.Checks = this.Checks.bind(this);
    this.Add = this.Add.bind(this);
    this.addactor = this.addactor.bind(this);
    this.adddirector = this.adddirector.bind(this);
    this.addproducer = this.addproducer.bind(this);
    this.addgenre = this.addgenre.bind(this);
    this.delactor = this.delactor.bind(this);
    this.deldirector = this.deldirector.bind(this);
    this.delproducer = this.delproducer.bind(this);
    this.delgenre = this.delgenre.bind(this);
  }
  Add(){
    let us = new simpleService("film");
    // let v =[]
    // for(let i =0;i<this.state.Adedactors.length;i++)
    //          v.push({name:this.state.Adedactors[i].name})
    us.POST( {
        title :document.getElementById("t").value,
          dateOfPublishing :document.getElementById("da").value,
          description :document.getElementById("d").value,
          rating :document.getElementById("r").value,
          image :document.getElementById("i").value,
           actors : this.state.Adedactors,
           genres :this.state.Adedgenres,
           producers: this.state.Adedproducers,
           directors :this.state.Adeddirectors,
          companyId:document.getElementById("saa").selectedOptions[0].value
    }).then(()=>{
      
    })
  }
  componentDidMount() {
    let us = new simpleService("actor");
    us.response("All", 2).then((x) => {
      this.actors = x;
      let us2 = new simpleService("genre");
      us2.response("All", 2).then((x) => {
        this.genres = x;
        let us22 = new simpleService("producer");
        us22.response("All", 2).then((x) => {
          this.producers = x;
          let u22s = new simpleService("director");
          u22s.response("All", 2).then((x) => {
            this.directors = x;
            let us1 = new simpleService("company");
            us1.response("All", 2).then((x) => {
              this.companies = x;
              this.setState({
                isadmin: "" + sessionStorage.getItem("isAdmin"),
                actors: this.actors,
                genres: this.genres,
                producers: this.producers,
                directors: this.directors,
                companies: this.companies,
                Adedactors: [],
                Adedgenres: [],
                Adedproducers: [],
                Adeddirectors: [],
                Adedcompanies: [],
              });
            });
          });
        });
      });
    });
  }
  delactor(x) {
    let t = [];
    for (let i = 0; i < this.state.Adedactors.length; i++)
    if (this.state.Adedactors[i].id != x)
        t.push(this.state.Adedactors[i]); 

    let m = this.state.actors
    m.push({name:document.getElementById('actor'+x).innerText,id:x})
    this.setState((x) => ({
      isadmin: x.isadmin,
      actors: m,
      genres: x.genres,
      producers: x.producers,
      directors: x.directors,
      companies: x.companies,
      Adedgenres: x.Adedgenres,
      Adedproducers: x.Adedproducers,
      Adeddirectors: x.Adeddirectors,
      Adedcompanies: x.Adedcompanies,
      Adedactors: t,
    }));
    console.log(this.state);
  }
  delgenre(x) {
    let t = [];
    for (let i = 0; i < this.state.Adedgenres.length; i++)
    if (this.state.Adedgenres[i].id != x)
        t.push(this.state.Adedgenres[i]); 

    let m = this.state.genres
    m.push({name:document.getElementById('genre'+x).innerText,id:x})
    this.setState((x) => ({
        isadmin: x.isadmin,
        actors: x.actors,
        genres: m,
        producers: x.producers,
        directors: x.directors,
        companies: x.companies,
        Adedgenres: t,
        Adedproducers: x.Adedproducers,
        Adeddirectors: x.Adeddirectors,
        Adedcompanies: x.Adedcompanies,
        Adedactors: x.Adedactors,
    }));
    console.log(this.state);
  }
  deldirector(x) {
    let t = [];
    for (let i = 0; i < this.state.Adeddirectors.length; i++)
    if (this.state.Adeddirectors[i].id != x)
        t.push(this.state.Adeddirectors[i]); 

    let m = this.state.directors
    m.push({name:document.getElementById('director'+x).innerText,id:x})
    this.setState((x) => ({
        isadmin: x.isadmin,
      actors: x.actors,
      genres: x.genres,
      producers: x.producers,
      directors: m,
      companies: x.companies,
      Adedgenres: x.Adedgenres,
      Adedproducers: x.Adedproducers,
      Adeddirectors: t,
      Adedcompanies: x.Adedcompanies,
      Adedactors: x.Adedactors,
    }));
    console.log(this.state);
  }
  delproducer(x) {
    let t = [];
    for (let i = 0; i < this.state.Adedproducers.length; i++)
    if (this.state.Adedproducers[i].id != x)
        t.push(this.state.Adedproducers[i]); 

    let m = this.state.producers
    m.push({name:document.getElementById('producer'+x).innerText,id:x})
    this.setState((x) => ({
        isadmin: x.isadmin,
        actors: x.actors,
        genres: x.genres,
        producers: m,
        directors: x.directors,
        companies: x.companies,
        Adedgenres: x.Adedgenres,
        Adedproducers: t,
        Adeddirectors: x.Adeddirectors,
        Adedcompanies: x.Adedcompanies,
        Adedactors: x.Adedactors,
    }));
    console.log(this.state);
  }
  addactor() {
    let t = this.state.Adedactors;
    t.push({
      name: document.getElementById("sa").selectedOptions[0].innerText,
      id: document.getElementById("sa").selectedOptions[0].value,
    });

    let m = [];
    for (let i = 0; i < this.state.actors.length; i++)
      if (this.state.actors[i].id != t[t.length - 1].id)
        m.push(this.state.actors[i]);

    this.setState((x) => ({
      isadmin: x.isadmin,
      actors: m,
      genres: x.genres,
      producers: x.producers,
      directors: x.directors,
      companies: x.companies,
      Adedgenres: x.Adedgenres,
      Adedproducers: x.Adedproducers,
      Adeddirectors: x.Adeddirectors,
      Adedcompanies: x.Adedcompanies,
      Adedactors: t,
    }));
    console.log(this.state);
  }
  addgenre() {
    let t = this.state.Adedgenres;
    t.push({
      name: document.getElementById("sg").selectedOptions[0].innerText,
      id: document.getElementById("sg").selectedOptions[0].value,
    });

    let m = [];
    for (let i = 0; i < this.state.genres.length; i++)
      if (this.state.genres[i].id != t[t.length - 1].id)
        m.push(this.state.genres[i]);

    this.setState((x) => ({
      isadmin: x.isadmin,
      actors: x.actors,
      genres: m,
      producers: x.producers,
      directors: x.directors,
      companies: x.companies,
      Adedgenres: t,
      Adedproducers: x.Adedproducers,
      Adeddirectors: x.Adeddirectors,
      Adedcompanies: x.Adedcompanies,
      Adedactors: x.Adedactors,
    }));
    console.log(this.state);
  }
  addproducer() {
    let t = this.state.Adedproducers;
    t.push({
      name: document.getElementById("sp").selectedOptions[0].innerText,
      id: document.getElementById("sp").selectedOptions[0].value,
    });

    let m = [];
    for (let i = 0; i < this.state.producers.length; i++)
      if (this.state.producers[i].id != t[t.length - 1].id)
        m.push(this.state.producers[i]);

    this.setState((x) => ({
      isadmin: x.isadmin,
      actors: x.actors,
      genres: x.genres,
      producers: m,
      directors: x.directors,
      companies: x.companies,
      Adedgenres: x.Adedgenres,
      Adedproducers: t,
      Adeddirectors: x.Adeddirectors,
      Adedcompanies: x.Adedcompanies,
      Adedactors: x.Adedactors,
    }));
    console.log(this.state);
  }
  adddirector() {
    let t = this.state.Adeddirectors;
    t.push({
      name: document.getElementById("sd").selectedOptions[0].innerText,
      id: document.getElementById("sd").selectedOptions[0].value,
    });

    let m = [];
    for (let i = 0; i < this.state.directors.length; i++)
      if (this.state.directors[i].id != t[t.length - 1].id)
        m.push(this.state.directors[i]);

    this.setState((x) => ({
      isadmin: x.isadmin,
      actors: x.actors,
      genres: x.genres,
      producers: x.producers,
      directors: m,
      companies: x.companies,
      Adedgenres: x.Adedgenres,
      Adedproducers: x.Adedproducers,
      Adeddirectors: t,
      Adedcompanies: x.Adedcompanies,
      Adedactors: x.Adedactors,
    }));
    console.log(this.state);
  }
  Checks() {
    let r = +document.getElementById("r").value;
    if (r < 0) document.getElementById("r").value = 0;
    if (r > 10) document.getElementById("r").value = 10;
  }
  render() {
    return (
      <div style={{ marginTop: "100px" }}>
        {this.state.isadmin === "true" && (
          <div>
            <div className="d-flex justify-content-center">
              <div>
                {" "}
                <div
                  style={{
                    color: "white",
                    fontSize: "25px",
                    textShadow: "5px 2px rgba(0,00,0,0.5)",
                  }}
                >
                  Add Film:
                </div>
                <div className="d-flex justify-content-center mt-4">
                  <div style={{ width: "200px", textAlign: "center" }}>
                    <div className="input-group mb-3">
                      <input
                        onChange={(event) => {
                          this.setState({ login: event.target.value });
                        }}
                        type="text"
                        id="t"
                        placeholder="Title"
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
                        onChange={(event) =>
                          this.setState({ email: event.target.value })
                        }
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

                    <input
                      id="da"
                      type="date"
                      placeholder="Date"
                      className="form-control "
                      style={{
                        color: "white",
                        background: "rgba(0, 0, 0, 0.3)",
                        border: "none",
                        width: "200px",
                        marginTop: "15px",
                      }}
                    />
                    <input
                      id="r"
                      type="number"
                      placeholder="Rating"
                      onInput={this.Checks}
                      className="form-control "
                      style={{
                        color: "white",
                        background: "rgba(0, 0, 0, 0.3)",
                        border: "none",
                        width: "200px",
                        marginTop: "15px",
                      }}
                    />

                    <div className="input-group mb-3">
                      <textarea
                        class="form-control"
                        placeholder="Description"
                        id="d"
                        rows="3"
                        style={{
                          color: "white",
                          background: "rgba(0, 0, 0, 0.3)",
                          border: "none",
                          marginTop: "10px",
                        }}
                      ></textarea>
                    </div>
                    <div
                      style={{
                        color: "white",
                        fontSize: "20px",
                        textShadow: "5px 2px rgba(0,00,0,0.5)",
                      }}
                    >
                      Actors:
                    </div>
                    {this.state.Adedactors.map((x) => {
                      return (
                        <div className="d-flex ">
                          <div
                            style={{
                              color: "white",
                              fontSize: "20px",
                              textShadow: "0.3vw 2px rgba(0,00,0,0.5)",
                            }}
                            id={"actor" + x.id}
                          >
                            {x.name}
                          </div>
                          <button
                            className="btn text-danger"
                            onClick={()=>this.delactor(x.id)}
                          >
                            -
                          </button>
                        </div>
                      );
                    })}
                    <div className="d-flex ">
                      <select
                        style={{
                          color: "white",
                          background: "rgba(0, 0, 0, 0.3)",
                          border: "none",
                        }}
                        class="form-select"
                        id="sa"
                        aria-label="Default select example"
                      >
                        {this.state.actors.map((x) => {
                          return <option value={x.id}>{x.name}</option>;
                        })}
                      </select>
                      <button
                        className="btn text-white"
                        onClick={this.addactor}
                      >
                        +
                      </button>
                    </div>

                    <div
                      style={{
                        color: "white",
                        fontSize: "2vw",
                        textShadow: "5px 2px rgba(0,00,0,0.5)",
                      }}
                    >
                      Geners:
                    </div>
                    {this.state.Adedgenres.map((x) => {
                      return (
                        <div className="d-flex ">
                          <div
                            style={{
                              color: "white",
                              fontSize: "20px",
                              textShadow: "0.3vw 2px rgba(0,00,0,0.5)",
                            }}
                            id={"genre" + x.id}
                          >
                            {x.name}
                          </div>
                          <button
                            className="btn text-danger"
                            onClick={()=>this.delgenre(x.id)}
                          >
                            -
                          </button>
                        </div>
                      );
                    })}
                    <div className="d-flex ">
                      <select
                        style={{
                          color: "white",
                          background: "rgba(0, 0, 0, 0.3)",
                          border: "none",
                        }}
                        class="form-select"
                        id="sg"
                        aria-label="Default select example"
                      >
                        {this.state.genres.map((x) => {
                          return <option value={x.id}>{x.name}</option>;
                        })}
                      </select>
                      <button
                        className="btn text-white"
                        onClick={this.addgenre}
                      >
                        +
                      </button>
                    </div>
                    <div
                      style={{
                        color: "white",
                        fontSize: "2vw",
                        textShadow: "5px 2px rgba(0,00,0,0.5)",
                      }}
                    >
                      Producers:
                    </div>
                    {this.state.Adedproducers.map((x) => {
                      return (
                        <div className="d-flex ">
                          <div
                            style={{
                              color: "white",
                              fontSize: "20px",
                              textShadow: "0.3vw 2px rgba(0,00,0,0.5)",
                            }}
                            id={"producer" + x.id}
                          >
                            {x.name}
                          </div>
                          <button
                            className="btn text-danger"
                            onClick={()=>this.delproducer(x.id)}
                          >
                            -
                          </button>
                        </div>
                      );
                    })}
                    <div className="d-flex ">
                      <select
                        style={{
                          color: "white",
                          background: "rgba(0, 0, 0, 0.3)",
                          border: "none",
                        }}
                        class="form-select"
                        id="sp"
                        aria-label="Default select example"
                      >
                        {this.state.producers.map((x) => {
                          return <option value={x.id}>{x.name}</option>;
                        })}
                      </select>
                      <button
                        className="btn text-white"
                        onClick={this.addproducer}
                      >
                        +
                      </button>
                    </div>
                    <div
                      style={{
                        color: "white",
                        fontSize: "2vw",
                        textShadow: "5px 2px rgba(0,00,0,0.5)",
                      }}
                    >
                      Directors:
                    </div>
                    {this.state.Adeddirectors.map((x) => {
                      return (
                        <div className="d-flex ">
                          <div
                            style={{
                              color: "white",
                              fontSize: "20px",
                              textShadow: "0.3vw 2px rgba(0,00,0,0.5)",
                            }}
                            id={"director" + x.id}
                          >
                            {x.name}
                          </div>
                          <button
                            className="btn text-danger"
                            onClick={()=>this.deldirector(x.id)}
                          >
                            -
                          </button>
                        </div>
                      );
                    })}
                    <div className="d-flex ">
                      <select
                        style={{
                          color: "white",
                          background: "rgba(0, 0, 0, 0.3)",
                          border: "none",
                        }}
                        class="form-select"
                        id="sd"
                        aria-label="Default select example"
                      >
                        {this.state.directors.map((x) => {
                          return <option value={x.id}>{x.name}</option>;
                        })}
                      </select>
                      <button
                        className="btn text-white"
                        onClick={this.adddirector}
                      >
                        +
                      </button>
                    </div>
                    <div
                      style={{
                        color: "white",
                        fontSize: "2vw",
                        textShadow: "5px 2px rgba(0,00,0,0.5)",
                      }}
                    >
                      Company:
                    </div>
                    <select
                      style={{
                        color: "white",
                        background: "rgba(0, 0, 0, 0.3)",
                        border: "none",
                      }}
                      class="form-select"
                      id="saa"
                      aria-label="Default select example"
                    >
                      {this.state.companies.map((x) => {
                        return <option value={x.id}>{x.name}</option>;
                      })}
                    </select>
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
                      onClick={() => {
                        this.Add();
                      }}
                    >
                      Add!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
export default AddFilm;
