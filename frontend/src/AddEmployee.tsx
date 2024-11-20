import { Button, Form, FormProps, Input } from "antd";
import { createEmployee } from "./services/EmployeeService";
import { useNavigate } from "react-router-dom";

export type EmployeeType = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

const AddEmployee = () => {
  const navigate = useNavigate();

  const onFinish: FormProps<EmployeeType>["onFinish"] = (values) => {
    console.log("Success:", values);

    createEmployee(values).then((response) => {
      console.log(response.data);
    });

    navigate("/employees");
  };

  const onFinishFailed: FormProps<EmployeeType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex flex-col items-center h-full justify-center">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="w-full flex flex-col items-center justify-center"
      >
        <Form.Item<EmployeeType>
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please input your first name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<EmployeeType>
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please input your last name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<EmployeeType>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" className="bg-blue-900">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddEmployee;
