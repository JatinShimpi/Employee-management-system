import { Button, Form, FormProps, Input, Select } from "antd";
import { getEmployee, updateEmployee } from "./services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { EmployeeType } from "./Employeeslist";
import { listDepartments } from "./services/DepartmentService";

const UpdateEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    listDepartments()
      .then((response) => {
        setDepartments(response.data); // Assume response.data is an array of departments
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (!id) {
      // If no `id` is provided, navigate back or show an error
      console.error("No ID provided for the department update.");
      navigate("/employees"); // Navigate to a safe route
      return;
    }

    setLoading(true);
    getEmployee(+id)
      .then((response) => {
        form.setFieldsValue(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch employee details:", error);
      })
      .finally(() => setLoading(false));
  }, [id, form, navigate]);

  const onFinish: FormProps<EmployeeType>["onFinish"] = (values) => {
    if (!id) {
      console.error("No ID provided for the update operation.");
      return;
    }

    console.log("Success:", values);

    updateEmployee(+id, values).then((response) => {
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
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="w-full flex flex-col items-center justify-center"
      >
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <Form.Item<EmployeeType>
              label="First Name"
              name="firstName"
              rules={[
                { required: true, message: "Please input your first name" },
              ]}
              className="w-96"
            >
              <Input />
            </Form.Item>

            <Form.Item<EmployeeType>
              label="Last Name"
              name="lastName"
              rules={[
                { required: true, message: "Please input your last name" },
              ]}
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
              rules={[
                { required: true, message: "Please select a department" },
              ]}
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
          </>
        )}
      </Form>
    </div>
  );
};

export default UpdateEmployee;
