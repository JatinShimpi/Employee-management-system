import axios from "axios";
import { DepartmentType } from "../DepartmentsList";

const REST_API_BASE_URL =
  "https://disturbed-marilin-jatin123-58a12b05.koyeb.app/api/departments";

export const listDepartments = () => {
  return axios.get(REST_API_BASE_URL);
};

export const createDepartment = (department: DepartmentType) => {
  return axios.post(REST_API_BASE_URL, department);
};

export const getDepartment = (departmentId: number) => {
  return axios.get(REST_API_BASE_URL + "/" + departmentId);
};

export const updateDepartment = (
  departmentId: number,
  department: DepartmentType
) => {
  return axios.put(REST_API_BASE_URL + "/" + departmentId, department);
};

export const deleteDepartment = (departmentId: number) => {
  return axios.delete(REST_API_BASE_URL + "/" + departmentId);
};
