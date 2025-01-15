import { Button, Checkbox, Form, Input, message } from "antd";
import { useState } from "react";
import { SignUp } from "./services/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface FormTypes {
  username: string;
  password: string;
  email: string;
}

const Signup = () => {
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const navigate = useNavigate();

  const onFinish = async (values: FormTypes) => {
    try {
      const response = await SignUp(
        values.username,
        values.password,
        values.email,
        ["admin", "user"]
      );

      if (isAgreed && response.status === 200) {
        console.log(response);
        message.success("User successfully registered");
        navigate("/dashboard")
      } else {
        message.error(`${response.data.message}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          message.error(`${error.response.data.message}`);
        } else if (error.request) {
          message.error("No response received from server");
        } else {
          message.error(`Request error: ${error.message}`);
        }
      } else {
        message.error("An unexpected error occurred");
      }
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-row">
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-[500px] h-[520px] mx-auto my-auto bg-white py-7 rounded-md shadow-lg">
          <div className="text-2xl ml-[50px] mb-6">Get Started</div>
          <Form
            name="login"
            layout="vertical"
            onFinish={onFinish}
            style={{ maxWidth: 400, margin: "0 auto" }}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input placeholder="Enter your username" className="h-12" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input placeholder="Enter your email" className="h-12" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                className="h-12"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block className="h-12">
                Signup
              </Button>
            </Form.Item>

            <Checkbox onChange={(e) => setIsAgreed(e.target.checked)}>
              I agree to the{" "}
              <a href="/terms" target="_blank" rel="noopener noreferrer">
                Terms of Use
              </a>{" "}
              and{" "}
              <a href="/privacy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
            </Checkbox>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
