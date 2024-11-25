import { Button, Form, FormProps, Input } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDepartment, updateDepartment } from "./services/DepartmentService";
import { DepartmentType } from "./DepartmentsList";

const UpdateDepartment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      // If no `id` is provided, navigate back or show an error
      console.error("No ID provided for the department update.");
      navigate("/departments"); // Navigate to a safe route
      return;
    }

    setLoading(true);
    getDepartment(+id)
      .then((response) => {
        form.setFieldsValue(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch employee details:", error);
      })
      .finally(() => setLoading(false));
  }, [id, form, navigate]);

  const onFinish: FormProps<DepartmentType>["onFinish"] = (values) => {

    if (!id) {
      console.error("No ID provided for the update operation.");
      return;
    }
    
    console.log("Success:", values);

    updateDepartment(+id, values).then((response) => {
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
            <Form.Item<DepartmentType>
              label={"Department Name"}
              name="departmentName"
              rules={[
                { required: true, message: "Please input your first name" },
              ]}
              className="w-[500px]"
            >
              <Input />
            </Form.Item>

            <Form.Item<DepartmentType>
              label={"Department Description"}
              name="departmentDescription"
              rules={[
                { required: true, message: "Please input your last name" },
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
          </>
        )}
      </Form>
    </div>
  );
};

export default UpdateDepartment;
