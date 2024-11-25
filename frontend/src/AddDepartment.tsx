import { Button, Form, FormProps, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { DepartmentType } from "./DepartmentsList";
import { createDepartment } from "./services/DepartmentService";

const AddDepartment = () => {
  const navigate = useNavigate();

  const onFinish: FormProps<DepartmentType>["onFinish"] = (values) => {
    console.log("Success:", values);

    createDepartment(values).then((response) => {
      console.log(response.data);
    });

    navigate("/departments");
  };

  const onFinishFailed: FormProps<DepartmentType>["onFinishFailed"] = (
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
        className="w-full  flex flex-col items-center justify-center"
      >
        <Form.Item<DepartmentType>
          label={"Department Name"}
          name="departmentName"
          rules={[
            { required: true, message: "Please input your Deapartment Name" },
          ]}
          className="w-[500px]"
        >
          <Input />
        </Form.Item>

        <Form.Item<DepartmentType>
          label={"Department Description"}
          name="departmentDescription"
          rules={[
            {
              required: true,
              message: "Please input your Department Description",
            },
          ]}
          className="w-[500px]"
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

export default AddDepartment;
