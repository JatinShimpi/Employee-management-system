import { Button, Checkbox, Form, Input, message } from "antd";
import { useState } from "react";
import { login, saveToken } from "./services/auth";
import { useAuth } from "./contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface FormTypes {
  username: string;
  password: string;
}

const Loginpage = () => {
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { loginContext } = useAuth();

  const onFinish = async (values: FormTypes) => {
    setLoading(true);
    const response = await login(values.username, values.password);
    setLoading(false);

    if (isAgreed && response.status == 200) {
      console.log("Form submitted successfully:", values);
      message.success("Login successful!");
      const token = response.data.accessToken;
      saveToken(token);
      navigate("/dashboard")
      loginContext(); // sets the login state to true in context
    } else {
      message.error("You must agree to the Terms of Use and Privacy Policy!");
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-row">
      <div className="w-1/2 h-screen flex items-center justify-center">
        <img src="/Group30.png" className=" mx-auto" />
      </div>
      <div className="w-1/2 h-screen flex items-center justify-center">
        <div className="w-[500px] h-[420px] mx-auto my-auto bg-white py-7 rounded-md shadow-lg">
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
              <Button
                type="primary"
                htmlType="submit"
                block
                className="h-12"
                loading={loading}
                disabled={loading}
              >
                Login
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

export default Loginpage;
