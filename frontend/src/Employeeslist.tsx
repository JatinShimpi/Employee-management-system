import { Button, Popconfirm, Table } from "antd";
import Column from "antd/es/table/Column";
import { useEffect, useState } from "react";
import { deleteEmployee, listEmployees } from "./services/EmployeeService";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

interface DataType {
  key: React.Key;
  firstName: string;
  lastName: string;
  id: number;
  email: string;
}

const Employeeslist = () => {
  const [employees, setEmployees] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, []);

  function getAllEmployees() {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addNewEmployee() {
    navigate("/add-employee");
  }

  function handleUpdate(id: number) {
    navigate(`/update-employee/${id}`);
  }

  function handleDelete(id: number) {
    console.log(id + "deleted");

    deleteEmployee(id)
      .then((response) => {
        console.log(response.data);
        getAllEmployees()
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="h-[calc(100vh-170px)]">
      <div
        className="flex flex-row hover:text-gray-400 hover:cursor-pointer transition-all duration-300 rounded-lg bg-slate-300 w-14 items-center px-2 py-1 justify-center mb-2"
        onClick={addNewEmployee}
      >
        <IoMdAdd />
        <h1>Add</h1>
      </div>
      <Table<DataType>
        dataSource={employees}
        pagination={{
          pageSize: 10,
        }}
      >
        <Column title="First Name" dataIndex="firstName" key="firstName" />
        <Column title="Last Name" dataIndex="lastName" key="lastName" />

        <Column title="ID" dataIndex="id" key="age" />
        <Column title="Email" dataIndex="email" key="address" />
        <Column
          title="Actions"
          key="actions"
          width={"10%"}
          render={(_, record: DataType) => (
            <div className="flex space-x-2">
              <Button
                type="primary"
                className="bg-blue-800"
                onClick={() => handleUpdate(record.id)}
              >
                <GrUpdate className="text-sm" />
                Update
              </Button>
              <Popconfirm
                title="Are you sure to delete this employee?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => handleDelete(record.id)}
              >
                <Button danger>
                  <MdDelete /> Delete
                </Button>
              </Popconfirm>
            </div>
          )}
        />
      </Table>
    </div>
  );
};

export default Employeeslist;
