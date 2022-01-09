import React from "react";
// import "./App.scss";
// import { Login, Register } from "./components/login/index";
import { Login } from "./components/login/index";
import { Button, Row } from "antd";
import "antd/dist/antd.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogginActive: false,
      renderLogin: null,
    };
  }

  handleLoginRegister = (renderLogin) => {
    this.setState({
      renderLogin,
    });
  };

  handleLogInActive = () => {
    this.setState({
      isLogginActive: true,
    });
  };

  render() {
    const { isLogginActive } = this.state;
    const current = isLogginActive ? "Register" : "Login";
    return (
      <div className="App">
        <Row style={{ marginTop: "50px" }}></Row>

        <Row justify="center">
          <Button type="primary" onClick={() => this.handleLoginRegister(true)}>
            Login
          </Button>{" "}
          &nbsp; &nbsp; &nbsp; &nbsp;
          <Button
            type="primary"
            onClick={() => this.handleLoginRegister(false)}
          >
            Register
          </Button>
        </Row>
        {this.state.renderLogin ? (
          <Login
            handleLogInActive={this.handleLogInActive}
            renderLogin={this.state.renderLogin}
          />
        ) : (
          <Login
            handleLogInActive={this.handleLogInActive}
            renderLogin={this.state.renderLogin}
          />
        )}

        {/* {!isLogginActive && (
              <Register containerRef={(ref) => (this.current = ref)} />
            )} */}
      </div>
    );
  }
}
export default App;
