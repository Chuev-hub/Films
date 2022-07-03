import React from "react";
import Test from "../../services/test";
import userService from "../../services/userService";
class Login extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
      login: '',
      password: '',
      error: '',
      isl:'' + sessionStorage.getItem('isLogin')
    }
    this.login = this.login.bind(this)
  }
  async login()
  {
    let service = new userService()
    let response = await service.login(this.state.login, this.state.password)
    let islog = response.ok
    if(islog === true) {
      document.location = '/'
    }
    else {
      document.getElementById('logerror').style.display = 'block'
      this.setState({error: response.error})
    }
  }
  render() {
    return (
      <div style={{ "margin-top": "100px" }}>
        { this.state.isl!=='true'&&
        
        <div className="d-flex justify-content-center mt-4">
          <div style={{ width: "200px", textAlign: "center" }}>
            <div>
            <label className="error" id="logerror">{this.state.error}</label>
            </div>
            <div className="input-group mb-3">
              <input
                onChange={event => this.setState({login: event.target.value})}
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
                onChange={event => this.setState({password: event.target.value})}
                type="password"
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
            <div style={{ marginTop: "-11px" }}>
              <a
                href="registration"
                style={{
                  color: "#666666",
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  textDecoration: "none",
                  marginLeft: "-15px",
                  borderRadius:'10px',
                  padding:'3px'
                }}
              >
                do not have an account?
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
                marginLeft: "120px",
              }}
              onClick={() => this.login()}
            >
              login
            </button>
          </div>
        </div>
        }
        { this.state.isl==='true'&&
        <div className="d-flex justify-content-center">
  <div
          style={{
            color: "white",
            fontSize: "3vw",
            width: "40vw",
            textShadow: "5px 2px rgba(0,00,0,0.5)",
          }}
        >
          You are already logined
        </div>
        </div>
           }
      </div>
      );
  }
}

export default Login;