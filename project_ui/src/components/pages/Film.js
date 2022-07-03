// import { BrowserRouter as Route } from 'react-router-dom';
import React from "react";
import userService from "../../services/userService";
import filmService from "../../services/filmService";
import { Link } from "react-router-dom";
import { simpleService } from "../../services/simpleService";

class Film extends React.Component {
  constructor(props) {
    super(props);
  
    this.id = 0;
    this.Title = "";
    this.Rating = 0.0;
    this.DateOfPublishing = "";
    this.Description = "";
    this.Image = "";
    this.Actors = [];
    this.Genres = [];
    this.Producers = [];
    this.Selections = [];
    this.Directors = [];
    this.CompanyId = 0;
    this.Selections1=[];
    this.state = {
      id: 0,
      Title: "",
      Rating: 0.0,
      DateOfPublishing: "",
      Description: "",
      Image: "",
      Actors: [],
      Genres: [],
      Producers: [],
      Selections: [],
      Directors: [],
      CompanyId: 0,
      Selections: this.Selections,
      Selections1: this.Selections1,
      i:0,
      modal:[]
    };
    this.Add=this.Add.bind(this)
    this.contains=this.contains.bind(this)
    this.AddToSelection=this.AddToSelection.bind(this)
    this.DeleteFromSelection=this.DeleteFromSelection.bind(this)
    
  }
  AddToSelection(x){
    let us = new filmService();
    let y=this.state.i+1;
    let uss = new simpleService("selection");
    uss.PUTfilmselection({selId:x,filmId:this.id},"AddFilm").then(
     ()=>{
      us.getSelections(this.id).then((xxxxc) => {
        this.Selections = xxxxc;
      uss.response("UsersSelections", sessionStorage.getItem("id")).then((x) => {

        this.Selections1 = x
        this.setState({
          id: this.id,
          Title: this.Title,
          Rating: this.Rating,
          DateOfPublishing: this.DateOfPublishing.substr(0, 10),
          Description: this.Description,
          Image: this.Image,
          Actors: this.Actors,
          Genres: this.Genres,
          Producers: this.Producers,
          Selections: this.Selections,
          Directors: this.Directors,
          Selections1:this.Selections1,
          i:y,
          modal: this.Selections1.map((x) => (
            <div style={{ margin:'10px'}} key={x.id} className="d-flex justify-content-between">
              <div 
                style={{
                  color: "white",
                  fontSize: "20px",
                  textShadow: "0.3vw 2px rgba(0,00,0,0.5)",
                  alignSelf: "center",
                  textAlign: "center",
                 
                }}
              >
                {x.name}
              </div>
              {this.contains(this.Selections,x.id,this.state.i)==true &&
              <button className="btn btn-danger" onClick={()=>this.DeleteFromSelection(x.id)} style={{width:'40px',height:'40px',marginLeft:"10px", textAlign:'center'}}>-</button>
              }
              {this.contains(this.Selections,x.id,this.state.i)==false &&
              <button className="btn btn-success" onClick={()=>this.AddToSelection(x.id)} style={{width:'40px',height:'40px',marginLeft:"10px", textAlign:'center'}}>+</button>
              }
            </div>
          ))
        });
      });
      });
     }
      
    )
  }
  contains(arr, pred,i) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id===pred) {
            return true;
        }
    }
    return false;
  }
  DeleteFromSelection(x){
    let y=this.state.i+1;
    let us = new filmService();

    let uss = new simpleService("selection");
    uss.PUTfilmselection({selId:x,filmId:this.id},"RemoveFilm").then(
      ()=>{
        us.getSelections(this.id).then((xxxxc) => {
          this.Selections = xxxxc;

        uss.response("UsersSelections", sessionStorage.getItem("id")).then((x) => {
  
          this.Selections1 = x
          this.setState({
            id: this.id,
            Title: this.Title,
            Rating: this.Rating,
            DateOfPublishing: this.DateOfPublishing.substr(0, 10),
            Description: this.Description,
            Image: this.Image,
            Actors: this.Actors,
            Genres: this.Genres,
            Producers: this.Producers,
            Selections: this.Selections,
            Directors: this.Directors,
            Selections1:this.Selections1,
            i:y,
            modal: this.Selections1.map((x) => (
              <div style={{ margin:'10px'}} key={x.id} className="d-flex justify-content-between">
                <div 
                  style={{
                    color: "white",
                    fontSize: "20px",
                    textShadow: "0.3vw 2px rgba(0,00,0,0.5)",
                    alignSelf: "center",
                    textAlign: "center",
                   
                  }}
                >
                  {x.name}
                </div>
                {this.contains(this.Selections,x.id,this.state.i)==true &&
                <button className="btn btn-danger" onClick={()=>this.DeleteFromSelection(x.id)} style={{width:'40px',height:'40px',marginLeft:"10px", textAlign:'center'}}>-</button>
                }
                {this.contains(this.Selections,x.id,this.state.i)==false &&
                <button className="btn btn-success" onClick={()=>this.AddToSelection(x.id)} style={{width:'40px',height:'40px',marginLeft:"10px", textAlign:'center'}}>+</button>
                }
              </div>
            ))
          });
        }); });
       }
    )
  }
  componentDidMount() {
    const id1 = this.props.match.params.id;
    this.id = id1;
    let uss = new simpleService("selection");
    if(sessionStorage.getItem("id")){

    
    uss.response("UsersSelections", sessionStorage.getItem("id")).then((x) => {

      this.Selections1 = x
     
      let us = new filmService();
      us.getFilm(id1).then((x) => {
        this.Title = x.title;
        this.Rating = x.rating;
        this.DateOfPublishing = x.dateOfPublishing;
        this.Description = x.description;
        this.Image = x.image;
  
        this.CompanyId = x.CompanyId;
  
        this.Actors = [];
        this.Genres = [];
        this.Producers = [];
        this.Selections = [];
        this.Directors = [];
  
        us.getActors(id1).then((xx) => {
          this.Actors = xx;
          us.getGenres(id1).then((xxx) => {
            this.Genres = xxx;
            us.getProducers(id1).then((xxxx) => {
              this.Producers = xxxx;
  
              us.getSelections(id1).then((xxxxc) => {
                this.Selections = xxxxc;
  
                us.getDirectors(id1).then((xxxxcc) => {
                  this.Directors = xxxxcc;
                  this.setState({
                    id: this.id,
                    Title: this.Title,
                    Rating: this.Rating,
                    DateOfPublishing: this.DateOfPublishing.substr(0, 10),
                    Description: this.Description,
                    Image: this.Image,
                    Actors: this.Actors,
                    Genres: this.Genres,
                    Producers: this.Producers,
                    Selections: this.Selections,
                    Directors: this.Directors,
                    Selections1:this.Selections1,
                    i:0,
                    modal: this.Selections1.map((x) => (
                      <div style={{ margin:'10px'}} key={x.id} className="d-flex justify-content-between">
                        <div 
                          style={{
                            color: "white",
                            fontSize: "20px",
                            textShadow: "0.3vw 2px rgba(0,00,0,0.5)",
                            alignSelf: "center",
                            textAlign: "center",
                           
                          }}
                        >
                          {x.name}
                        </div>
                        {this.contains(this.Selections,x.id,this.state.i)==true &&
                        <button className="btn btn-danger" onClick={()=>this.DeleteFromSelection(x.id)} style={{width:'40px',height:'40px',marginLeft:"10px", textAlign:'center'}}>-</button>
                        }
                        {this.contains(this.Selections,x.id,this.state.i)==false &&
                        <button className="btn btn-success" onClick={()=>this.AddToSelection(x.id)} style={{width:'40px',height:'40px',marginLeft:"10px", textAlign:'center'}}>+</button>
                        }
                      </div>
                    ))
                  });
                });
              });
            });
          });
        });
      });
    });
  }
  else{

      this.Selections1 = []
     
      let us = new filmService();
      us.getFilm(id1).then((x) => {
        this.Title = x.title;
        this.Rating = x.rating;
        this.DateOfPublishing = x.dateOfPublishing;
        this.Description = x.description;
        this.Image = x.image;
  
        this.CompanyId = x.CompanyId;
  
        this.Actors = [];
        this.Genres = [];
        this.Producers = [];
        this.Selections = [];
        this.Directors = [];
  
        us.getActors(id1).then((xx) => {
          this.Actors = xx;
          us.getGenres(id1).then((xxx) => {
            this.Genres = xxx;
            us.getProducers(id1).then((xxxx) => {
              this.Producers = xxxx;
  
              us.getSelections(id1).then((xxxxc) => {
                this.Selections = xxxxc;
  
                us.getDirectors(id1).then((xxxxcc) => {
                  this.Directors = xxxxcc;
                  this.setState({
                    id: this.id,
                    Title: this.Title,
                    Rating: this.Rating,
                    DateOfPublishing: this.DateOfPublishing.substr(0, 10),
                    Description: this.Description,
                    Image: this.Image,
                    Actors: this.Actors,
                    Genres: this.Genres,
                    Producers: this.Producers,
                    Selections: this.Selections,
                    Directors: this.Directors,
                    Selections1:this.Selections1,
                    i:0,
                    modal:(<></>)
                  });
                });
              });
            });
          });
        });
      });
    
  }
 
  }
  Add(){
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
      modal.style.display = "block";
    span.onclick = function() {
      modal.style.display = "none";
    }
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }
  render() {
    return (
      <>
        <div
          style={{ marginTop: "100px" }}
          className="d-flex justify-content-center"
        >
          <div>
            {" "}
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
            <div>
              <div
                className="d-flex justify-content-end"
                style={{ width: "20vw" }}
              >
                <div className="star" />
                <div
                  style={{
                    color: "white",
                    fontSize: "3vw",
                    width: "4vw",
                    textShadow: "0.3vw 2px rgba(0,00,0,0.5)",
                  }}
                >
                  {this.state.Rating}
                </div>
              </div>
              <div
                style={{
                  color: "rgb(212, 212, 212)",
                  fontSize: "2vw",
                  alignSelf: "end",
                  marginLeft: "10vw",
                }}
              >
                {this.state.DateOfPublishing}
              </div>
              <div
                style={{
                  color: "white",
                  fontSize: "3vw",
                  marginLeft: "10vw",
                  textShadow: "0.3vw 2px rgba(0,00,0,0.5)",
                }}
              >
                Genres:
              </div>
              {this.state.Genres.map((i) => {
                return (
                  <div className="d-flex justify-content-end">
                    <div
                      style={{
                        color: "white",
                        fontSize: "2vw",
                        textShadow: "0.3vw 2px rgba(0,00,0,0.5)",
                      }}
                      key={i.id}
                    >
                      {i.name}
                    </div>
                  </div>
                );
              })}
              { '' + sessionStorage.getItem('isLogin')==='true' &&
              <div className="d-flex justify-content-end">
               <button style={{ }} onClick={this.Add} className="btn text-light bg-dark"> Add </button>


              </div>
               }
            </div>
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
              {this.state.Title}
            </div>

            <div
              style={{
                color: "white",
                marginTop: "3vw",
                fontSize: "1.5vw",
                width: "45vw",
                textShadow: "5px 2px rgba(0,00,0,0.5)",
              }}
            >
              {this.state.Description}
            </div>
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
          Actors:
        </div>
        
        {this.state.Actors.map((i) => {
                return (
                    <div>
                    <Link
                       to={'/actors/'+i.id}
                      style={{
                        color: "white",
                        fontSize: "2vw",
                        textShadow: "0.3vw 2px rgba(0,00,0,0.5)",
                        marginLeft:"22vw"
                      }}
                      key={i.id}
                    >
                      {i.name}
                    </Link>
                    </div>
                );
              })}

        <div
          style={{
            color: "white",
            fontSize: "3vw",
            width: "40vw",
            marginLeft: "17vw",
            textShadow: "5px 2px rgba(0,00,0,0.5)",
          }}
        >
          Producers:
        </div>
        {this.state.Producers.map((i) => {
                return (
                    <div>
                    <Link
                    to={'/Producers/'+i.id}
                   style={{
                     color: "white",
                     fontSize: "2vw",
                     textShadow: "0.3vw 2px rgba(0,00,0,0.5)",
                     marginLeft:"22vw"
                   }}
                   key={i.id}
                 >
                   {i.name}
                 </Link>
                 </div>
                );
              })}
        <div
          style={{
            color: "white",
            fontSize: "3vw",
            width: "40vw",
            marginLeft: "17vw",
            textShadow: "5px 2px rgba(0,00,0,0.5)",
          }}
        >
          Directors:
        </div>
        {this.state.Directors.map((i) => {
                return (
                 <div>
                    <Link
                    to={'/Directors/'+i.id}
                   style={{
                     color: "white",
                     fontSize: "2vw",
                     textShadow: "0.3vw 2px rgba(0,00,0,0.5)",
                     marginLeft:"22vw"
                   }}
                   key={i.id}
                 >
                   {i.name}
                 </Link>
                 </div>
                );
              })}
        <div
          style={{
            color: "white",
            fontSize: "3vw",
            width: "40vw",
            marginLeft: "17vw",
            textShadow: "5px 2px rgba(0,00,0,0.5)",
          }}
        >
          Selections:
        </div>  {this.state.Selections.map((i) => {
                return (
                    <div>
                    <Link
                    to={'/Selections/'+i.id}
                   style={{
                     color: "white",
                     fontSize: "2vw",
                     textShadow: "0.3vw 2px rgba(0,00,0,0.5)",
                     marginLeft:"22vw"
                   }}
                   key={i.id}
                 >
                   {i.name}
                 </Link>
                 </div>
                );
              })  
              }
          {this.state.Selections.length==0 &&
       <div
       style={{
         color: "white",
         fontSize: "2vw",
         textShadow: "0.3vw 2px rgba(0,00,0,0.5)",
         marginLeft:"22vw"
       }}
      
     >
       There are not.
     </div>
      }
      <div style={{marginTop:"100px"}}></div>
      <div id="myModal" class="modal">

 
  <div class="modal-conten">
    <div className="d-flex justify-content-end">
    <span class="close">&times;</span>
    </div>
    {this.state.modal}
    {this.state.Selections1.length==0 &&
       <div
       style={{
         color: "white",
         fontSize: "2vw",
         textShadow: "0.3vw 2px rgba(0,00,0,0.5)",
         marginLeft:"22vw"
       }}
      
     >
       There are not selections.
     </div>
      }
    </div>
  </div>
  
      </>
    );
  }
}
export default Film;
