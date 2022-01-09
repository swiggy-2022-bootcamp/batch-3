import React from "react";
import { Form, Input, Button, Checkbox, Row, Col, notification } from "antd";
import { handleCreateQuestionRequest } from "../../api/index";
import Notification from "../../utils/helper";
// import loginImg from "../../login.svg";

export class Question extends React.Component {
  constructor(props) {
    super(props);
  }

  handleCreateQuestionRequest = async (values) => {
    const { title, body } = values;

    const response = await handleCreateQuestionRequest({
      question: { title, body },
    });

    if (response.success === true) {
      this.openNotification("Question created Successfully!");
    }
  };

  openNotification = (description = "", type = "success", duration = 5) => {
    const args = {
      message: "Notification",
      description,
      duration,
    };
    notification[type](args);
  };

  onFinish = (values) => {
    this.handleCreateQuestionRequest(values);
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    return (
      <>
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
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input the question title!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Body"
            name="body"
            rules={[
              {
                required: true,
                message: "Please input the question body!",
              },
            ]}
          >
            <Input.TextArea />
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

export default Question;
