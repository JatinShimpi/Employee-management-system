import { Button, Popconfirm, Table } from "antd";
import Column from "antd/es/table/Column";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import {
  deleteDepartment,
  listDepartments,
} from "./services/DepartmentService";
import { useNavigate } from "react-router-dom";

export interface DepartmentType {
  departmentName?: string;
  departmentDescription?: string;
}

interface DataType {
  id: number;
  key: React.Key;
  departmentName: string;
  departmentDescription: string;
}

const Departmentslist = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getAllDepartments();
  }, []);

  function addNewDepartment() {
    navigate("/add-department");
  }

  function getAllDepartments() {
    listDepartments()
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleUpdate(id: number) {
    navigate(`/update-department/${id}`);
  }

  function handleDelete(id: number) {
    console.log(id + "deleted");

    deleteDepartment(id)
      .then((response) => {
        console.log(response.data);
        getAllDepartments();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="h-[calc(100vh-170px)]">
      <div
        className="flex flex-row hover:text-gray-400 hover:cursor-pointer transition-all duration-300 rounded-lg bg-slate-300 w-14 items-center px-2 py-1 justify-center mb-2"
        onClick={addNewDepartment}
      >
        <IoMdAdd />
        <h1>Add</h1>
      </div>
      <Table<DataType>
        dataSource={departments}
        pagination={{
          pageSize: 10,
        }}
      >
        <Column
          title="Department Name"
          dataIndex="departmentName"
          key="departmentName"
        />
        <Column
          title="Department Description"
          dataIndex="departmentDescription"
          key="departmentDescription"
        />

        <Column title="ID" dataIndex="id" key="age" />
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

export default Departmentslist;
