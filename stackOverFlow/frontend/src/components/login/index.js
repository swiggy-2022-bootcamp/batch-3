import React from "react";
import { Form, Input, Button, Checkbox, Row, Col, notification } from "antd";
import { handleLoginRequest, handleRegisterRequest } from "../../api/index";
// import loginImg from "../../login.svg";

export class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  openNotification = (description = "", type = "success", duration = 5) => {
    const args = {
      message: "Notification",
      description,
      duration,
    };
    notification[type](args);
  };

  handleLoginRequest = async (values) => {
    const { email, password } = values;

    const data = { email, password };

    const response = await handleLoginRequest(data);

    if (response.success === true) {
      this.openNotification("Successfully LoggedIn");
      this.props.handleLogInActive();
    }
  };

  handleRegsiterRequest = async (values) => {
    const { name, email, password } = values;

    const data = { email, password, name };

    const response = await handleRegisterRequest(data);

    if (response.success === true) {
      this.openNotification("Successfully LoggedIn");
      this.props.handleLogInActive();
    }
  };

  onFinish = (values) => {
    if (this.props.renderLogin === true) {
      this.handleLoginRequest(values);
    } else {
      this.handleRegsiterRequest(values);
    }
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    return (
      <>
        <Row justify="center">
          <Col>
            <h1>
              <b>{this.props.renderLogin ? "LogIn" : "Register"}</b>
            </h1>
          </Col>
        </Row>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          autoComplete="off"
        >
          {this.props.renderLogin === false ? (
            <>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </>
          ) : null}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}

export default Login;
