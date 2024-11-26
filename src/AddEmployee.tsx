import { Button, Form, FormProps, Input, Select } from "antd";
import { createEmployee } from "./services/EmployeeService";
import { useNavigate } from "react-router-dom";
import { EmployeeType } from "./Employeeslist";
import { useEffect, useState } from "react";
import { listDepartments } from "./services/DepartmentService";

const AddEmployee = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([
    {
      departmentName: "",
      departmentDescription: "",
      id:1
    },
  ]); 

  useEffect(() => {
    listDepartments()
      .then((response) => {
        setDepartments(response.data); // Assume response.data is an array of departments
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
          className="w-96"
        >
          <Input />
        </Form.Item>

        <Form.Item<EmployeeType>
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please input your last name" }]}
          className="w-96"
        >
          <Input />
        </Form.Item>

        <Form.Item<EmployeeType>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email" }]}
          className="w-96"
        >
          <Input />
        </Form.Item>

        <Form.Item<EmployeeType>
          label="Department"
          name="departmentId" // This should match the backend field
          rules={[{ required: true, message: "Please select a department" }]}
          className="w-96"
        >
          <Select placeholder="Select a department">
            {departments.map((department) => (
              <Select.Option key={department.id} value={department.id}>
                {department.departmentName}
              </Select.Option>
            ))}
          </Select>
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
