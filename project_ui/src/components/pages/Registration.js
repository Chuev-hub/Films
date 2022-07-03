import React from "react";
import { Link } from "react-router-dom";
import userService from '../../services/userService'

class Registration extends React.Component {
  constructor(props) {
    super(props)    
    this.state = {
        login: '',
        email: '',
        password: '',
        loginError: '',
        passwordError: ''
    };
    this.changePasword = this.changePasword.bind(this);
    this.Register = this.Register.bind(this)
  }
  changePasword(e) {
    if (
      document.getElementById("pasw").value !=
      document.getElementById("rpasw").value
    )
      document.getElementById("error").style.background = "red";
    else
      document.getElementById("error").style.background = "rgb(126, 239, 104)";
  }

  async Register()
  {
    if(document.getElementById('error').style.backgroundColor === 'green')
    {
      let service = new userService()
      let response = await service.registration(this.state.login, 
                                                this.state.email,
                                                this.state.password)
      let isreg = response.ok
      if(isreg === true)
          this.props.history.push('/login')
      else {
        if (response.error === 'Login is not valid')
         {
            this.setState({loginError:response.error, passwordError: '' })
            document.getElementById('logerr').style.display = "block"
            document.getElementById('passerr').style.display = "none"
         } 
        else
        {
          this.setState({loginError:'', passwordError: response.error })
          document.getElementById('logerr').style.display = "none"
          document.getElementById('passerr').style.display = "block"
       } 
      }
    }
  }

  CheckPass(pass)
  {
    let light = document.getElementById('error').style;
    if(pass === this.state.password)
      light.backgroundColor = 'green'
    else
      light.backgroundColor = 'red'
  }

  render() {
    return (
      <div style={{ "margin-top": "100px" }}>
        <div className="d-flex justify-content-center mt-4">
          <div style={{ width: "200px", textAlign: "center" }}>
            <div>
              <labele className="error" id="logerr">{this.state.loginError}</labele>
            </div>
            <div className="input-group mb-3">
              <input
                onChange={event => {this.setState({login: event.target.value})}}
                type="text"
                placeholder="Login"
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
                onChange={event => this.setState({email: event.target.value})}
                type="text"
                placeholder="Email"
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
            <div>
              <labele className="error" id="passerr">{this.state.passwordError}</labele>
            </div>
            <div className="input-group mb-3">
              <input
                onChange={event => this.setState({password: event.target.value})}
                type="password"
                id="pasw"
                placeholder="Password"
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
                onChange={event => this.CheckPass(event.target.value)}
                type="password"
                id="rpasw"
                placeholder="Repeat Password"
                className="form-control "
                style={{
                  color: "white",
                  background: "rgba(0, 0, 0, 0.3)",
                  border: "none",
                }}
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              ></input>
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "5px",
                  background: "red",
                  marginLeft: "15px",
                  marginTop: "12px",
                }}
                id="error"
              ></div>
            </div>

            <div style={{ marginTop: "-11px" }}>
              <a
                href="login"
                style={{
                    color: "#666666",
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    textDecoration: "none",
                    marginLeft: "-15px",
                    borderRadius:'10px',
                    padding:'3px'
                }}
              >
                {" "}
                already have an account?{" "}
              </a>
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
              onClick={() => {this.Register()}}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Registration;
